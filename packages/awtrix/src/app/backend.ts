import { KoaContext } from '../web/app'
import KoaRouter from 'koa-router'

export type Router = KoaRouter<any, KoaContext>

export default abstract class {
  abstract register (router: Router): void
}
