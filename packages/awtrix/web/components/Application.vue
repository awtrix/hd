<template>
  <div v-show="visible" class="w-full h-full relative">
    <link rel="stylesheet" :href="styleUrl" />
    <component :is="appComponent" :app="app" :visible="visible" :io="io"
      v-on="$listeners"
    />
    <button
      class="text-white absolute text-3xl right-3 top-4 cursor-pointerzs"
      @click="$emit('showSettings')">
      <i class="fa fa-cogs" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType } from 'vue'
import io, { Socket } from 'socket.io-client'
import { GeneratorType, FrontendApp, Types } from '@awtrix/common'

export default defineComponent({
  props: {
    app: {
      type: Object as PropType<Types.Application.LifecycleApplication>,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      io: undefined as typeof Socket | undefined,
    }
  },

  computed: {
    appComponent (): () => Promise<any> {
      if (this.app.id == 'boot') return () => import('./BootAnimation.vue')

      return defineAsyncComponent(() => this.importComponent())
    },

    baseUrl (): string {
      return `/static/apps/${this.app.name}/${this.app.version}`
    },

    styleUrl (): string {
      return `${this.baseUrl}/style.css`
    },
  },

  watch: {
    app: {
      immediate: true,
      handler (app) {
        this.io = io(`http://${location.hostname}:3002/apps/${app.id}`)
      },
    },
  },

  methods: {
    async importComponent (): Promise<ReturnType<GeneratorType>> {
      const url = `${this.baseUrl}/${this.app.name}.umd.js`

      // This is to get around index errors when accessing unknown keys on
      // the global window object
      const libName = `${this.app.name}@${this.app.version.replace(/\./g, '-')}`
      const castedWindow = window as any
      if (castedWindow.AwtrixComponent && castedWindow.AwtrixComponent[libName]) {
        return castedWindow.AwtrixComponent[libName]
      }

      const generate: GeneratorType = await new Promise(async (resolve, reject) => {
        const script = document.createElement('script')
        script.async = true
        script.addEventListener('load', () => {
          resolve(castedWindow.AwtrixComponent[libName])
        })
        script.addEventListener('error', () => {
          reject(new Error(`Error loading ${url}`))
        })
        script.src = url

        document.head.appendChild(script)
      })

      const generated = generate(FrontendApp)

      // Since `vue-loader` adds a compiled render function to the exported
      // object, but we're exporting a generator function, rather than the Vue
      // constructor, we need to now override the original render function with
      // the compiled one.
      // TODO: Object.assign doesn't work here, but find a better way than this!
      // @ts-ignore
      generated.render = generate.render
      // @ts-ignore
      generated.__scopeId = generate.__scopeId

      return generated
    }
  }
})
</script>
