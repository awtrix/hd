import * as Vue from 'vue'
import Store, { accessor } from './store'
import App from './App.vue'
import TranslationsPlugin from './translations'
import * as Common from '@awtrix/common'
import './assets/stylus/index.styl'

const app = Vue.createApp(App)

app.use(TranslationsPlugin)
app.use(Store)

app.config.globalProperties.$accessor = accessor

app.mount('#app')

// We want to rely on the global Vue instance when injecting custom apps.
// Therefore we need to make Vue available in a global context.
// @ts-ignore
window.Vue = Vue
// @ts-ignore
window.AwtrixCommon = Common
