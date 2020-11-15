import { BackendApp } from '@awtrix/common'
import { Yeelight } from 'yeelight-node'

export default (App: typeof BackendApp) => {
  return class ExampleApp extends App {
    register () {
      console.log('My app was successfully registered.')
      const light = new Yeelight({ ip: '10.0.0.51', port: 55443 })

      this.io.on('connect', (client) => {
        client.on('toggle', (ctx) => {
          light.toggle()
        })
      })
    }
  }
}
