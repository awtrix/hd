import { ViteDevServer, createServer as createViteServer } from 'vite'
import { default as connect, IncomingMessage, Server } from 'connect'
import path from 'path'
import logger from '../utils/logger'
import Container from '../app/Container'
import { json as jsonBodyParser } from 'body-parser'
import serveStatic from 'serve-static'
import { ServerResponse } from 'http'
import fs from 'fs'

// import controllers from './api'

export interface KoaContext {
  container: Container,
  database: NonNullable<typeof Container.prototype.database>,
}

export default class WebServer {
  app: Server
  context: any

  constructor (protected container: Container) {
    this.app = connect()

    this.context = {
      container,
      database: container.database!
    }
  }

  async configureVite (): Promise<void> {
    const vite = await createViteServer({
      configFile: path.join(__dirname, '../vite.config.ts'),
      clearScreen: false,
      server: { middlewareMode: true },
    })

    this.app.use(vite.middlewares)
    this.app.use(async (req: IncomingMessage, res: ServerResponse) => {
      const response = await vite.transformRequest(req.originalUrl!)
      console.log(response)
      return
      const url = req.originalUrl

      try {
        let template = fs.readFileSync(path.resolve(__dirname, '../web/index.html'), 'utf-8')

        template = await vite.transformIndexHtml(url!, template)

        const { render } = await vite.ssrLoadModule('/s')

      } catch (e) {
        vite.ssrFixStacktrace(e)
        console.error(e)
        // res.stat(500).end(e.message)
      }
    })
  }

  async start (): Promise<void> {
    // if dev
    if (true) {
      await this.configureVite()
    } else {
      const staticHandler = serveStatic(path.join(__dirname, '../dist/web'))
      this.app.use(staticHandler)
    }

    // First configure our own router for API requests
    // controllers.forEach((bindController) => {
    //  bindController(this.app)
    // })

    // Set up some common middlewares
    this.app.use(jsonBodyParser())

    // Then mount our apps' static files (assets + precompiled code) into the
    // /static/apps path
    const staticPath = path.join(this.container.homeDirectory, 'apps')
    const staticHandler = serveStatic(staticPath)
    this.app.use('/static/apps/', staticHandler)

    // Finally, start listening
    const port = parseInt(process.env.PORT || '3000')
    await this.app.listen(port)
    logger.info(`Webserver listening on http://localhost:${port}`)
  }
}
