<template>
  <div class="app">

    <div class="flex mb-4">
      <div class="w-1/4" v-bind:style="{ 'background-color': getCoinColor()}">
        <div class="icon">
          <img :src="getCoinIcon()" alt="Coin" width="400px" height="400px" />
        </div>
      </div>
      <div class="w-3/4 bg-gray-500 items-center" v-if="coindata">
    <div class="min-w-screen min-h-screen bg-gray-200 flex  justify-center">
    <div class="w-full max-w-6xl">
        <div class="-mx-2 md:flex">
            <div class="w-full md:w-1/3 px-2">
                <div class="rounded-lg shadow-sm mb-4">
                    <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                        <div class="px-3 pt-8 pb-10 text-center relative z-10">
                            <h4 class="text-sm uppercase text-gray-500 leading-tight">Price</h4>
                            <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">{{NumberFormat(coindata.price)}}</h3>
                          <div v-if="itemContains(coindata.delta_24h,'-')">
                              <p class="text-xs text-red-500 leading-tight">▼ {{NumberPercentage(coindata.delta_24h)}} %</p>
                            </div>
                            <div v-else>
                              <p class="text-xs text-green-500 leading-tight">▲ {{NumberPercentage(coindata.delta_24h)}} %</p>
                            </div>
                        </div>
                        <div class="absolute bottom-0 inset-x-0">
                            <canvas id="chart1" height="70"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
                <div class="rounded-lg shadow-sm mb-4">
                    <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                        <div class="px-3 pt-8 pb-10 text-center relative z-10">
                            <h4 class="text-sm uppercase text-gray-500 leading-tight">Volume</h4>
                            <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">{{NumberFormat(coindata.total_volume_24h)}}</h3>
                            <p class="text-xs text-red-500 leading-tight">{{NumberPercentage(coindata.delta_24h)}} %</p>
                        </div>
                        <div class="absolute bottom-0 inset-x-0">
                            <canvas id="chart2" height="70"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
                <div class="rounded-lg shadow-sm mb-4">
                    <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                        <div class="px-3 pt-8 pb-10 text-center relative z-10">
                            <h4 class="text-sm uppercase text-gray-500 leading-tight">Market Cap</h4>
                            <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">{{NumberFormat(coindata.market_cap)}}</h3>
                            <p class="text-xs text-green-500 leading-tight">{{NumberPercentage(coindata.delta_24h)}} %</p>
                        </div>
                        <div class="absolute bottom-0 inset-x-0">
                            <canvas id="chart3" height="70"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Scaffolding from "../Scaffolding.vue";
import { blue, green, grey, rgb } from "chalk";
export default Scaffolding.extend({
  data() {
    return {
      symbol: "XRP",
      currency: "eur",
      apiKey: "4e42754906245440",
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
        `https://coinlib.io/api/v1/coin?key=4e42754906245440&pref=${this.currency}&symbol=${this.symbol}`
      )
        .then((response) => response.json())
        .then((data) => (this.coindata=data))
    },
    itemContains(s: any,n: any) {
      return s.includes(n)
    },
    getCoinIcon() {
      return `https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/${this.symbol.toLowerCase()}.svg`;
    },
    NumberFormat(num: number): string {
      if (num<1) {
        return new Intl.NumberFormat('de-DE', {maximumSignificantDigits: 4, style: 'currency', currency: this.currency }).format(num)
      }else{
        return new Intl.NumberFormat('de-DE', {style: 'currency', currency: this.currency }).format(num)
      }
    },
    NumberPercentage(num: number): string {
      return new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 4 }).format(num)
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

<style lang="stylus" scoped>
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
.content{
  padding-left: 50px;
  color: black;
  font-size: 50px;
}
.content .base
{
  font-size: 80px;
}
</style>
