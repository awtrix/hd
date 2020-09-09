<template>
  <div v-show="visible" class="w-full h-full">
    <component :is="appComponent" :app="app" :visible="visible"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { LifecycleApplication } from './AppContainer.vue'

export default Vue.extend({
  props: {
    app: {
      type: Object as PropType<LifecycleApplication>,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    appComponent () {
      if (this.app.id == 'boot') return () => import('./BootAnimation.vue')

      return [
        () => import('./ExampleApps/PeopleInSpace.vue'),
        () => import('./ExampleApps/Crypto.vue'),
        () => import('./ExampleApps/News.vue'),
        () => import('./ExampleApps/Weather.vue'),
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
