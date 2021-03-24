import { ApplicationConfig } from '@awtrix/common/dist/types/app'
import { BackendApp } from '@awtrix/common'

export default class ActiveApplicationBackend {
  constructor (public config: ApplicationConfig,
               public instance: BackendApp) {}
}
