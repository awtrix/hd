<template>
  <main>
    <iframe
      :src="'https://www.youtube.com/embed/'+ videoIDs[index] + '?start=8&autoplay=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&controls=0&disablekb=1'"
      width="1920"
      height="480"
      frameborder="0"
    ></iframe>
  </main>
</template>

<script lang="ts">
import Scaffolding from "./Scaffolding.vue";
export default Scaffolding.extend({
  data() {
    return {
      videoIDs: ["GS48Apr5jwI", "_6GZvTCvxBQ"],
      index: 0,
      mute: false,
    };
  },

  mounted() {},

  beforeUpdate() {},

  methods: {
    becameVisible() {
      this.index = (this.index + 1) % this.videoIDs.length;
    },
  },
});
</script>

<style lang="stylus"></style>
