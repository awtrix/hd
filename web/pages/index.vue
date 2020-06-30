<template>
  <div class="container">
    <div>
      <h1 class="title">
        awtrix
      </h1>
      <div class="links">
        <input type="text" v-model="messageText" />
        <button @click="submit">Write</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      messageText: '',
    }
  },

  methods: {
    submit () {
      // @ts-ignore
      this.$axios.get('/api/write', { params: { text: this.messageText } })
      this.messageText = ''
    },
  },
})
</script>
