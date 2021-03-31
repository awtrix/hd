<template>
  <div id="app">
    {{ app.name }}@{{ app.version }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@awtrix/common'

export default defineComponent({
  mounted () {
    this.lock()
  },
})
</script>

<style scoped lang="stylus">
#app
  background: red
</style>
