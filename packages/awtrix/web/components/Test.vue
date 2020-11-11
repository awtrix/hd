<script lang="ts">
import { ThisTypedComponentOptionsWithRecordProps, ThisTypedComponentOptionsWithArrayProps } from 'vue/types/options'
import { ExtendedVue, VueConstructor } from 'vue/types/vue'
import Vue from 'vue'
import Scaffolding from './Scaffolding.vue'

const A = Vue.extend({
  data () {
    return {
      locked: true
    }
  }
})

type FirstArgument<T extends Function> = T extends (arg: infer R) => any ? R : never

type VueInstanceType<T> = T extends VueConstructor<infer X> ? X : never
type ExtendReturnType = ReturnType<typeof Scaffolding.extend>
type InstanceType = VueInstanceType<ExtendReturnType>

function extend<A, B, C, D extends string = never>(options: ThisTypedComponentOptionsWithArrayProps<InstanceType, A, B, C, D>): any;
function extend<A, B, C, D>(options: ThisTypedComponentOptionsWithRecordProps<InstanceType, A, B, C, D>): any;
function extend(options: any): any {
  (base: typeof Scaffolding) => Scaffolding.extend(options)
}

extend({
  props: {
    stranger: {
      type: String,
    }
  },

  data () { return { foobar: 'foo' } },

  mounted () {
    console.log(this.lock())
    console.log(this.stranger)
  }
})







/*
type FirstArgument<T extends Function> = T extends (arg: infer R) => any ? R : never
type VueInstanceType<T> = T extends VueConstructor<infer X> ? X : never

type ScaffoldingArgument = FirstArgument<typeof Scaffolding.extend>
type ScaffoldingReturn = ReturnType<typeof Scaffolding.extend>
type ScaffoldingInstanceType = VueInstanceType<ScaffoldingReturn>

function extend2(options: ScaffoldingArgument & ThisType<ScaffoldingInstanceType>) {
  return (Base: typeof Scaffolding) => Base.extend(options)
}

export default extend2({
  data() {
    return {
      name: 'none',
    }
  },

  mounted () {
    this.isLocked
  }
})*/
</script>
