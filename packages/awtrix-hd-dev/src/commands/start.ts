import { Command, flags } from '@oclif/command'
import { Command as AwtrixStartCommand } from 'awtrix-hd'
import fs from 'fs'

export default class Start extends Command {
  static description = 'starts an Awtrix HD server with only the app in the current folder configured'

  static flags = AwtrixStartCommand.flags

  async run() {
    try {
      const packageJson = fs.readFileSync('package.json', 'utf-8')
      const config = JSON.parse(packageJson)
    } catch (error) {
      this.error('Could not find a "package.json" in your current directory.')
    }

    // 1. Start watcher that compiles sources (extract from pack.ts)
    // 2. Configure home directory to be in working directory
    // 3. Symlink watcher output (dist/) to the awtrix app directory
    // 4. Create awtrix configuration that includes the current app
    // 5. Start awtrix

    // TODO: Find out if hot reloading for backend is possible
    // TODO: Find out how to handle automatic reloading for assets
    // TODO: Find out how to use hot reloading for compiled frontend component

    // TODO: Find out how to properly pass through args to delegate this command
    // call directly to Awtrix HD.
    AwtrixStartCommand.run(process.argv.slice(3))
  }
}
