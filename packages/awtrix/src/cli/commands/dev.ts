import { Arguments, CommandModule } from 'yargs'

interface PackCommandArguments extends Arguments {
  // ...
}

export default {
  command: 'pack',
  describe: 'Creates a distributable Awtrix HD app from your current directory.',
  builder: { },
  handler: async (flags: PackCommandArguments) => {
    // ...
  },
} as CommandModule
