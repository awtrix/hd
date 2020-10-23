<template>
  <div class="w-full h-full relative">
    <div class="application loop" ref="applicationLoopContainer">
      <Application
        v-for="app in applications" :key="app.id"
        :app="app"
        :visible="app.id == activeApplicationID"
        @ready="setReady(app, true)" @finished="setReady(app, false)"
        @lock="setLocked(app, true)" @unlock="setLocked(app, false)"
        @requestHidden="switchToNextApplication()" @destroy="destroy(app)"
      />
    </div>

    <Menu
      class="w-full h-full absolute"
      :style="{ top: `${settings.offset}px` }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Application from './Application.vue'
import Menu from './Settings/Menu.vue'
import shortid from 'shortid'
import Hammer from 'hammerjs'
import { debounce } from 'lodash'
import { LifecycleApplication } from '@/types/Application'

enum SwitchingReason {
  Loop,
  MaskableInterrupt,
  UnmaskableInterrupt,
}

export default Vue.extend({
  components: { Application, Menu },

  data () {
    return {
      applications: [] as LifecycleApplication[],
      settings: {
        offset: -480,
        panStart: null as number | null,
        hammertime: undefined as HammerManager | undefined,
      },
    }
  },

  async created () {
    // Set up socket.io
  },

  mounted () {
    let hammertime = new Hammer(this.$refs.applicationLoopContainer as HTMLElement)
    hammertime.add(new Hammer.Pan({ direction: Hammer.DIRECTION_DOWN }))
    hammertime.on('panstart', (input) => this.startPanning(input))
    hammertime.on('panmove', (input) => this.panMenu(input))
    hammertime.on('panend', (input) => this.endPanning(input))

    this.settings.hammertime = hammertime
  },

  methods: {
    startPanning (input: HammerInput) {
      let y = input.center.y - input.target.getBoundingClientRect().top
      if (y > 60) return this.settings.panStart = null

      this.settings.panStart = y
    },

    panMenu (input: HammerInput) {
      if (this.settings.panStart === null) return

      let y = -480 + this.settings.panStart + input.deltaY - 20
      this.settings.offset = Math.min(0, y)
    },

    endPanning (input: HammerInput) {
      this.settings.offset = (input.deltaY > 240) ? 0 : -480
      this.settings.panStart = null
    },

    bootAnimation (): LifecycleApplication {
      return { name: 'boot', id: 'boot', index: -1, meta: {
        between: ['1', '2'],
        displayLength: 100000,
      }, config: {}, lifecycle: { ready: true, locked: true }}
    },
  },
})
</script>
