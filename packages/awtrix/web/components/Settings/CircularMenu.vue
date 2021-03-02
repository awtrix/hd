<template>
  <div class="menu">
    <div class="vertical-menu">
      <button class="drop" @click="settings = 'AppStore'">
        <i class="fas fa-store" />
      </button>
      <button class="drop" @click="settings = 'Loop'">
        <i class="fas fa-infinity" />
      </button>
      <button class="drop" @click="settings = 'Connectivity'">
        <i class="fas fa-wifi" />
      </button>
      <button class="drop" @click="settings = 'Awtrix'">
        <i class="fas fa-cog" />
      </button>
      <button class="drop smaller" @click="$emit('close')">
        <i class="fas fa-times" />
      </button>
    </div>
    <div class="active-menu-item" v-if="settings">
      <component :is="settings" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppStore from './AppStore.vue'
import Loop from './Loop.vue'
import Awtrix from './Awtrix.vue'
import Connectivity from './Connectivity.vue'

export default Vue.extend({
  components: {
    AppStore,
    Loop,
    Awtrix,
    Connectivity,
  },

  data () {
    return {
      settings: false,
    }
  },
})
</script>

<style scoped lang="stylus">
.menu
  display: flex
  flex-direction: row

.vertical-menu
  display: flex
  flex-direction: column
  justify-content: space-around
  padding: 20px
  padding-left: 50px

.drop
  background: orange
  border-radius: 50%
  height: 60px
  width: @height
  display: flex
  align-items: center
  justify-content: center
  font-size: 28px
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.4)
  color: white

.drop.smaller
  background: white
  color: orange
  height: 28px
  width: @height
  margin-left: 16px
  margin-top: 10px
  font-size: 14px

.active-menu-item
  width: awtrix-width - 130px
</style>
