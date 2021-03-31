import {
  defineComponent,
  ComponentOptionsWithoutProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithArrayProps,
  ComponentOptionsMixin,
  ComputedOptions,
  MethodOptions,
  ComponentPropsOptions,
  EmitsOptions
} from 'vue'
import FrontendApp from './FrontendApp'

export type GeneratorType = ((base: typeof FrontendApp) => ReturnType<typeof FrontendApp.extend>) & { options: any }

// Define function overloads for the extend function. These are necessary to
// allow for proper TypeScript typing and auto-completion. This basically
// copies the overloaded function types from the @vue/runtime-core package.
// The three possible argument types are:

/**
 * Creates a new Vue component that inherits from the Awtrix HD FrontendApp.
 *
 * @param options
 * @returns GeneratorType
 */
function extend<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = typeof FrontendApp, E extends EmitsOptions = EmitsOptions, EE extends string = string>
  (options: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>): GeneratorType

/**
 * Creates a new Vue component that inherits from the Awtrix HD FrontendApp.
 *
 * @param options
 * @returns GeneratorType
 */
function extend<PropNames extends string, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = typeof FrontendApp, E extends EmitsOptions = Record<string, any>, EE extends string = string>
  (options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE>): GeneratorType

/**
 * Creates a new Vue component that inherits from the Awtrix HD FrontendApp.
 *
 * @param options
 * @returns GeneratorType
 */
function extend<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = typeof FrontendApp, E extends EmitsOptions = Record<string, any>, EE extends string = string>
  (options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>): GeneratorType

/**
 * Creates a new Vue component that inherits from the Awtrix HD FrontendApp.
 *
 * @param options
 * @returns GeneratorType
 */
function extend(options: any): GeneratorType {
  const generatorFunction = (base: typeof FrontendApp) => defineComponent({ ...options, extends: base })

  // `vue-loader` creates a `render` function and attaches it to the exported function's
  // `options` property. If the exported function is a Vue constructor that is fine. We
  // are dealing with our custom generator function however, so we need to add the
  // `options` property as well. We will then override the actual render function after
  // loading the component in our frontend.
  Object.assign(generatorFunction, { options: {} })
  return generatorFunction as GeneratorType
}

export default extend
