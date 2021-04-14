<template>
  <div v-show="visible" class="w-full h-full">
    <component :is="appComponent" :app="app" :visible="visible" :io="io"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType } from 'vue'
import { LifecycleApplication } from '@awtrix/common/dist/types/app'
import io, { Socket } from 'socket.io-client'
import { GeneratorType, FrontendApp } from '@awtrix/common'

export default defineComponent({
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

  data () {
    return {
      io: undefined as typeof Socket | undefined,
    }
  },

  computed: {
    appComponent (): () => Promise<any> {
      if (this.app.id == 'boot') return () => import('./BootAnimation.vue')

      return defineAsyncComponent(
        () => this.importComponent(this.app.name, this.app.version!)
      )
    },
  },

  watch: {
    app: {
      immediate: true,
      handler (app) {
        this.io = io(`http://${location.hostname}:3001/apps/${app.id}`)
      },
    },
  },

  methods: {
    async importComponent (name: string, version: string): Promise<ReturnType<GeneratorType>> {
      const url = `/static/apps/${name}/${version}/${name}.umd.js`

      // This is to get around index errors when accessing unknown keys on
      // the global window object
      const libName = `${name}@${version.replace(/\./g, '-')}`
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

      return generated
    }
  }
})
</script>
