import { Arguments, CommandModule } from 'yargs'
import BuildService from '../services/buildService'
import fs from 'fs'
import path from 'path'
import Container from '../../app/Container'
// @ts-ignore
import copyTemplateDir from 'copy-template-dir'
import { template } from 'lodash'

interface DevCommandArguments extends Arguments {
  workingDirectory?: string,
  browser?: boolean,
}

function copyTemplate (src: string, dest: string, variables: any): Promise<void> {
  return new Promise((resolve, reject) => {
    copyTemplateDir(src, dest, variables, (error: Error | null) => {
      if (error) return reject(error)
      resolve()
    })
  })
}

export default {
  command: 'dev',
  describe: 'Creates a distributable Awtrix HD app from your current directory.',
  builder: {
    workingDirectory: {
      type: 'string',
      describe: 'The working directory to use for the dev command',
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
    browser: {
      type: 'boolean',
      describe: '...',
      default: false,
    },
  },
  handler: async (flags: DevCommandArguments) => {
    const jsonPath = path.join(flags.workingDirectory!, 'package.json')
    if (!fs.existsSync(jsonPath)) {
      console.log('Could not find a "package.json" in your working directory.')
    }

    const build = new BuildService(jsonPath)
    const homeDir = path.join(build.path, '.awtrix')

    // TODO: Don't override the .awtrix/package.json in case the user has already
    //   customized their app.
    const templateVariables = { name: build.json.name, version: build.json.version }
    await copyTemplate(path.join(__dirname, '../../../templates/development'), homeDir, templateVariables)

    // build.run resolves after the first run. The watch mode is running on the
    // background, and not blocking the Promise from resolving.
    await build.run({
      watch: { onChange (path) { '...' }},
      outDir: path.join(homeDir, `apps/${build.json.name}/${build.json.version}`)
    })

    const container = new Container(homeDir, 'development', !flags.browser!, true)
    container.boot()
  },
} as CommandModule
