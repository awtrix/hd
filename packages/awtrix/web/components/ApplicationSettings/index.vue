<template>
  <div class="h-full bg-black overflow-x-scroll">
    <button class="text-xl text-white ml-2 mt-1" @click="$emit('closeSettings')">
      &lt; {{application.name}}
    </button>
    <div class="flex">
      <input-wrapper
        v-for="(options, name) in settings"
        :key="name"
        :name="name"
        :options="options"
        :app="application"
        @change="update(name, $event)"
        :value="application.userConfig[name]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from 'vue'
import InputWrapper from './InputWrapper.vue'
import { LifecycleApplication } from '@awtrix/common/dist/types/app'

export default defineComponent({
  name: 'ApplicationSettings',

  components: { InputWrapper },

  props: {
    app: {
      type: Object as PropType<LifecycleApplication>,
      required: false,
    },
  },

  computed: {
    activeApplication (): LifecycleApplication | undefined {
      return this.$accessor.apps.activeApplication
    },

    application (): LifecycleApplication | undefined {
      if (this.app) return this.app
      return this.activeApplication
    },

    settings (): any {
      if (!this.application) return null
      return this.application.config.awtrix.settings
    },
  },

  methods: {
    update (name: string, event: any) {
      const newConfig = { ...this.application!.userConfig }
      newConfig[name] = event.target.value

      this.$accessor.apps.setUserConfig({ id: this.application!.id, config: newConfig })
      this.$accessor.config.socket!.emit('updateUserConfig', this.application!.id, newConfig)
    },
  },
})
</script>
