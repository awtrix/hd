import fs from 'fs'
import path from 'path'
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'
import { exec } from 'child_process'
import logger from '../utils/logger'
import replaceTemplate from '../utils/TemplateParser'
import MqttClient from '../awtrix/communication/channels/MqttClient'
import Webserver from '../web'
import Channel from '../awtrix/communication/channels/Channel'

export default class Container {
  /**
   * The package.json of the installed awtrix version.
   */
  package: JSONSchemaForNPMPackageJsonFiles

  /**
   * The (temporary) channel that our matrix is connected to.
   * Will be replaced once support for multiple matrixes is available.
   */
  channel?: Channel

  /**
   * A flag indicating whether the container has completed its booting process.
   */
  booted = false

  constructor (public readonly homeDirectory: string) {
    this.package = this.readPackageJson()
  }

  /**
   * Reads the package.json of the installed awtrix version.
   */
  readPackageJson (): JSONSchemaForNPMPackageJsonFiles {
    const packageJsonPath = path.join(__dirname, '../../package.json')
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  }

  /**
   * Boot up the application container.
   */
  async boot (): Promise<void> {
    if (this.booted) return

    // 1. Make sure that only one instance is running per home directory and
    //    create the home directory (+ config) if it doesn't already exist.
    await this.createWorkingDirectory()
    await this.verifyPidfile()
    await this.copyConfig()

    // TODO: In order for Nuxt to compile the sources (only relevant in development mode),
    //       the working directory needs to match our development directory. Therefore we
    //       need to wait until that and only set the working directory afterwards.

    // 2. Start the webserver and change the working directory to the configured
    //    home directory. This makes installing and loading dependencies easier.
    await this.startWebserver()
    await this.setWorkingDirectory()

    // 3. Install the user's configured dependencies (e.g. apps)
    await this.installDependencies()

    // 4. Finally, we can initialize all configured matrixes.
    await this.initializeMatrix()

    this.booted = true
  }

  /**
   * Switch the working directory to the configured home directory.
   */
  private async setWorkingDirectory (): Promise<void> {
    process.chdir(this.homeDirectory)
  }

  /**
   * Make sure the configured home directory exists by recursively
   * creating it.
   */
  private async createWorkingDirectory (): Promise<void> {
    fs.mkdirSync(this.homeDirectory, { recursive: true })
  }

  /**
   * Verifies that no previous valid pidfile exists and create one
   * for this process. If a pidfile already exists, it only continues
   * if its specified pid is no longer active.
   *
   * @throws
   */
  private async verifyPidfile (): Promise<void> {
    const pidfile = path.join(this.homeDirectory, 'awtrix.pid')

    try {
      // If this raises, no pidfile was present
      const pid = fs.readFileSync(pidfile, 'utf8')

      // TODO: Check if this works on Windows.

      // If this raises, the pidfile didn't link to a running process
      // @see https://nodejs.org/api/process.html#process_process_kill_pid_signal
      process.kill(Number(pid), 0)

      // Now we know that the process does indeed exist
      throw new Error(`awtrix is already running with pid ${pid}.`)
    } catch (err) {
      // ENOENT: Pidfile was not present
      // ESRCH: Not a running process
      if (err.code !== 'ENOENT' && err.code !== 'ESRCH') {
        throw err
      }
    }

    fs.writeFileSync(pidfile, process.pid)
    // TODO: Make sure to clean up the pidfile when the process exits!
  }

  /**
   * Copies the package.json fixture to the home directory if it does not
   * already exist.
   */
  private async copyConfig (): Promise<boolean> {
    const target = path.join(this.homeDirectory, 'package.json')
    if (fs.existsSync(target)) return false

    logger.info('Copying default package.json to awtrix directory.')
    fs.copyFileSync(path.join(__dirname, 'fixtures', 'config.json'), target)
    await replaceTemplate(target, {
      version: this.package.version as string,
    })

    return true
  }

  /**
   * Starts the web server.
   */
  private async startWebserver (): Promise<void> {
    // Start our web interface
    let web = new Webserver(this)
    await web.start()

    // Open our MQTT connection
    this.channel = new MqttClient(7001)
    await this.channel.open()
  }

  private async installDependencies (): Promise<void> {
    logger.info('Installing configured dependencies.')

    return new Promise((resolve, reject) => {
      exec('npm install', (error, stdout, stderr) => {
        if (error) {
          return reject(error)
        }

        resolve()
      })
    })
  }

  private async initializeMatrix (): Promise<void> {
  }
}
