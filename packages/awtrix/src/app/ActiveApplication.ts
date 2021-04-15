import { Types } from '@awtrix/common'
import { BackendApp } from '@awtrix/common'

export default class ActiveApplicationBackend {
  constructor (public config: Types.Application.ApplicationConfig,
               public instance: BackendApp) {}
}
