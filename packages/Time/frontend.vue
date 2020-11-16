<template>
  <div class="back">
    <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
    </div>
  </div>
</template>

<script>
import { createFrontend } from "@awtrix/common";

export default createFrontend({
  data() {
    return {
      time: "",
      date: "",
    };
  },

  mounted() {
    this.getTime()
    setInterval(() => this.getTime(), 1000)
  },

  methods: {
    getTime() {
      var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
});
</script>

<style>
.back {
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 100%);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}
p {
  margin: 0;
  padding: 0;
}
#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 50px rgba(10, 175, 230, 1), 0 0 50px rgba(10, 175, 230, 0);
}

.time {
  font-family: "Share Tech Mono", monospace;
  letter-spacing: 0.05em;
  font-size: 180px;
  padding: 5px 0;
}

.date {
  letter-spacing: 0.1em;
  font-size: 60px;
}
</style>