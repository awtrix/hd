<template>
  <component :is="appComponent" v-on="$listeners" v-bind="$attrs" :options="options" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import TextInput from './TextInput.vue'

export default Vue.extend({
  props: {
    options: {
      type: Object,
      required: true,
    },
  },

  computed: {
    appComponent () {
      switch (this.options.type) {
        case 'dropdown':
          return Dropdown
        default:
          return TextInput
      }
    },
  },
})
</script>
