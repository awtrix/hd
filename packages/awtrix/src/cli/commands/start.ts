import { Arguments, CommandModule } from 'yargs'
import Container from '../../app/Container'
import os from 'os'
import path from 'path'

interface StartCommandArguments extends Arguments {
  home?: string,
  browser?: boolean,
  production?: boolean,
  connect?: string,
  'live-reload'?: boolean,
}

export default {
  command: 'start',
  describe: 'Start an Awtrix HD instance.',
  builder: {
    home: {
      type: 'string',
      describe: 'Which home directory to use. This option only really makes sense when running multiple Awtrix HD servers off the same machine.',
      default: path.join(os.homedir(), '.awtrix')
    },
    browser: {
      type: 'boolean',
      describe: 'Automatically start a Chrome browser in Kiosk mode and point it to this server',
      alias: 'b',
      default: false,
    },
    production: {
      alias: 'p',
      type: 'boolean',
      describe: 'Runs the Awtrix HD server in production.',
      default: false,
    },
    connect: {
      type: 'string',
      describe: 'The hostname to a running Awtrix client that should be redirected to this server.',
    },
    'live-reload': {
      type: 'boolean',
      default: false,
    },
  },
  handler: (flags: StartCommandArguments) => {
    // Boot up the application container
    const container = new Container(
      flags.home!,
      flags.production ? 'production' : 'development',
      !flags.browser,
      flags['live-reload']!,
    )

    container.boot()
  },
} as CommandModule
