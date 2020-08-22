<template>
  <div v-show="visible" class="application">
    <component :is="appComponent" :app="app" :visible="visible"
      v-on="$listeners"
    />
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
      return () => import('./News.vue')
    }
  }
})
</script>

<style>
.application {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
}

.application > div {

  flex: 1;
}
</style>
