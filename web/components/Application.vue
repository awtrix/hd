<template>
  <div v-show="visible" class="application">
    <component :is="appComponent" :app="app" :visible="visible"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    app: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    appComponent () {
      if (process.server) return null

      return [
        () => import('./Crypto.vue'),
        () => import('./Time.vue'),
        () => import('./News.vue'),
        () => import('./Weather/Weather.vue'),
      ][this.app.index % 4]

      // return () => this.importComponent('Awtrix')
    }
  },

  methods: {
    async importComponent (name: string): Promise<any> {
      const componentKey = `AwtrixComponent.${name}`

      // This is to get around index errors when accessing unknown keys on
      // the global window object
      const castedWindow = window as any
      if (castedWindow[componentKey]) return castedWindow[componentKey]

      return new Promise(async (resolve, reject) => {
        const url = 'https://pastebin.com/raw/HAtdZ8Wq'
        const script = document.createElement('script')
        script.async = true
        script.addEventListener('load', () => {
          resolve(castedWindow[componentKey])
        })
        script.addEventListener('error', () => {
          reject(new Error(`Error loading ${url}`))
        })
        script.src = `/api/script?url=${encodeURIComponent(url)}`

        document.head.appendChild(script)
      })
    }
  }
})
</script>

<style>
.application {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
}

.application > div {

  flex: 1;
  color: white;
}
</style>
