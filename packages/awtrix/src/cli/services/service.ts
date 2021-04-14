import fs from 'fs-extra'
import path from 'path'
import { Types } from '@awtrix/common'

export default abstract class Service<Config> {
  defaultConfig!: Config
  path: string
  json: Types.Application.ApplicationConfig

  constructor (jsonPath: string) {
    this.path = path.dirname(jsonPath)
    this.json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  }

  abstract run (config?: Partial<Config>): Promise<any>
}
