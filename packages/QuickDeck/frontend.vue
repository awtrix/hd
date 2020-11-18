<template>
  <div v-if="appdata" class="m-4 grid grid-cols-10 grid-rows-3 gap-3 h-full">
    <div v-for="item in appdata" v-bind:key="item.name">
      <div :class="getPosition(item.x, item.y)" v-on:click="open(item.name)">
        <div
          class="button__content flex content-center flex-wrap justify-center"
        >
          <img
            class="icon"
            v-bind:src="'data:image/png;base64,' + item.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createFrontend } from "@awtrix/common";

export default createFrontend({
  data() {
    return {
      appdata: [],
      Toast: {
        transition: "Vue-Toastification__bounce",
        maxToasts: 20,
        newestOnTop: true,
        appclass: "",
      },
    };
  },

  mounted() {
    this.io.on("quickdeck", (value) => {
      console.log(value);
      this.appdata = JSON.parse(value);
    });

    var obj = new Object();
    obj.type = "getdata";
    this.io.emit("quickdeckGetData", JSON.stringify(obj));
  },

  methods: {
    getPosition(x, y) {
      console.log(x);
      return "button " + "col-start-" + x + " row-start-" + y;
    },
    async open(msg) {
      var obj = new Object();
      obj.type = "open";
      obj.file = msg;
      this.io.emit("quickdeck1", JSON.stringify(obj));
      this.showToast();
    },
    showToast() {
      this.$toast.success("I'm a toast!");
    },
  },
});
</script>

<style lang="stylus">
.icon {
  height: 65px;
  width: 65px;
  transform: translate3d(0px, -4px, 0px);
  margin-left: auto;
  margin-right: auto;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
}

.button {
  position: relative;
  padding: 0;
  width: 110px;
  height: 110px;
  border: 4px solid #888888;
  outline: none;
  background-color: #f4f5f6;
  border-radius: 40px;
  box-shadow: -6px -20px 35px #ffffff, -6px -10px 15px #ffffff, -20px 0px 30px #ffffff, 6px 20px 25px rgba(0, 0, 0, 0.2);
  transition: 0.13s ease-in-out;
  cursor: pointer;

  &:active {
    box-shadow: none;

    .button__content {
      box-shadow: none;

      .icon {
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    box-shadow: inset 0px -8px 0px #dddddd, 0px -8px 0px #f4f5f6;
    border-radius: 40px;
    transition: 0.13s ease-in-out;
    z-index: 1;
  }

  &__icon {
    position: relative;
    display: flex;
    transform: translate3d(0px, -4px, 0px);
    grid-column: 4;
    align-self: start;
    justify-self: end;
    width: 32px;
    height: 32px;
    transition: 0.13s ease-in-out;

    svg {
      width: 32px;
      height: 32px;
      fill: #aaaaaa;
    }
  }

  &__text {
    position: relative;
    transform: translate3d(0px, -4px, 0px);
    margin: 0;
    align-self: end;
    grid-column: 1 / 5;
    grid-row: 2;
    text-align: center;
    font-size: 32px;
    background-color: #888888;
    color: transparent;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    transition: 0.13s ease-in-out;
  }
}

.credits {
  margin-top: 24px;

  &__reference {
    display: inline-block;
    border-bottom: 1px solid transparent;
    color: #0099ff;
    text-decoration: none;
    transition: ease-in 0.13s;

    &:hover {
      border-bottom-color: #0099ff;
    }
  }
}

.application {
  touch-action: manipulation;
  height: 100%;
  background-color: #f4f5f6;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
</style>
