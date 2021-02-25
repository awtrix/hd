<template>
  <div>
    {{ name }}: <input type="text">
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
})
</script>
