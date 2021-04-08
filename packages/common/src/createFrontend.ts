import {
  defineComponent,
  ComponentOptionsWithoutProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithArrayProps,
  ComponentOptionsMixin,
  EmitsOptions
} from 'vue'
import FrontendApp from './FrontendApp'

function foobar<A, B, C, D, E, F, G, H, K, J>
  (options?: ComponentOptionsWithoutProps<{}, {}, {}, {}, {}, ComponentOptionsMixin, typeof FrontendApp, EmitsOptions, string>): GeneratorType

// TODO: Determine whether we want to remove the extends field from the options' ThisType.
//       Otherwise a user might accidentally use `extends: FooBar` and no longer have proper types.
function foobar(options?: any): GeneratorType {
  const generatorFunction = (base: typeof FrontendApp) => defineComponent({ ...options, extends: base })

  return generatorFunction as GeneratorType
}

export { foobar }

import { ThisTypedComponentOptionsWithRecordProps, ThisTypedComponentOptionsWithArrayProps } from 'vue/types/options'
import { VueConstructor } from 'vue/types/vue'

// `Vue.extend` returns a `VueConstructor<T>`. We want to know what T stands for in this case,
// since this matches the instance type (i.e. `this` when used inside the component).
type VueInstanceType<T> = T extends VueConstructor<infer X> ? X : never

type ExtendReturnType = ReturnType<typeof FrontendApp.extend>
type InstanceType = VueInstanceType<ExtendReturnType>

export type GeneratorType = ((base: typeof FrontendApp) => ReturnType<typeof FrontendApp.extend>) & { options: any }

// Overload the extend function so that app developers can use both
// array props and record props
function extend<Data, Methods, Computed, PropNames extends string = never>
  (options?: ThisTypedComponentOptionsWithArrayProps<InstanceType, Data, Methods, Computed, PropNames>): GeneratorType
function extend<Data, Methods, Computed, Props>
  (options?: ThisTypedComponentOptionsWithRecordProps<InstanceType, Data, Methods, Computed, Props>): GeneratorType

function extend(options?: any): GeneratorType {
  const generatorFunction = (base: typeof FrontendApp) => base.extend(options)

  // `vue-loader` creates a `render` function and attaches it to the exported function's
  // `options` property. If the exported function is a Vue constructor that is fine. We
  // are dealing with our custom generator function however, so we need to add the
  // `options` property as well. We will then override the actual render function after
  // loading the component in our frontend.
  Object.assign(generatorFunction, { options: {} })
  return generatorFunction as GeneratorType
}

export default extend
