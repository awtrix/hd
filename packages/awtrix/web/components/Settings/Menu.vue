<template>
  <div>
    <Flipper
      :flip-key="settings"
      class="w-full h-full bg-gray-800 grid grid-cols-4 place-items-auto px-12 py-8 gap-6"
    >
      <Flipped v-for="(name, key) in options" :key="key" :flip-id="key">
        <div
          class="bg-gray-400 py-2 mx-4 my-12 flex flex justify-center"
          @click="settings = key"
        >
          {{ name }}
        </div>
      </Flipped>

      <Flipped :flip-id="settings" v-if="settings">
        <div class="absolute inset-0 bg-green-800">
          <component :is="settings" />
          <div class="absolute top-0 right-0" @click="settings = false">X</div>
        </div>
      </Flipped>

      <vue-slider v-if="false" v-model="brightness" />
    </Flipper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppStore from "./AppStore.vue";
import Loop from "./Loop.vue";
import Awtrix from "./Awtrix.vue";
import Connectivity from "./Connectivity.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
// @ts-ignore
import { Flipper, Flipped } from "vue-flip-toolkit";

export default Vue.extend({
  components: {
    AppStore,
    Loop,
    Awtrix,
    Connectivity,
    Flipper,
    Flipped,
    VueSlider,
  },

  data() {
    return {
      settings: false,
      brightness: 0,
      options: {
        AppStore: "App Store",
        Loop: "Loop Configuration",
        Connectivity: "Connectivity",
        Awtrix: "Awtrix Settings",
      },
    };
  },

  watch: {
    brightness: function (val) {
      fetch("/api/system/brightness/"+ val, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
});
</script>

<style lang="stylus">
.active-menu {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
