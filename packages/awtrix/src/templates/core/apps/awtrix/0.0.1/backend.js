const { Yeelight } = require('yeelight-node')

module.exports = (BaseClass) => {
  return class extends BaseClass {
    register () {
      const light = new Yeelight({ ip: '10.0.0.51', port: 55443 })

      this.io.on('connect', (client) => {
        client.on('toggle', (ctx) => {
          light.toggle()
        })
      })
    }
  }
}
