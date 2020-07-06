import Channel from './communication/channels/Channel'
// @ts-ignore
import App, { Command } from '@awtrix/app'

export default class Matrix {
  apps: App[] = []
  frameInterval?: NodeJS.Timeout

  constructor (protected channel: Channel, protected homeDir: string) { }

  async loadApps () {
    let apps = require(this.homeDir)

    apps.forEach((app: any) => {
      if (app.default) app = app.default

      const initializedApp = new app(this, { 'showSeconds': true })
      this.apps.push(initializedApp)
    })
  }

  async connect () {
    await this.channel.open()
  }

  startWorking () {
    this.frameInterval = setInterval(() => {
      let frame = this.apps[0].frameRequested(1)

      this.channel.send(Command.clear())
      frame.forEach((command: Command) => this.channel.send(command))
      this.channel.send(Command.draw())
    }, 60)
  }
}
