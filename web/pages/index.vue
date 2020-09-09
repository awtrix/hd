<template>
  <AppContainer />
</template>

<script lang="ts">
import Vue from 'vue'
import AppContainer from '../components/AppContainer.vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  components: { AppContainer },

  layout (): string {
    if (navigator.userAgent === 'AWTRIX HD') return 'default'
    return 'development'
  }
})
</script>
