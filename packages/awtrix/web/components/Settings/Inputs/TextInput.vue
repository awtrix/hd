<template>
  <div>
    <input type="text">
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
})
</script>
