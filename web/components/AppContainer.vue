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
      activeApplicationID: undefined as string | undefined,
      interruptedApplicationIndex: undefined as number | undefined,
      loopTimeout: undefined as number | undefined,
      settings: {
        offset: -480,
        panStart: null as number | null,
        hammertime: undefined as HammerManager | undefined,
      },
    }
  },

  async created () {
    let apps = await this.loadApplications()
    let boot = this.bootAnimation()

    this.applications = [boot, ...apps]

    // TODO: What if no applications are available?
    this.startApplication(this.applications[0].id)
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

    async loadApplications (): Promise<LifecycleApplication[]> {
      // TODO: Fetch background apps too.
      const apps = await fetch('/api/apps/rotation').then(response => response.json())

      const defaultLifecycle = { ready: false, locked: false }
      return apps.map((app: any) => ({
        ...app,
        meta: { displayLength: 15000 }, // TODO: Can be removed later on.
        lifecycle: defaultLifecycle
      }))
    },

    startApplication (id: string, interrupt = false): void {
      if (interrupt) this.interruptedApplicationIndex = this.activeApplicationIndex

      this.activeApplicationID = id
      window.setTimeout(() => this.switchToNextApplication(), this.activeApplication!.meta.displayLength)
    },

    switchToNextApplication (reason: SwitchingReason = SwitchingReason.Loop) {
      this.switchApplication(this.nextAvailableApplication(), reason)
    },

    nextAvailableApplication (): string {
      let index = this.activeApplicationIndex
      let count = 0
      do {
        index = (index + 1) % this.applications.length

        // TODO: Finalize this.
        if (count++ >= this.applications.length) break
      } while (!this.applications[index].lifecycle.ready)

      return this.applications[index].id
    },

    switchApplication (id: string, reason: SwitchingReason) {
      // TODO: If this.interruptedApplicationIndex is set, switch back to it.

      switch (reason) {
        case SwitchingReason.UnmaskableInterrupt:
          return this.startApplication(id, true)

        case SwitchingReason.MaskableInterrupt:
          return this.scheduleSwitch(id, true)

        case SwitchingReason.Loop:
          if (this.activeApplication?.lifecycle.locked) {
            return this.scheduleSwitch(id)
          }

          this.startApplication(id)
      }
    },

    scheduleSwitch (id: string, interrupt = false) {
      // TODO: By the time the switch takes place, it might not be ready anymore

      let unwatch = this.$watch(() => {
        let index = this.applications.findIndex(app => app.id == id)
        return this.applications[index].lifecycle.locked
      }, (locked) => {
        if (locked) return

        this.startApplication(id, interrupt)
        unwatch()
      })
    },

    setLocked (app: LifecycleApplication, newState: boolean) {
      let index = this.applications.findIndex(a => a.id == app.id)
      this.applications[index].lifecycle.locked = newState
    },

    setReady (app: LifecycleApplication, newState: boolean) {
      let index = this.applications.findIndex(a => a.id == app.id)
      this.applications[index].lifecycle.ready = newState
    },

    destroy (app: LifecycleApplication) {
      this.setLocked(app, false)

      let index = this.applications.findIndex(a => a.id == app.id)
      this.applications.splice(index, 1)

      if (this.activeApplicationID == app.id) {
        this.switchToNextApplication()
      }
    },
  },

  computed: {
    activeApplicationIndex (): number {
      return this.applications.findIndex(app => app.id == this.activeApplicationID)
    },

    activeApplication (): LifecycleApplication | null {
      return this.applications[this.activeApplicationIndex]
    },
  }
})
</script>
