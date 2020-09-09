<template>
  <div class="layout--development">
    <div class="nuxt-container" :style="{ transform: `scale(${scaleFactor})` }">
      <Nuxt />
    </div>

    <div class="hint">Development Mode</div>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'

export default Vue.extend({
  data () {
    return {
      scaleFactor: 1,
    }
  },

  mounted () {
    window.addEventListener('resize', debounce(() => this.updateScaleFactor(), 200))
    this.updateScaleFactor()
  },

  methods: {
    updateScaleFactor () {
      let factor = [window.innerWidth / 1280, window.innerHeight / 400]
      this.scaleFactor = Math.min(1, ...factor)
    },
  },
})
</script>
