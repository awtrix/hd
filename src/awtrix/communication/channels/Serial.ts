import Channel from './Channel'
import Command from '../command'

export default class Serial implements Channel {

  async open (): Promise<boolean> {
    return true
  }

  async close (): Promise<void> {

  }

  async send (command: Command): Promise<boolean> {
    return true
  }
}
