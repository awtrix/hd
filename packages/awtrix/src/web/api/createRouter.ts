
import KoaRouter from 'koa-router'
import Koa from 'koa'
import { Connect } from 'vite'

export type BindRouterFunction = <CustomS, CustomC>(arg: Koa<CustomS, CustomC>) => any

export default (opts?: KoaRouter.IRouterOptions) => {
  const router = new KoaRouter<any, KoaContext>(opts)

  return {
    router,
    // @ts-ignore
    bind: (app: Connect.Server) => app.use(router.routes())
    // @ts-ignore
                           .use(router.allowedMethods())
  }
}
