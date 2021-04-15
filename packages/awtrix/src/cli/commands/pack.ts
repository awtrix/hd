import { Arguments, CommandModule } from 'yargs'
import BuildService from '../services/buildService'
import PackService from '../services/packService'
import fs from 'fs'
import path from 'path'

interface PackCommandArguments extends Arguments {
  workingDirectory?: string,
  production?: boolean,
  skipTarball?: boolean,
}

export default {
  command: 'pack',
  describe: 'Start the Awtrix HD development server for the app in your current directory.',
  builder: {
    workingDirectory: {
      type: 'string',
      describe: 'The working directory to use for the pack command',
      default: () => {
        // If the command is run from the @awtrix/app directory we set the
        // example app as the target to be built. Otherwise we use the
        // current working directory
        let target = process.cwd()
        if (target.endsWith('/packages/awtrix')) {
          target = path.join(process.cwd(), '../example-app')
        }

        return target
      },
    },
    production: {
      type: 'boolean',
      describe: 'Whether to minify output files',
      default: process.env.NODE_ENV === 'production',
    },
    skipTarball: {
      type: 'boolean',
      describe: 'set to true to not write a tarball for the compiled app',
      default: false,
    }
  },
  handler: async (flags: PackCommandArguments) => {
    const jsonPath = path.join(flags.workingDirectory!, 'package.json')
    if (!fs.existsSync(jsonPath)) {
      console.log('Could not find a "package.json" in your working directory.')
    }

    // First we run the build service to compile all modules and assets
    const build = new BuildService(jsonPath)
    await build.run({ production: flags.production })

    // Then we run the pack service in order to create a .tar.gz
    if (flags.skipTarball) return
    const pack = new PackService(jsonPath)
    await pack.run()
  },
} as CommandModule
