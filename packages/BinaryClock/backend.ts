import { BackendApp } from '@awtrix/common'

export default (App: typeof BackendApp) => {
  return class ExampleApp extends App {
    register () {
      console.log('My app was successfully registered.')
    }
  }
}
