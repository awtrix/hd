<template>
  <div class="wrapper">
    <label>{{ t(`settings.${name}.title`) }}</label>
    <p v-if="ht(descriptionKey)">{{ t(descriptionKey) }}</p>
    <component :is="appComponent" v-on="$listeners" v-bind="$attrs" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LifecycleApplication } from '@awtrix/common/dist/types/app'
import Dropdown from '../Inputs/Dropdown.vue'
import TextInput from '../Inputs/TextInput.vue'
import IntegerInput from '../Inputs/IntegerInput.vue'
import ColorInput from '../Inputs/ColorInput.vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    app: {
      type: Object as PropType<LifecycleApplication>,
      required: true,
    },
  },

  computed: {
    appComponent (): any {
      switch (this.options.type) {
        case 'dropdown':
          return Dropdown
        case 'text':
          return TextInput
        case 'integer':
          return IntegerInput
        case 'color':
          return ColorInput
      }
    },

    descriptionKey (): string {
      return `settings.${this.name}.description`
    },
  },

  methods: {
    t (key: string): string {
      // TODO: Set up index.d.ts correctly to include $t and $ht
      // @ts-ignore
      return this.$t(key, this.app)
    },

    ht (key: string): boolean {
      // TODO: Set up index.d.ts correctly to include $t and $ht
      // @ts-ignore
      return this.$ht(key, this.app)
    }
  }
})
</script>

<style lang="stylus" scoped>
.wrapper
  width: 300px
  background: gray
  margin: 10px
  padding: 20px
  text-align: center
</style>
