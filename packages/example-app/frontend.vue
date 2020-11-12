<template>
    <div class="banana" style="padding: 30px">
        <button @click="toggle" :style="{ backgroundColor: status == 'on' ? 'green' : 'red' }">Toggle Light</button>
        <p>Current Status: {{ status }}</p>
    </div>
</template>

<script lang="ts">
import { createFrontend } from '@awtrix/common'

export default createFrontend({
  props: {
    custom: {
      type: String
    }
  },

  data () {
    return {
      status: 'n/a',
    }
  },

  mounted () {
    console.log(this.asset('abc.def'));
  },

  methods: {
    async toggle () {
      this.io.emit('toggle')
    },
  },
})
</script>
