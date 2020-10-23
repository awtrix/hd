import { ApplicationConfig } from '@/types/Application'

type ApplicationConfigWithIdentifier = ApplicationConfig & {
  id: string
}

export default class ApplicationBackend {
  /**
   * TODO
   */
  ready: boolean = true

  /**
   * TODO
   */
  locked: boolean = false

  /**
   * TODO
   */
  active: boolean = true

  /**
   * TODO
   *
   * @param config
   */
  constructor(public config: ApplicationConfigWithIdentifier, public userConfig: any) {
  }

  /**
   * TODO
   *
   * TODO: Add do not overwrite note or wrap the Application Backend
   */
  get displayLength (): number {
    if (this.userConfig.displayLength) return this.userConfig.displayLength
    return this.config.awtrix.defaultDisplayLength || 15000
  }

  /**
   * TODO
   */
  register() { }
}
