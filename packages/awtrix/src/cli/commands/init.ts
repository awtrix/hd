
import { Arguments, CommandModule } from 'yargs'
// @ts-ignore
import Yeoman from 'yeoman-environment'
import Generator from '../generator'
import os from 'os'
import path from 'path'

interface InitCommandArguments extends Arguments {

}

export default {
  command: 'init',
  describe: 'Initialize a new Awtrix HD app for development purposes.',
  builder: { },
  handler: (flags: InitCommandArguments) => {
    const env = Yeoman.createEnv()
    env.registerStub(Generator, 'awtrix:app')

    env.run('awtrix:app', () => {})
  },
} as CommandModule
