import Channel from './communication/channels/Channel'
// @ts-ignore
import App, { Command } from '@awtrix/app'
import logger from '../utils/logger'

export default class Matrix {
  apps: App[] = []
  activeApp = 0
  frameInterval?: NodeJS.Timeout

  constructor (protected channel: Channel, protected homeDir: string) { }

  async loadApps () {
    let apps = require(this.homeDir)

    apps.forEach((app: any) => {
      if (app.default) app = app.default

      const initializedApp = new app(this, { 'showSeconds': true })
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
