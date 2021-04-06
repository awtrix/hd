<template>
  <div class="app">
    <img src="https://placehold.it/110x110">
    <div class="content">
      <p>{{ app.name }}</p>
      <i class="fas fa-cog edit" @click="edit" v-if="app.id"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RawApplication } from '@awtrix/common/dist/types/app'

export default defineComponent({
  props: {
    app: {
      type: Object as PropType<RawApplication>,
      required: true,
    },
  },

  methods: {
    edit () {
      alert(JSON.stringify(this.app))
    },
  },
})
</script>

<style lang="stylus" scoped>
padding = 5px

.app
  width: application-banner-size
  height: application-banner-size
  padding: padding
  position: relative

  img
    position: absolute
    top: padding
    left: padding
    z-index: 1

  .content
    position: relative
    z-index: 2

  .edit
    position: absolute
    top: 0
    right: 0
</style>
