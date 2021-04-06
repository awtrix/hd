<template>
  <div class="cube" :class="`show-face-${face}`">
    <div
      v-for="index in 10" :key="index"
      class="face"
      :class="{ show: face == index, [`face-${index - 1}`]: true }"
    >
      <div class="content">{{ index - 1 }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    face: String,
  },
})
</script>

<style lang="stylus">
width = 300px

.cube {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: width;
    height: width;
    perspective: 100000px;
    perspective-origin: width width;
    transform-style: preserve-3d;
    transition: 0.3s;
    margin: 5px;

    & > .face {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: width;
        height: width;

        & > .content {
            display: flex;
            justify-content: center;
            align-items: center;
            width: width;
            height: width;
            font-size: 160px;
            opacity: 0;
            transition: 0.5s;
        }

        &.face-0 > .content {
            background: rgb(225, 225, 250);
            color: white;
        }
        &.face-1 > .content {
            background: rgb(200, 200, 225);
            color: white;
        }
        &.face-2 > .content {
            background: rgb(175, 175, 200);
            color: white;
        }
        &.face-3 > .content {
            background: rgb(150, 150, 175);
            color: white;
        }
        &.face-4 > .content {
            background: rgb(125, 125, 150);
            color: white;
        }
        &.face-5 > .content {
            background: rgb(100, 100, 125);
            color: white;
        }
        &.face-6 > .content {
            background: rgb(75, 75, 100);
            color: white;
        }
        &.face-7 > .content {
            background: rgb(50, 50, 75);
            color: white;
        }
        &.face-8 > .content {
            background: rgb(25, 25, 50);
            color: white;
        }
        &.face-9 > .content {
            background: rgb(0, 0, 25);
            color: white;
        }

        &.face-0,
        &.face-6 {
            transform: rotateX(0deg) translateZ(50px);
            z-index: 10;
        }
        &.face-1,
        &.face-7 {
            transform: rotateY(90deg) translateZ(50px);
            z-index: 20;
        }
        &.face-2,
        &.face-8 {
            transform: rotateX(180deg) translateZ(50px);
            z-index: 30;
        }
        &.face-3,
        &.face-9 {
            transform: rotateY(-90deg) translateZ(50px);
            z-index: 40;
        }
        &.face-4 {
            transform: rotateX(90deg) translateZ(50px);
            z-index: 50;
        }
        &.face-5 {
            transform: rotateX(-90deg) translateZ(50px);
            z-index: 60;
        }
    }

    &.show-face-0 > .face-0 > .content {
        opacity: 1;
    }
    &.show-face-1 > .face-1 > .content {
        opacity: 1;
    }
    &.show-face-2 > .face-2 > .content {
        opacity: 1;
    }
    &.show-face-3 > .face-3 > .content {
        opacity: 1;
    }
    &.show-face-4 > .face-4 > .content {
        opacity: 1;
    }
    &.show-face-5 > .face-5 > .content {
        opacity: 1;
    }
    &.show-face-6 > .face-6 > .content {
        opacity: 1;
    }
    &.show-face-7 > .face-7 > .content {
        opacity: 1;
    }
    &.show-face-8 > .face-8 > .content {
        opacity: 1;
    }
    &.show-face-9 > .face-9 > .content {
        opacity: 1;
    }

    &.show-face-0,
    &.show-face-6 {
        transform: rotateX(0deg);
    }
    &.show-face-1,
    &.show-face-7 {
        transform: rotateY(-90deg);
    }
    &.show-face-2,
    &.show-face-8 {
        transform: rotateX(180deg);
    }
    &.show-face-3,
    &.show-face-9 {
        transform: rotateY(90deg);
    }
    &.show-face-4 {
        transform: rotateX(-90deg);
    }
    &.show-face-5 {
        transform: rotateX(90deg);
    }
}
</style>
