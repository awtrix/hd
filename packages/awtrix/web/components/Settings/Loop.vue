
<template>
  <div>
    <div class="p-2">
      <h3>Available Apps</h3>
      <Draggable class="app-list available"
        :list="available"
        :group="{ name: 'apps', pull: 'clone', put: false }"
        :sort="false"
        :clone="cloneApp"
      >
        <div
          v-for="app in available" :key="`${app.name}@${app.version}`"
          class="app"
        >
          {{ app.name }}
        </div>
      </Draggable>
    </div>

    <div class="p-2">
      <h3>Apps in your Rotation</h3>
      <Draggable class="app-list rotation" :list="rotation" group="apps" @change="rotationChange">
        <div v-for="app in rotation" :key="app.id" class="app">
          {{ app.name }}
        </div>
      </Draggable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RawApplication } from '@/types/Application'
import Draggable, { MoveEvent } from 'vuedraggable'
import shortid from 'shortid'

export default Vue.extend({
  components: { Draggable },

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
.app-list
  display: flex

  .app
    width: 80px
    height: 80px
    padding: 10px;
    margin-right: 10px
    background: white
</style>
