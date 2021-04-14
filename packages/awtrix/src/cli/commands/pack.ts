import { Arguments, CommandModule } from 'yargs'
import BuildService from '../services/buildService'
import PackService from '../services/packService'
import fs from 'fs'
import path from 'path'

interface DevCommandArguments extends Arguments {
  home?: string,
  browser?: boolean,
  production?: boolean,
}

export default {
  command: 'pack',
  describe: 'Start the Awtrix HD development server for the app in your current directory.',
  builder: {
  },
  handler: async (flags: DevCommandArguments) => {
    // If the pack command is run from the @awtrix/app directory we set the
    // example app as the target to be built. Otherwise we use the current
    // working directory
    let target = process.cwd()
    if (target.endsWith('/packages/awtrix')) {
      target = path.join(process.cwd(), '../example-app')
    }

    const jsonPath = path.join(target, 'package.json')
    if (!fs.existsSync(jsonPath)) {
      console.log('Could not find a "package.json" in your current directory.')
    }

    // First we run the build service to compile all modules and assets
    const build = new BuildService(jsonPath)
    await build.run()

    // Then we run the pack service in order to create a .tar.gz
    const pack = new PackService(jsonPath)
    await pack.run()
  },
} as CommandModule
