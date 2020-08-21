<template>
  <div class="nuxt-container" :style="{ transform: `scale(${scaleFactor})` }">
    <Nuxt />

    <div class="hint">
      Development Mode.
    </div>

    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'

export default Vue.extend({
  data () {
    return {
      displayWidth: process.server ? 1920 : window.innerWidth,
    }
  },

  mounted () {
    window.addEventListener('resize', debounce(() => {
      this.displayWidth = window.outerWidth
    }, 200))
  },

  computed: {
    scaleFactor (): number {
      return Math.min(1, (this.displayWidth - 50) / 1920)
    },
  },
})
</script>

<style>
html, body {
  height: 100%;
  background: black;
  font-family: 'Ubuntu', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.nuxt-container {
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  margin-left: -960px;
  margin-top: -240px;

  width: 1920px;
  height: 480px;
  background: black;
}

.full {
  width: 100%;
  height: 100%;
}

.hint {
  position: absolute;
  color: white;
  top: calc(100% + 10px);
  font-size: 24px;
  font-weight: 600;
}
</style>
