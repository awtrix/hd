import { ApplicationConfig } from '../types/Application'
import ApplicationBackend from './ApplicationBackend'

export default class ActiveApplicationBackend {
  constructor (public config: ApplicationConfig,
               public instance: ApplicationBackend) {}
}
