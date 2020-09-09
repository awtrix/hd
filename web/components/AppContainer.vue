<template>
  <div class="w-full h-full">
    <Application
      v-for="(app, index) in applications" :key="app.id"
      :app="app"
      :visible="index == activeApplicationIndex"
      @ready="setReady(app, true)" @finished="setReady(app, false)"
      @lock="setLocked(app, true)" @unlock="setLocked(app, false)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Application from './Application.vue'
import shortid from 'shortid'

type RawApplication = {
  name: string,
  id: string,
  meta: {
    between: string[],
    displayLength: number,
  },
  config: any,
}

type LifecycleApplication = RawApplication & {
  lifecycle: {
    ready: boolean,
    locked: boolean,
  },
}

enum SwitchingReason {
  Loop,
  MaskableInterrupt,
  UnmaskableInterrupt,
}

export default Vue.extend({
  components: { Application },

  data () {
    return {
      applications: [] as LifecycleApplication[],
      activeApplicationIndex: 0,
      interruptedApplicationIndex: undefined as number | undefined,
      loopTimeout: undefined as number | undefined,
    }
  },

  async created () {
    this.applications = await this.loadApplications()

    // TODO: What if no applications are available?
    this.startApplication(this.applications[0].id)
  },

  methods: {
    async loadApplications (): Promise<LifecycleApplication[]> {
      // TODO: Fetch background apps too.
      const response = await fetch('/api/apps/rotation')
      let apps = await response.json()

      const defaultLifecycle = { ready: false, locked: false }
      return apps.map((app: any) => ({
        ...app,
        meta: { displayLength: 15000 }, // TODO: Can be removed later on.
        lifecycle: defaultLifecycle
      }))
    },

    startApplication (id: string, interrupt = false): void {
      if (interrupt) this.interruptedApplicationIndex = this.activeApplicationIndex

      let index = this.applications.findIndex(app => app.id == id)
      this.activeApplicationIndex = index

      window.setTimeout(() => {
        this.switchApplication(this.nextAvailableApplication(), SwitchingReason.Loop)
      }, this.activeApplication.meta.displayLength)
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
          if (this.activeApplication.lifecycle.locked) {
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
  },

  computed: {
    activeApplication (): LifecycleApplication {
      return this.applications[this.activeApplicationIndex]
    },
  }
})
</script>
