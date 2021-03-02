const path = require('path')

module.exports = {
  /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
  ssr: false,

  /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
  target: 'static',

  /*
    ** Disable Nuxt telemetry
    ** See https://github.com/nuxt/telemetry
    */
  telemetry: false,

  /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.15.2/css/all.css',
        integrity: 'sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu',
        crossorigin: 'anonymous'
      }
    ]
  },

  srcDir: path.join(__dirname, 'web'),

  buildDir: path.join(__dirname, '.nuxt'),

  /*
    ** Global CSS
    */
  css: [],

  /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
  plugins: [
    '~/plugins/translations.ts',
  ],

  /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
  components: true,

  /*
    ** Nuxt.js dev-modules
    */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://typed-vuex.roe.dev/getting-started-nuxt
    'nuxt-typed-vuex',
  ],

  tailwindcss: {
    cssPath: path.join(__dirname, 'web/assets/stylus/index.styl'),
  },

  styleResources: {
    stylus: [
      path.join(__dirname, 'web/assets/stylus/vars/*.styl'),
      path.join(__dirname, 'web/assets/stylus/abstract/mixins.styl'),
    ],
  },

  /*
    ** Nuxt.js modules
    */
  modules: [
    '@nuxtjs/axios',
  ],

  /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
  build: { },
}
