import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import StartCommand from './commands/start'
import InitCommand from './commands/init'
import DevCommand from './commands/dev'
import PackCommand from './commands/pack'

export default function cli(args: typeof process.argv) {
  yargs(hideBin(args))
    .command(StartCommand)
    .command(PackCommand)
    .command(InitCommand)
    .command(DevCommand)
    .help()
    .argv
}
