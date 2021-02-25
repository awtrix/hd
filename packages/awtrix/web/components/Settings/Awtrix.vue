<template>
  <div>
    <div>Awtrix</div>
    <div>{{ activeApplication }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    activeApplication () {
      this.$accessor.apps.activeApplication
    },
  },
})
</script>
