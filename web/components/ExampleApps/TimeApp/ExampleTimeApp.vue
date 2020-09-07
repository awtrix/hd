<template>
  <div class="app">
    <Cube :face="time[0]"></Cube>
    <Cube :face="time[1]"></Cube>
    <Cube :face="time[2]"></Cube>
    <Cube :face="time[3]"></Cube>
    <Cube :face="time[4]"></Cube>
    <Cube :face="time[5]"></Cube>
  </div>
</template>

<script lang="ts">
import Scaffolding from '../../Scaffolding.vue'
import Cube from './Cube.vue'
import moment from 'moment'

export default Scaffolding.extend({
  components: { Cube },

  data () {
    return {
      time: moment().format('HHmmss'),
    }
  },

  mounted() {
    setInterval(() => this.getTime(), 1000)
  },

  methods: {
    getTime() {
      this.time = moment().format('HHmmss')
    }
  }
})
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: helvetica;
}
</style>
