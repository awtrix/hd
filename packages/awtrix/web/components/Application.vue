<template>
  <div v-show="visible" class="w-full h-full">
    <component :is="appComponent" :app="app" :visible="visible"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { LifecycleApplication } from '@/types/Application'

// TODO: Figure out a better spot for this. Otherwise we need to use
// "--inline-vue" when building apps
// @ts-ignore
window.Vue = Vue

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
    appComponent (): () => Promise<any> {
      if (this.app.id == 'boot') return () => import('./BootAnimation.vue')

      return () => this.importComponent(this.app.name, this.app.version!)
    }
  },

  methods: {
    async importComponent (name: string, version: string): Promise<any> {
      const componentKey = `AwtrixComponent.${name}`
      const url = `/static/apps/${name}/${version}/AwtrixComponent.${name}.umd.js`

      // This is to get around index errors when accessing unknown keys on
      // the global window object
      const castedWindow = window as any
      if (castedWindow[componentKey]) return castedWindow[componentKey]

      return new Promise(async (resolve, reject) => {
        const script = document.createElement('script')
        script.async = true
        script.addEventListener('load', () => {
          resolve(castedWindow[componentKey])
        })
        script.addEventListener('error', () => {
          reject(new Error(`Error loading ${url}`))
        })
        script.src = url

        document.head.appendChild(script)
      })
    }
  }
})
</script>
