<template>
  <div class="myclass">
    Test 22 {{ stat }}
  </div>
</template>

<script>
import { createFrontend } from '@awtrix/common'

export default createFrontend({
  data () {
    return {
      stat: 'n/a',
    }
  },

  mounted () {
    this.io.on('schnitzel', (value) => { this.stat = value })
  },
})
</script>
