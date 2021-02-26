<template>
  <div>
    <div>Awtrix</div>
    <div class="flex">
      <input-wrapper
        v-for="(options, name) in settings"
        :key="name"
        :name="name"
        :options="options"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { LifecycleApplication } from '@awtrix/common/dist/types/app'
import InputWrapper from './Inputs/InputWrapper.vue'
import Vue from 'vue'

export default Vue.extend({
  components: { InputWrapper },

  computed: {
    activeApplication (): LifecycleApplication | undefined {
      return this.$accessor.apps.activeApplication
    },

    settings (): any {
      if (!this.activeApplication) return null
      return this.activeApplication.config.awtrix.settings
    },
  },
})
</script>
