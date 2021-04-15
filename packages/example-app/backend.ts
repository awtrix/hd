import { BackendApp } from '@awtrix/common'

export default (App: typeof BackendApp) => {
  return class extends App {
    register () {
      console.log(`BackendApp for ${this.config.name} registered.`)
    }
  }
}
