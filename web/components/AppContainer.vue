<template>
  <div>
    <Application
      v-for="app in applications" :key="app.id"
      :app="app"
      :visible="activeApplication == app.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Application from './Application.vue'

export default Vue.extend({
  components: { Application },

  data () {
    return {
      applications: [{ id: 'time-1' }, { id: 'time-2' }],
      activeApplication: 'time-1'
    }
  },

  created () {
    setInterval(() => {
      let activeIndex = this.applications.findIndex(app => app.id == this.activeApplication)

      let newIndex = (activeIndex + 1) % this.applications.length
      this.activeApplication = this.applications[newIndex].id
    }, 2000)
  }
})
</script>
