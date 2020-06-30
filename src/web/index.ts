import Koa from 'koa'
import Router from 'koa-router'
import logger from '../utils/logger'
import createNuxtMiddleware from './nuxtMiddleware'
import Container from '../app/container'
import Command from '../awtrix/communication/command'
import textLength from '../utils/text'

function sleep (milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export default class WebServer {
  protected app: Koa
  protected router: Router

  constructor () {
    this.app = new Koa()
    this.router = new Router({
      prefix: '/api',
    })
  }

  async start (): Promise<void> {
    // Import and Set Nuxt.js options
    const config = require('../../nuxt.config.js')

    // First configure our own router for API requests
    this.configureRoutes()
    this.app.use(this.router.routes())
            .use(this.router.allowedMethods())

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

  configureRoutes () {
    this.router.get('/write', async (ctx, next) => {
      const channel = Container.getInstance().channel
      if (!channel) return ctx.body = { sent: false }

      const { text } = ctx.request.query
      let length = textLength(text)

      for (let i = 31; i >= -length; i--) {
        channel.send(Command.clear())
        channel.send(Command.text(text, [i, 1], '#ff00ef'))
        channel.send(Command.draw())

        await sleep(63)
      }

      ctx.body = { sent: true }
    })
  }
}
