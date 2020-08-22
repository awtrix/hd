<template>
<main>
<img class="image" v-bind:src="this.currentImage">
<div class="fade">  </div>
    <section class="news">
      <div :class="{'crawl': becameVisible}">
        <ul>
          <li v-for="article in news.articles" :key="article.author">
              {{currentImage=article.urlToImage}}
            <div class="title">
              <h2>{{article.title}}</h2>
               </div>
              <br>
              <h4>{{article.author}}</h4>
              <br>

            <p>{{article.content}}</p>
            <br>
            <br>
          </li>
        </ul>
      </div>
    </section>
   </main>
</template>

<script lang="ts">
import Scaffolding from "./Scaffolding.vue";
export default Scaffolding.extend({
  data() {
    return {
      url_base: "https://newsapi.org/v2/top-headlines?",
      Country: "de",
      APIkey: "39a3df4f7bb640ba8ae0c974ee5cd25c",
      maxNews: 2,
      news: {},
      start: true,
      currentImage: "",
    };
  },

  mounted() {
    this.fetchNews();
    window.setTimeout(this.fetchNews, 5 * 60000);

  },

  methods: {
    fetchNews() {
      fetch(
        `${this.url_base}country=${this.Country}&pageSize=${this.maxNews}&apiKey=${this.APIkey}`
      )
        .then((response) => response.json())
        .then((data) => (this.news = data));
    },


  },
});
</script>

<style lang="stylus">

.image {
  float: left;
  margin-left: 0px 0px 0px 30px;
  width: 35%;
  height: 100%;
  z-index: -0;
}

.fade {
  position: relative;
  width: 100%;
  min-height: 110%;
  top: -25px;

  z-index: 1;
}

.news {
  background-color: white;
  display: flex;
  justify-content: center;
  position: relative;
  height: 480px;
  color: white;
  font-size: 200%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
  padding-left: 750px;
}

.crawl {
  position: relative;
  top: 99999px;
  transform-origin: 50% 100%;
  animation: crawl 120s linear;
}

.crawl > .title {
  font-size: 90%;
  text-align: center;
}

.crawl > .title h1 {
  margin: 0 0 100px;
  text-transform: uppercase;
}

@keyframes crawl {
  0% {
    top: -100px;
  }

  100% {
    top: -6000px;
  }
}
</style>
