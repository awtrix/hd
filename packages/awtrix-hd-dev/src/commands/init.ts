import { Command, flags } from '@oclif/command'
import Yeoman from 'yeoman-environment'
import Generator from '../generator'

export default class Init extends Command {
  static description = 'initializes a new Awtrix HD app in the current directory'

  async run() {
    const env = Yeoman.createEnv()
    env.registerStub(Generator, 'awtrix:app')
    
    env.run('awtrix:app', () => {})
  }
}
