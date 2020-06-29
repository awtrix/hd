import Channel from './Channel'
import Command from '../command'
import textLength from '../../../utils/text'
import mqtt from 'mqtt'

function sleep (milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export default class MQTT implements Channel {
  protected mosq?: mqtt.Client

  constructor (protected port: number) {
  }

  open (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.mosq = mqtt.connect('mqtt://localhost:7001')

      setTimeout(async () => {
        let text = "Hello, World."
        let length = textLength(text)

        for (let i = 31; i >= -length; i--) {
          this.send(Command.clear())
          this.send(Command.text(text, [i, 1], '#ff00ef'))
          this.send(Command.draw())
          await sleep(63)
        }
      }, 500)

      resolve(true)
    })
  }

  async close (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mosq?.end()
      resolve()
    })
  }

  async send (command: Command): Promise<boolean> {
    this.mosq?.publish('awtrixmatrix', command.message)
    return true
  }
}
