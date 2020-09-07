<template>
  <div class="space">
    <div class="stars">
      <div class="twinkling">
        <div
          class="rocket"
          @click.prevent="playSound('https://www.nasa.gov/mp3/590318main_ringtone_135_launch.mp3')"
        >
          <div class="rocket-body">
            <div class="body"></div>
            <div class="fin fin-left"></div>
            <div class="fin fin-right"></div>
            <div class="window"></div>
          </div>
          <div class="exhaust-flame"></div>
          <ul class="exhaust-fumes">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul class="star">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="content">
          <div class="people">{{people}}</div>
          <div class="PiS">People in Space</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scaffolding from "../Scaffolding.vue";
export default Scaffolding.extend({
  data() {
    return {
      people: 0,
    };
  },

  mounted() {
    window.setTimeout(this.downloadData, 20 * 1000);
    this.downloadData();
  },

  methods: {
    downloadData() {
      fetch(
        "https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json",
        { mode: "cors" }
      )
        .then((response) => response.json())
        .then((data) => (this.people = data.number));
    },
    playSound(sound: string) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
  },
});
</script>

<style lang="stylus">
.content {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}

.people {
  margin-top: 70px;
  margin-left: 200px;
  font-size: 200px;
}

.PiS {
  margin-top: 70px;
  margin-left: 100px;
  font-size: 100px;
}

.space {
  moz-user-select: none;
  webkit-user-select: none;
  ms-user-select: none;
  user-select: none;
  o-user-select: none;
  unselectable = 'on';
  onselectstart = 'return false;';
  onmousedown = 'return false;';
  background: linear-gradient(to bottom, #0e2f44 0%, #406078 70%, #6897bb 100%);
  overflow: hidden;
}

.rocket {
  position: absolute;
  top: 20%;
  width: 80px;
  left: calc(200px);

  .rocket-body {
    width: 80px;
    left: calc(50% - 50px);
    animation: bounce 0.5s infinite;

    .body {
      background-color: #dadada;
      height: 180px;
      left: calc(50% - 50px);
      border-top-right-radius: 100%;
      border-top-left-radius: 100%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      border-top: 5px solid #f5f5f5;
    }

    &:before {
      content: '';
      position: absolute;
      left: calc(50% - 24px);
      width: 48px;
      height: 13px;
      background-color: #554842;
      bottom: -13px;
      border-bottom-right-radius: 60%;
      border-bottom-left-radius: 60%;
    }
  }

  .window {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: #a75248;
    left: calc(50% - 25px);
    top: 40px;
    border: 5px solid #b4b2b2;
  }

  .fin {
    position: absolute;
    z-index: -100;
    height: 55px;
    width: 50px;
    background-color: #a75248;
  }

  .fin-left {
    left: -30px;
    top: calc(100% - 55px);
    border-top-left-radius: 80%;
    border-bottom-left-radius: 20%;
  }

  .fin-right {
    right: -30px;
    top: calc(100% - 55px);
    border-top-right-radius: 80%;
    border-bottom-right-radius: 20%;
  }

  .exhaust-flame {
    position: absolute;
    top: 90%;
    width: 28px;
    background: linear-gradient(to bottom, transparent 10%, #f5f5f5 100%);
    height: 150px;
    left: calc(50% - 14px);
    animation: exhaust 0.2s infinite;
  }

  .exhaust-fumes li {
    width: 60px;
    height: 60px;
    background-color: #f5f5f5;
    list-style: none;
    position: absolute;
    border-radius: 100%;

    &:first-child {
      width: 200px;
      height: 200px;
      bottom: -300px;
      animation: fumes 5s infinite;
    }

    &:nth-child(2) {
      width: 150px;
      height: 150px;
      left: -120px;
      top: 260px;
      animation: fumes 3.2s infinite;
    }

    &:nth-child(3) {
      width: 120px;
      height: 120px;
      left: -40px;
      top: 330px;
      animation: fumes 3s 1s infinite;
    }

    &:nth-child(4) {
      width: 100px;
      height: 100px;
      left: -170px;
      animation: fumes 4s 2s infinite;
      top: 380px;
    }

    &:nth-child(5) {
      width: 130px;
      height: 130px;
      left: -120px;
      top: 350px;
      animation: fumes 5s infinite;
    }

    &:nth-child(6) {
      width: 200px;
      height: 200px;
      left: -60px;
      top: 280px;
      animation: fumes2 10s infinite;
    }

    &:nth-child(7) {
      width: 100px;
      height: 100px;
      left: -100px;
      top: 320px;
    }

    &:nth-child(8) {
      width: 110px;
      height: 110px;
      left: 70px;
      top: 340px;
    }

    &:nth-child(9) {
      width: 90px;
      height: 90px;
      left: 200px;
      top: 380px;
      animation: fumes 20s infinite;
    }
  }
}

@keyframes fumes {
  50% {
    transform: scale(1.5);
    background-color: transparent;
  }

  51% {
    transform: scale(0.8);
  }

  100% {
    background-color: white;
    transform: scale(1);
  }
}

@keyframes bounce {
  0% {
    transform: translate3d(0px, 0px, 0);
  }

  50% {
    transform: translate3d(0px, -4px, 0);
  }

  100% {
    transform: translate3d(0px, 0px, 0);
  }
}

@keyframes exhaust {
  0% {
    background: linear-gradient(to bottom, transparent 10%, white 100%);
  }

  50% {
    background: linear-gradient(to bottom, transparent 8%, white 100%);
  }

  75% {
    background: linear-gradient(to bottom, transparent 12%, white 100%);
  }
}

@keyframes fumes2 {
  50% {
    transform: scale(1.1);
  }
}

.stars, .twinkling {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.stars {
  background: #000 url('http://www.script-tutorials.com/demos/360/images/stars.png') repeat top center; // www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
  z-index: 0;
}

.twinkling {
  background: transparent url('http://www.script-tutorials.com/demos/360/images/twinkling.png') repeat top center; // www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
  z-index: 1;
  -moz-animation: move-twink-back 200s linear infinite;
  -ms-animation: move-twink-back 200s linear infinite;
  -o-animation: move-twink-back 200s linear infinite;
  -webkit-animation: move-twink-back 200s linear infinite;
  animation: move-twink-back 200s linear infinite;
}

@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }

  to {
    background-position: -10000px 5000px;
  }
}

@keyframes twinkle {
  80% {
    transform: scale(1.1);
    opacity: 0.7;
  }
}
</style>
