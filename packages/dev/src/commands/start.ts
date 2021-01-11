import { Command, flags } from '@oclif/command'
import { Command as AwtrixStartCommand } from '@awtrix/app'
import fs from 'fs'
import path from 'path'
// @ts-ignore
import copyTemplateDir from 'copy-template-dir'
import buildBackend from '../packer/buildBackend'
import buildFrontend from '../packer/buildFrontend'
import copyPackageJson from '../packer/copyPackageJson'
import createPackage from '../packer/createPackage'

process.on('unhandledRejection', (reason, promise) => {
  console.log(promise)
})

export default class Start extends Command {
  static description = 'starts an Awtrix HD server with only the app in the current folder configured'

  static flags = {

  }

  async run() {
    try {
      const packageJson = fs.readFileSync('package.json', 'utf-8')
      let config = JSON.parse(packageJson)

      await this.createAwtrixHome(config)

      await copyPackageJson(config)
      await buildFrontend(config, null)
      await buildBackend(config, null)

      AwtrixStartCommand.run(['--home', './.awtrix', '--production', '--live-reload'])
    } catch (error) {
      console.log(error)
      this.error('Could not find a "package.json" in your current directory.')
    }

    // 1. Start watcher that compiles sources (extract from pack.ts)
    // 3. Symlink watcher output (dist/) to the awtrix app directory
    // 4. Create awtrix configuration that includes the current app
    // 5. Start awtrix

    // TODO: Find out if hot reloading for backend is possible
    // TODO: Find out how to handle automatic reloading for assets
    // TODO: Find out how to use hot reloading for compiled frontend component
  }

  async createAwtrixHome (config: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const source = path.join(__dirname, '../../templates', 'development')
      const variables = { name: config.name, version: config.version }

      copyTemplateDir(source, '.awtrix', variables, (error: Error | null) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}
