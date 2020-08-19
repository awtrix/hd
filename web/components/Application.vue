<template>
  <div v-show="visible">
    <component :is="appComponent" :app="app" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    app: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    appComponent () {
      // TODO: Replace with network call
      // @see https://markus.oberlehner.net/blog/distributed-vue-applications-loading-components-via-http/
      return () => import('./ExampleTimeApp.vue')
    }
  }
})
</script>
