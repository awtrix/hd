import { KoaContext } from '../index'
import KoaRouter from 'koa-router'
import Koa from 'koa'

export type BindRouterFunction = <CustomS, CustomC>(arg: Koa<CustomS, CustomC>) => any

export default () => {
  const router = new KoaRouter<any, KoaContext>()

  return {
    router,
    bind: (app: Koa) => app.use(router.routes())
                           .use(router.allowedMethods())
  }
}
