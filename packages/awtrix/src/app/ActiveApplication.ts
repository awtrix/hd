import { ApplicationConfig } from '../types/Application'
import { BackendApp } from '@awtrix/common'

export default class ActiveApplicationBackend {
  constructor (public config: ApplicationConfig,
               public instance: BackendApp) {}
}
