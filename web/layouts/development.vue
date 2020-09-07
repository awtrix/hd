<template>
  <div>
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

<style lang="stylus">
html, body {
  height: 100%;
  font-family: 'Ubuntu', sans-serif;
  overflow: hidden;

  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(135deg, transparent 75%, #ccc 75%);
  background-size:25px 25px; /* Must be a square */
  background-position:0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px; /* Must be half of one side of the square */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.nuxt-container, .ruler {
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
  color: black;
  left: 20px;
  top: calc(50% + 240px + 12px);
  font-size: 24px;
  font-weight: 600;
}
</style>
