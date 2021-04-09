<template>
  <div class="layout--development">
    <div class="app-container" :style="{ transform: `scale(${scaleFactor})` }">
      <AppContainer />
    </div>

    <div class="hint">Development Mode</div>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { debounce } from 'lodash'
import AppContainer from './components/AppContainer.vue'

export default defineComponent({
  components: { AppContainer },

  data () {
    return {
      scaleFactor: 1,
    }
  },

  created () {
    this.$accessor.config.initializeSocket()
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
