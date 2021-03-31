import { accessor } from './store'
import { translate, hasTranslation } from './translations'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessor,
    $t: typeof translate,
    $ht: typeof hasTranslation,
  }
}
