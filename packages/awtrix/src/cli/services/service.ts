import fs from 'fs-extra'
import path from 'path'
import { Types } from '@awtrix/common'
import { merge } from 'lodash'

export default abstract class Service<Config> {
  defaultConfig!: Config
  path: string
  json: Types.Application.ApplicationConfig

  constructor (jsonPath: string) {
    this.path = path.dirname(jsonPath)
    this.json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  }

  run (config: Partial<Config> = {}): Promise<any> {
    let filledConfig = this.defaultConfig
    merge(filledConfig, config)

    return this.execute(filledConfig)
  }

  abstract execute (config: Config): Promise<any>
}
