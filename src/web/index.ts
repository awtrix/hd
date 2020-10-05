import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import serve from 'koa-static'
import path from 'path'
import logger from '../utils/logger'
import createNuxtMiddleware from './nuxtMiddleware'
import Container from '../app/container'
import controllers from './api'

function sleep (milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export interface KoaContext {
  container: Container,
  database: NonNullable<typeof Container.prototype.database>,
}

export default class WebServer {
  app: Koa<any, KoaContext>

  constructor (protected container: Container) {
    this.app = new Koa()
    this.app.use(bodyParser({ strict: true }))

    this.app.context.container = container
    this.app.context.database = container.database!
  }

  async start (): Promise<void> {
    // Import and Set Nuxt.js options
    const config = require('../../nuxt.config')

    // First configure our own router for API requests
    controllers.forEach((bindController) => {
      bindController(this.app)
    })

    // Then mount our apps' static files (assets + precompiled code) into the
    // /static/apps path
    const staticPath = path.join(this.container.homeDirectory, 'apps')
    const staticMiddleware = serve(staticPath)
    this.app.use(mount('/static/apps', staticMiddleware))

    // Then instantiate Nuxt so that we can also serve our frontend
    // through the same port
    let { middleware, nuxt } = await createNuxtMiddleware(this.app, config)
    this.app.use(middleware)

    // Finally, start listening on the port provided by our nuxt middleware config
    const {
      host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000,
    } = nuxt.options.server

    this.app.listen(port, host)
    logger.info(`Webserver listening on http://${host}:${port}`)
  }
}
