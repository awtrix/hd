<template>
  <div>
    <input type="text" v-bind="$attrs" v-on="$listeners">
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
