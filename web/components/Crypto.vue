<template>
  <div class="app">
    <div class="content"></div>
    <div class="flex mb-4">
      <div class="w-1/4 bg-orange-400">
        <div class="icon">
          <img :src="getCoinIcon()" alt="Coin" width="400px" height="400px" />
        </div>
      </div>
      <div class="w-3/4 bg-gray-500">
        <div class="flex flex-wrap">
          <div class="w-full bg-gray-500">{{coindata.ticker.base}}</div>

          <div class="w-1/2 bg-gray-400">Price</div>
          <div class="w-1/2 bg-gray-500">{{coindata.ticker.price}}</div>
          <div class="w-1/2 bg-gray-400">Volume</div>
          <div class="w-1/2 bg-gray-500">{{coindata.ticker.volume}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scaffolding from "./Scaffolding.vue";
import { blue, green, grey, rgb } from "chalk";
export default Scaffolding.extend({
  data() {
    return {
      symbol: "xrp",
      currency: "eur",
      coindata: {},
      volume: 0,
      price: 0,
    };
  },

  mounted() {
    window.setTimeout(this.downloadData, 20 * 1000);
    this.downloadData();
  },

  methods: {
    downloadData() {
      fetch(
        `https://api.cryptonator.com/api/ticker/${this.symbol}-${this.currency}`
      )
        .then((response) => response.json())
        .then((data) => (this.coindata = data));
    },
    getCoinIcon() {
      return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/${this.symbol.toLowerCase()}.svg`;
    },
    getCoinColor() {
      switch (this.symbol.toUpperCase()) {
        case "ETH":
        case "XRP":
        case "ADA":
        case "XLM":
        case "XEM":
        case "LSK":
        case "DASH":
          return rgb(0, 0, 255);
        case "BCH":
        case "USDT":
        case "NEO":
          return rgb(0, 255, 0);
        case "BTC":
        case "XMR":
          return rgb(255, 125, 0);
        case "TRX":
        case "EOS":
        case "LTC":
        default:
          return rgb(125, 125, 125);
      }
    },
  },
});
</script>

<style lang="stylus">
.app {
  animation: fade-in-up 1s ease-in-out;
  font-size: 50px;
  background-color: white;
}

.icon {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 480px;
  height: 480px;
  position: relative;
  top: 40px;
  left: 40px;
}

.content {
  color: black;
}
</style>
