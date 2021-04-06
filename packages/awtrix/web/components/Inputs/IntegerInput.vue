<template>
  <div>
    <input type="number" v-bind="$attrs" v-on="$listeners">
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
})
</script>
