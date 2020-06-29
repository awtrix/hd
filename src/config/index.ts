import Command from '../cli'
import { OutputFlags } from '@oclif/parser'
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'
import fs from 'fs'
import os from 'os'
import path from 'path'

class IotameConfig {
  homeDir: string = path.join(os.homedir(), '.iotame')
  package: JSONSchemaForNPMPackageJsonFiles

  constructor () {
    this.package = this.readPackageJson()
  }

  readPackageJson (): JSONSchemaForNPMPackageJsonFiles {
    const packageJsonPath = path.join(__dirname, '../../package.json')
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  }

  initializeFromOclif (flags: Partial<OutputFlags<typeof Command.flags>>): void {
    if (flags.home) {
      this.homeDir = flags.home
    }
  }
}

export default new IotameConfig()
