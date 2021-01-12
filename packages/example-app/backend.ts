import { BackendApp } from '@awtrix/common'

export default (App: typeof BackendApp) => {
  return class extends App {
    register () {
      setInterval(() => {
        this.io.emit('schnitzel', Math.random())
      }, 1000)
    }
  }
}
