import Channel from './communication/channels/Channel'
import App, { Command } from '@awtrix/app'

// We need to create a couple of helper types so that we get the type for
// the non-abstract version of our abstract app. Otherwise we won't be able
// to construct it from the user's config, as abstract classes can't be
// constructed.
type AbstractConstructorHelper<T> = (new (...args: any) => { [x: string]: any; }) & T;
type AbstractContructorParameters<T> = ConstructorParameters<AbstractConstructorHelper<T>>;
type AppParameters = AbstractContructorParameters<typeof App>
type ImplementedApp = { new(...a: AppParameters): App }

// The type of the module returned by `app/fixtures/index.js`.
type UserConfig = {
  config: any,
  apps: {
    [k: string]: ImplementedApp | { default: ImplementedApp }
  }
}

export default class Matrix {
  width = 32
  height = 8

  apps: App[] = []
  activeApp = 0

  frameInterval?: NodeJS.Timeout

  constructor (protected channel: Channel, protected homeDir: string) { }

  async loadApps () {
    let config = require(this.homeDir) as UserConfig

    Object.values(config.apps).forEach((ctor) => {
      if (typeof ctor === 'object') ctor = ctor.default

      const initializedApp = new ctor(this, { 'showSeconds': true })
      initializedApp.setup()
      this.apps.push(initializedApp)
    })
  }

  async connect () {
    await this.channel.open()
  }

  startWorking () {
    setInterval(() => {
      this.activeApp = (this.activeApp + 1) % this.apps.length
    }, 20000)

    this.frameInterval = setInterval(() => {
      let frame = this.apps[this.activeApp].frameRequested(1)

      this.channel.send(Command.clear())
      frame.forEach((command: Command) => this.channel.send(command))
      this.channel.send(Command.draw())
    }, 60)
  }
}
