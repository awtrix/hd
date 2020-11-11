import { ThisTypedComponentOptionsWithRecordProps, ThisTypedComponentOptionsWithArrayProps } from 'vue/types/options'
import { VueConstructor } from 'vue/types/vue'
import FrontendApp from './FrontendApp'

// `Vue.extend` returns a `VueConstructor<T>`. We want to know what T stands for in this case,
// since this matches the instance type (i.e. `this` when used inside the component).
type VueInstanceType<T> = T extends VueConstructor<infer X> ? X : never

type ExtendReturnType = ReturnType<typeof FrontendApp.extend>
type InstanceType = VueInstanceType<ExtendReturnType>

export type GeneratorType = (base: typeof FrontendApp) => ReturnType<typeof FrontendApp.extend>

// Overload the extend function so that app developers can use both
// array props and record props
function extend<Data, Methods, Computed, PropNames extends string = never>
  (options?: ThisTypedComponentOptionsWithArrayProps<InstanceType, Data, Methods, Computed, PropNames>): GeneratorType
function extend<Data, Methods, Computed, Props>
  (options?: ThisTypedComponentOptionsWithRecordProps<InstanceType, Data, Methods, Computed, Props>): GeneratorType

function extend(options?: any): GeneratorType {
  const generatorFunction = (base: typeof FrontendApp) => FrontendApp.extend(options)

  // `vue-loader` creates a `render` function and attaches it to the exported function's
  // `options` property. If the exported function is a Vue constructor that is fine, we
  // are dealing with our custom generator function however, so we need to add the
  // `options` property as well. We will then override the actual render function after
  // loading the component in our frontend.
  Object.assign(generatorFunction, { options: {} })
  return generatorFunction
}

export default extend
