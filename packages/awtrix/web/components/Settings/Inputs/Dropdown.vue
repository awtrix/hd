<template>
  <div>
    {{ name }}:
    <select>
      <option v-for="option in options.options" :key="option">{{ option }}</option>
    </select>
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
