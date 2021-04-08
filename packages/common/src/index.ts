export { GeneratorType, default as createFrontend } from './createFrontend'
export { default as BackendApp } from './BackendApp'
export { default as FrontendApp } from './FrontendApp'
import { foobar } from './createFrontend'
export * as Types from './types'

foobar({
  data () {
    return {
      nuddel: 'foa'
    }
  },

  created () {
    this.nuddel
    this.lock()
  }
})
