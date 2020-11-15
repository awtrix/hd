import Koa from 'koa'
import http from 'http'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import serve from 'koa-static'
import path from 'path'
import logger from '../utils/logger'
import createNuxtMiddleware from './createMiddleware'
import Container from '../app/Container'
import controllers from './api'

export interface KoaContext {
  container: Container,
  database: NonNullable<typeof Container.prototype.database>,
}

export default class WebServer {
  app: Koa<any, KoaContext>

  constructor (protected container: Container) {
    this.app = new Koa()
    this.app.env = container.env
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

    // Finally, start listening
    const server = http.createServer(this.app.callback())
    const port = parseInt(process.env.PORT || '3000')

    server.listen(port, process.env.HOST || '0.0.0.0')
    logger.info(`Webserver listening on http://localhost:${port}`)
  }
}
