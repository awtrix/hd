import { Command, flags } from '@oclif/command'
import Container from './app/Container'
import os from 'os'
import path from 'path'

/**
 * oclif does not currently work with mock-fs, so we want to keep
 * this file as slim as possible for unit testing. Therefore we
 * will delegate most of the logic to other sources that can be
 * tested under mock-fs.
 * @see https://github.com/oclif/oclif/issues/182
 */
class AwtrixOclifApplication extends Command {
  static description = 'Performs'

  static flags = {
    // --version or -v
    version: flags.version({ char: 'v' }),

    // --help or -h
    help: flags.help({ char: 'h' }),

    // --home "..."
    home: flags.string({
      description: '',
      default: path.join(os.homedir(), '.awtrix')
    }),

    // --browser or -b
    browser: flags.boolean({ char: 'b', default: false }),

    // --production or -p
    production: flags.boolean({ char: 'p', default: process.env['NODE_ENV'] == 'production' }),

    // --live-reload
    'live-reload': flags.boolean({ default: false }),
  }

  async run (): Promise<void> {
    const { flags } = this.parse(AwtrixOclifApplication)

    // Boot up the application container
    const container = new Container(
      flags.home,
      flags.production ? 'production' : 'development',
      !flags.browser,
      flags['live-reload'],
    )

    container.boot()
  }
}

export default AwtrixOclifApplication
