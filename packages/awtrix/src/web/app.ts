import { createServer as createViteServer } from 'vite'
import { default as connect, Server } from 'connect'
import path from 'path'
import logger from '../utils/logger'
import { json as jsonBodyParser } from 'body-parser'
import serveStatic from 'serve-static'
import Container from '../app/Container'
import Context from './context'
import Koa from 'koa'
import controllers from './api'

export default class WebServer {
  app: Server

  /**
   *
   * @param container
   */
  constructor (protected container: Container) {
    this.app = connect()

    // Set up the context for our API
    const context = Context.getInstance()
    context.database = container.database
    context.container = container
  }

  /**
   * Configures a Vite Development Server with proxy functionality to our
   * own routes and starts it.
   */
  async startVite () {
    const vite = await createViteServer({
      configFile: path.join(__dirname, '../vite.config.ts'),
      clearScreen: false,
      server: {
        proxy: {
          '/static': 'http://localhost:3001',
          '/api': 'http://localhost:3001',
        }
      },
    })

    vite.listen(3000)
  }

  /**
   *
   */
  async start (): Promise<void> {
    const dev = true
    if (dev) {
      // In development mode we want to use regular Vite features, so we
      // configure our Connect app to use the Vite middleware
      await this.startVite()
    } else {
      // In production however we can work with static files, so we use
      // a static handler for the compiled frontend
      const staticHandler = serveStatic(path.join(__dirname, '../dist/web'))
      this.app.use(staticHandler)
    }

    // Set up some common middlewares
    this.app.use(jsonBodyParser())

    // Then mount our apps' static files (assets + precompiled code) into the
    // /static/apps path
    const staticPath = path.join(this.container.homeDirectory, 'apps')
    const staticHandler = serveStatic(staticPath)
    this.app.use('/static/apps/', staticHandler)

    // Configure our own router for API requests
    const koa = new Koa()
    controllers.forEach((bindController) => {
      bindController(koa)
    })

    this.app.use(koa.callback())

    // Finally, start listening
    const port = dev ? 3001 : 3000
    await this.app.listen(port)
    logger.info(`Webserver listening on http://localhost:3000`)
  }
}
