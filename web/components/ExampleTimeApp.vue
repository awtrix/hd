<template>
  <div>
    {{ app.id }} (Visible for {{ visibleSince }}s)
  </div>
</template>

<script lang="ts">
import Scaffolding from './Scaffolding.vue'

export default Scaffolding.extend({
  data () {
    return {
      visibleSince: 0,
      interval: undefined as undefined | number,
    }
  },

  methods: {
    becameVisible () {
      // TODO: Figure out how to get rid of this (happens because of `immediate: true`)
      if (process.server) return

      this.visibleSince = 0
      this.interval = window.setInterval(() => this.visibleSince++, 1000)

      window.setTimeout(() => this.lock(), 10000)
      window.setTimeout(() => this.unlock(), 20000)
    },

    becameHidden () {
      window.clearInterval(this.interval!)
    },
  }
})
</script>
