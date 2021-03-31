<template>
  <div>
    {{ app.name }}@{{ app.version }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@awtrix/common'

export default defineComponent({
  mounted () {
    console.log(`${this.app.name} has been mounted.`)
  },
})
</script>
