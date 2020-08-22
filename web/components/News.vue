<template>
  <main>
    <div class="fade"></div>
    <ul>
      <li v-for="article in news.articles" :key="article.title">
        <section>
          <div :class="{'crawl': becameVisible}">

            <img class="image" v-bind:src="article.urlToImage" />
            <div class="news">
              <h1 class="title">{{article.title}}</h1>
              <br />
              <p class="content">{{article.content}}</p>
              <br />
              <br />
              <br />
            </div>
          </div>
        </section>
      </li>
    </ul>
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
      maxNews: 25,
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
  margin: 0px 30px 30px 30px;
  width: 35%;
  height: 100%;
  z-index: 0;
  object-fit: cover;

}

.title {
  color: blue;
}

.fade {
  position: relative;
  width: 100%;
  color: white;
  min-height: 110%;
  top: -25px;
  z-index: 1;
}

.news {
  background-color: black;
  height: 480px;
  color: white;
  font-size: 200%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  padding-left: 50px;
}

.crawl {
  position: relative;
  top: 99999px;
  transform-origin: 50% 100%;
  animation: crawl 100s linear;
}

@keyframes crawl {
  0% {
    top: -100px;
  }

  100% {
    top: -9999px;
  }
}
</style>
