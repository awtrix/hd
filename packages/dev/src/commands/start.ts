import { Command, flags } from '@oclif/command'
import fs from 'fs'
import { ChildProcess, fork } from 'child_process'
import path from 'path'
// @ts-ignore
import copyTemplateDir from 'copy-template-dir'
import buildBackend from '../packer/buildBackend'
import buildFrontend from '../packer/buildFrontend'
import copyAssets from '../packer/copyAssets'
import copyPackageJson from '../packer/copyPackageJson'

process.on('unhandledRejection', (reason, promise) => {
  console.log(promise)
})

export default class Start extends Command {
  static description = 'starts an Awtrix HD server with only the app in the current folder configured'

  static flags = {

  }

  childProcess?: ChildProcess

  async run() {
    if (!fs.existsSync('package.json')) {
      return this.error('Could not find a "package.json" in your current directory.')
    }

    const packageJson = fs.readFileSync('package.json', 'utf-8')
    let config = JSON.parse(packageJson)

    try {
      await this.createAwtrixHome(config)
      await copyPackageJson(config)
      await copyAssets(config, 'translations')

      if (config.awtrix.frontend) await buildFrontend(config, null)
      if (config.awtrix.backend) await buildBackend(config, null)
      if (config.awtrix.assets) await copyAssets(config, 'assets')

      this.startReloadingAwtrix(config)
    } catch (error) {
      this.error(error)
    }

    // 1. Start watcher that compiles sources (extract from pack.ts)
    // 3. Symlink watcher output (dist/) to the awtrix app directory
    // 4. Create awtrix configuration that includes the current app
    // 5. Start awtrix

    // TODO: Find out if hot reloading for backend is possible
    // TODO: Find out how to handle automatic reloading for assets
    // TODO: Find out how to use hot reloading for compiled frontend component
  }

  startReloadingAwtrix (config: any) {
    this.restartAwtrixServer()

    fs.watchFile(`.awtrix/apps/${config.name}/${config.version}/backend.js`, () => {
      this.restartAwtrixServer()
    })
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

  restartAwtrixServer () {
    if (this.childProcess) {
      this.childProcess.on('exit', () => {
        this.childProcess = undefined
        this.restartAwtrixServer()
      })

      this.childProcess.kill('SIGTERM')
      return
    }

    this.childProcess = fork(path.join(__dirname, '../thread/awtrix.js'))
  }
}
