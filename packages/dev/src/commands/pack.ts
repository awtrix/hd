import { Command, flags } from '@oclif/command'
import fs from 'fs'
import tar from 'tar'

export default class Pack extends Command {
  static description = 'packs the app in the current directory into a consumable Awtrix HD app package'

  async run() {
    try {
      const packageJson = fs.readFileSync('package.json', 'utf-8')
      const config = JSON.parse(packageJson)

      const buildConfig = config.awtrix
      if (!buildConfig) throw new Error('abc')

      if (buildConfig.frontend) await this.buildFrontend(buildConfig)
      if (buildConfig.backend) await this.buildBackend(buildConfig)
      await this.pack(config)
    } catch (error) {
      this.error('Could not find a "package.json" in your current directory.')
    }
  }

  async buildFrontend(config: any) {
    const inFile = 'src/frontend'

    // Build via vue-cli-service
    // @see https://cli.vuejs.org/guide/build-targets.html#library

    // vue build --target lib --name AwtrixComponent.awtrix .\Awtrix.vue
  }

  async buildBackend(config: any) {
    const inFile = config.backend

    // Build via tsc or babel
  }

  async pack(config: any) {
    const name = config.name.replace('/', '_').replace('@', '')

    tar.create(
      { gzip: true },
      ['dist']
    ).pipe(fs.createWriteStream(`${name}@${config.version}.tgz`))
  }
}
