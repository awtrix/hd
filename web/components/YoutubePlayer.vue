<template>
  <main>
    <iframe
      :src="'https://www.youtube.com/embed/'+ videoIDs[index] + '?start=8&enablejsapi=1&autoplay=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&controls=0&disablekb=1'"
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

  methods: {
    becameVisible() {
      this.index = (this.index + 1) % this.videoIDs.length;
    },
    becameHidden() {
      var iframe = document.querySelector("iframe");
      var video = document.querySelector("video");
      if (iframe) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
      }
      if (video) {
        video.pause();
      }
    },
  },
});
</script>

<style lang="stylus"></style>
