import * as Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'

export default async function createMiddleware (app: Koa<any, any>, config: any) {
  config.dev = app.env !== 'production'

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  await nuxt.ready()

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  return {
    nuxt,
    middleware: (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) => {
      ctx.status = 200

      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)

        nuxt.render(ctx.req, ctx.res, (promise: Promise<any>) => {
          promise.then(resolve).catch(reject)
        })
      })
    }
  }
}

