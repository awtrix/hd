<template>
  <div v-if="data" class="app flex justify-center" style="padding: 35px">
    <div v-for="rating in data.ratings" :key="rating.id">
      <div
        class="bg-opacity-75 mx-5 px-16 rounded-lg bg-gray-600 shadow-2xl overflow-hidden"
      >
        <img class="mx-auto mt-2" :src="rating.roleIcon" />
        <img class="mx-auto" style="width: 200px" :src="rating.rankIcon" />
        <div class="glow text-center text-5xl pb-5">{{ rating.level }}</div>
      </div>
    </div>
  </div>

  <img
    v-on:click="open(item.name)"
    v-bind:src="'data:image/jpeg;base64,' + item.image"
  />
</template>

<script lang="ts">
import { createFrontend } from "@awtrix/common";

export default createFrontend({
  data() {
    return {
      platform: "pc",
      region: "us",
      battleTag: "Isack#21810",
      data: undefined,
    };
  },

  mounted() {
    console.log(this.asset("abc.def"));
    this.getData();
  },

  methods: {
    getData() {
      fetch(
        "https://ow-api.com/v1/stats/" +
          this.platform +
          "/" +
          this.region +
          "/" +
          this.battleTag.replace("#", "-") +
          "/profile",
        {}
      )
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          console.log(data.ratings);
          this.ratings = Object.keys(data.ratings).length;
        });
    },
  },
});
</script>

<style>
.app {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/290126/Dorado_002.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}

.glow {
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #0092e6, 0 0 30px #0004e6,
      0 0 40px #0004e6, 0 0 50px #0004e6, 0 0 60px #0004e6;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #0092e6, 0 0 30px #0092e6,
      0 0 40px #0092e6, 0 0 50px #0092e6, 0 0 60px #0092e6, 0 0 70px #0092e6;
  }
}
</style>
