<template>
    <div class="banana" style="padding: 30px">
        <button @click="toggle" :style="{ backgroundColor: status == 'on' ? 'green' : 'red' }">Toggle Light</button>
        <p>Current Status: {{ status }}</p>
        <img src="abc.png">
    </div>
</template>

<script lang="ts">
import { createFrontend } from '@awtrix/common'

export default createFrontend({
  data () {
    return {
      status: 'n/a',
    }
  },

  mounted () {
    // this.asset('abc.img')
  },

  methods: {
    async toggle () {
      this.io.emit('toggle')
    },
  },
})
</script>
