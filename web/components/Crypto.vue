<template>
  <div class="app">
    <div class="content"></div>
    <div class="flex mb-4">
      <div class="w-1/4" v-bind:style="{ 'background-color': getCoinColor()}">
        <div class="icon">
          <img :src="getCoinIcon()" alt="Coin" width="400px" height="400px" />
        </div>
      </div>
      <div class="w-3/4 bg-gray-500" v-if="coindata" >
        <div class="flex flex-wrap content">
          <div class="w-full bg-gray-500 base">{{coindata.ticker.base}}</div>
          <div class="w-1/2 bg-gray-400">Price</div>
          <div class="w-1/2 bg-gray-500">{{NumberFormat(coindata.ticker.price)}}</div>
          <div class="w-1/2 bg-gray-400">Volume</div>
          <div class="w-1/2 bg-gray-500">{{NumberFormat(coindata.ticker.volume)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scaffolding from "./Scaffolding.vue";
import { blue, green, grey, rgb } from "chalk";
import { parseTwoDigitYear } from 'moment';
export default Scaffolding.extend({
  data() {
    return {
      symbol: "XRP",
      currency: "eur",
      coindata: undefined,
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
        .then((data) => (this.coindata=data))
    },
    getCoinIcon() {
      return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/${this.symbol.toLowerCase()}.svg`;
    },
    NumberFormat(num: number): string {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: this.currency }).format(num)
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
          return 'rgba(0, 0, 255, 0.7';
        case "BCH":
        case "USDT":
        case "NEO":
          return 'green';
        case "BTC":
        case "XMR":
          return 'orange';
        case "TRX":
        case "EOS":
        case "LTC":
        default:
        return 'grey';
      }
    },
  },
});
</script>

<style lang="stylus">


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
  margin-left: 50px;
  color: black;
  font-size: 50px;

}

.content .base{
  font-size: 80px;
}
</style>
