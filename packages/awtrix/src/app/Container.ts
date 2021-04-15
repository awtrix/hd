import fs from 'fs'
import http from 'http'
import io from 'socket.io'
import path, { resolve } from 'path'
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'
import logger from '../utils/logger'
import Webserver from '../web/app'
import createDatabase, { Database } from '../utils/database'
import puppeteer from 'puppeteer'
// @ts-ignore
import copyTemplateDir from 'copy-template-dir'
import ApplicationManager from './ApplicationManager'
import ApplicationProcessor from './ApplicationProcessor'

export default class Container {
  /**
   * The package.json of the installed awtrix version.
   */
  package: JSONSchemaForNPMPackageJsonFiles

  /**
   * The lowdb database from the user's home directory.
   */
  database?: Database

  manager: ApplicationManager

  processor: ApplicationProcessor

  web?: Webserver

  io?: io.Server

  /**
   * A flag indicating whether the container has completed its booting process.
   */
  booted = false

  constructor (
    public readonly homeDirectory: string,
    public readonly env: string,
    public readonly headless: boolean,
    public readonly liveReload: boolean,
  ) {
    this.manager = new ApplicationManager(homeDirectory)
    this.processor = new ApplicationProcessor(this)
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
    await this.copyFixtures()
    await this.verifyPidfile()

    // 2. Initialize the lowdb database
    await this.initDatabase()

    // 3. Start the webserver and change the working directory to the configured
    //    home directory. This makes installing and loading dependencies easier.
    await this.startWebserver()
    await this.startProcessor()

    // 4. Start Chrome via Puppeteer
    if (!this.headless) {
      await this.startBrowser()
    }

    this.booted = true
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

      // TODO: Check why this doesn't work on Windows.

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

    fs.writeFileSync(pidfile, Buffer.from(process.pid.toString(), 'utf-8'))
    // TODO: Make sure to clean up the pidfile when the process exits!
  }

   /**
   * Copies the awtrix user configuration fixtures to the home directory
   * if it does not already exist.
   *
   * TODO: Recursively merge the fixture config and the user config
   */
  private async copyFixtures (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(this.homeDirectory)) return resolve(false)

      logger.info('Copying default template to awtrix home directory.')

      const source = path.join(__dirname, '../templates/core')
      const variables = { version: this.package.version }
      copyTemplateDir(source, this.homeDirectory, variables, (error: any) => {
        if (error) return reject(error)
        resolve(true)
      })
    })
  }

  /**
   * Starts the application loop processor
   */
  private async startProcessor (): Promise<void> {
    await this.processor.start()
  }

  /**
   * Starts the web server.
   */
  private async startWebserver (): Promise<void> {
      // Start our web interface
      this.web = new Webserver(this)
      await this.web.start()

      // Start the socket.io server
      const server = http.createServer()
      server.listen(3002, '0.0.0.0')
      this.io = io.listen(server)
  }

  /**
   * Loads the asynchronous lowdb database.
   */
  private async initDatabase (): Promise<void> {
    let configPath = path.join(this.homeDirectory, 'config.json')
    this.database = await createDatabase(configPath)
  }

  /*
  private async startController (): Promise<void> {
    this.database?.get(['apps', 'rotation']).value().forEach((app) => {
      const backend = path.resolve(this.homeDirectory, 'apps', app.name, app.version, 'backend')

      try {
        const generator = require(backend)
        const klass = generator(BackendApp)
        const backendApp = new klass() as BackendApp

        const { router, bind } = createRouter({ prefix: `/api/app/${app.name}` })
        backendApp.register(router)

        bind(this.web!.app)
        logger.info(`${app.name} backend component registered.`)
      } catch (e) {
        // TODO: Figure out proper error handling
      }
    })
  }
  */

  private async startBrowser (): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        // '--kiosk',
        '--window-size=1280,400',
        '--disable-web-security',
        `--user-data-dir=${path.join(this.homeDirectory, 'chrome')}`
      ],
      ignoreDefaultArgs: ['--enable-automation'],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 400 })
    await page.setUserAgent('AWTRIX HD')
    await page.goto('http://localhost:3000')
  }
}
