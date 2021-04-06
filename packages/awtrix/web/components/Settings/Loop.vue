
<template>
  <div class="flex">
    <div class="available">
      <h3>Available Apps</h3>
      <Draggable class="app-list"
        :list="available"
        :group="{ name: 'apps', pull: 'clone', put: false }"
        :sort="false"
        :clone="cloneApp"
      >
        <application-banner
          v-for="app in available"
          :key="`${app.name}@${app.version}`"
          :app="app"
        />
      </Draggable>
    </div>

    <div class="active">
      <div class="loop">
        <h3>Rotation Apps</h3>
        <Draggable class="app-list rotation" :list="rotation" group="apps" @change="rotationChange">
          <application-banner v-for="app in rotation" :key="app.id" :app="app" />
        </Draggable>
     </div>

     <div class="background">
        <h3>Background Apps</h3>
        <Draggable class="app-list rotation" :list="rotation" group="apps" @change="rotationChange">
          <application-banner v-for="app in rotation" :key="app.id" :app="app" />
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RawApplication } from '@awtrix/common/dist/types/app'
import Draggable, { MoveEvent } from 'vuedraggable'
import shortid from 'shortid'
import ApplicationBanner from './ApplicationBanner.vue'

export default defineComponent({
  components: { Draggable, ApplicationBanner },

  data () {
    return {
      rotation: [] as RawApplication[],
      available: [] as RawApplication[],
    }
  },

  async created () {
    this.loadApplications()
  },

  methods: {
    async loadApplications () {
      // TODO: Fetch background apps too.
      this.rotation = await fetch('/api/apps/rotation').then(response => response.json())
      this.available = await fetch('/api/apps/available').then(response => response.json())
    },

    cloneApp (app: RawApplication): RawApplication {
      return { ...app, id: shortid.generate() }
    },

    rotationChange<T> (event: any) {
      if (event.added) this.saveApp(event.added.element, event.added.newIndex)
      // if (event.moved) this.updateOrder()
    },

    async saveApp (app: RawApplication, index: number) {
      fetch('/api/apps/rotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...app, index }),
      })
    },
  },
})
</script>

<style lang="stylus" scoped>
.available
  width: application-banner-size * 2 + 20px
  height: awtrix-height

.app-list
  display: flex
  flex-wrap: wrap
</style>
