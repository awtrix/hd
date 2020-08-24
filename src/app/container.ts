import fs from 'fs'
import path from 'path'
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'
import { exec } from 'child_process'
import logger from '../utils/logger'
import replaceTemplate from '../utils/TemplateParser'
import Webserver from '../web'
import mqtt from 'mqtt'

export default class Container {
  /**
   * The package.json of the installed awtrix version.
   */
  package: JSONSchemaForNPMPackageJsonFiles

  /**
   * A flag indicating whether the container has completed its booting process.
   */
  booted = false

  /**
   * The resolution used by AWTRIX HD.
   */
  resolution = [1920, 480]

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
    await this.copyFixtures()

    // 2. Start the webserver and change the working directory to the configured
    //    home directory. This makes installing and loading dependencies easier.
    await this.startWebserver()

    // 3. Start Chrome via Puppeteer

    this.booted = true
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
   * Copies the awtrix user configuration fixtures to the home directory
   * if it does not already exist.
   *
   * TODO: Streamline this.
   */
  private async copyFixtures (): Promise<boolean> {
    let target = path.join(this.homeDirectory, 'config.json')
    if (fs.existsSync(target)) return false

    logger.info('Copying default config.json to awtrix directory.')
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
  }
}
