<template>
  <main>
    <div class="weather-wrap">
      <div class="weather-box">
        <div class="temp">{{ Math.round(weather.temp) }}°C</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Scaffolding from "../Scaffolding.vue";

export default Scaffolding.extend({

  data() {
    return {
      api_key: "182b5867d684a4edc6e50c928a202666",
      url_base: "https://api.openweathermap.org/data/2.5/",
      locationID: "2874230",
      weather: {},
    };
  },

  mounted() {
    this.fetchWeather();
    window.setTimeout(this.fetchWeather, 5 * 60000);
  },

  methods: {
    fetchWeather() {
      fetch(
        `${this.url_base}weather?id=${this.locationID}&units=metric&appid=${this.api_key}`
      )
        .then((response) => response.json())
        .then((data) => (this.weather = data));
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
  },
});
</script>

<style>
body {
  font-family: 'montserrat', sans-serif;
}

.app {
  background-color: white;
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 20px 0px 0px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

</style>
