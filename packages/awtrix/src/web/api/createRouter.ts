import { KoaContext } from '../index'
import KoaRouter from 'koa-router'
import Koa from 'koa'

export type BindRouterFunction = <CustomS, CustomC>(arg: Koa<CustomS, CustomC>) => any

export default (opts?: KoaRouter.IRouterOptions) => {
  const router = new KoaRouter<any, KoaContext>(opts)

  return {
    router,
    bind: (app: Koa<any, KoaContext>) => app.use(router.routes())
                           .use(router.allowedMethods())
  }
}
