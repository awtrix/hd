import { KoaContext } from '../web/index'
import KoaRouter from 'koa-router'

export type Router = KoaRouter<any, KoaContext>

export default abstract class {
  abstract register (router: Router): void
}
