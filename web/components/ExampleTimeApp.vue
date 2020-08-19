<template>
  <div :style="{ backgroundColor: isLocked ? 'red' : 'transparent' }">
    {{ app.id }}
  </div>
</template>

<script lang="ts">
import Scaffolding from './Scaffolding.vue'

export default Scaffolding.extend({
  methods: {
    becameVisible () {
      // TODO: Figure out how to get rid of this (happens because of `immediate: true`)
      if (process.server) return

      window.setTimeout(() => this.lock(), 1000)
      window.setTimeout(() => this.unlock(), 3000)
    }
  }
})
</script>
