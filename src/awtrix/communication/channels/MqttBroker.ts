import Channel from './Channel'
import aedes from 'aedes'
import chalk from 'chalk'
import { createServer, Server } from 'net'
import Command from '../command'
import logger from '../../../utils/logger'
import textLength from '../../../utils/text'
import mqtt from 'mqtt'

function sleep (milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export default class MqttBroker implements Channel {
  protected broker: aedes.Aedes
  protected server: Server

  protected mosq?: mqtt.Client

  constructor (protected port: number) {
    // @TODO: Make built-in mqtt server configurable
    this.broker = aedes()
    this.server = createServer(this.broker.handle)

    this.attachHandlers()
  }

  open (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.server.listen(this.port, () => {
        logger.info(chalk`MQTT runnning at {bold \*:${this.port}}.`)
        resolve(true)
      })
    })
  }

  async close (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  attachHandlers () {
    this.broker.on('client', (client) => {
      // @ts-ignore
      logger.info(chalk`Client ${client.id} connected from ${client.conn.remoteAddress}`)

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
    })
  }

  async send (command: Command): Promise<boolean> {
    this.broker.publish({
      cmd: 'publish',
      qos: 1,
      dup: false,
      retain: false,
      topic: 'awtrixmatrix',
      payload: command.message,
    }, () => {})

    return true
  }
}
