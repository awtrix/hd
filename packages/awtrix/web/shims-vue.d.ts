import { accessor } from './store'
import { translate, hasTranslation } from './translations'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $accessor: typeof accessor,
    $t: typeof translate,
    $ht: typeof hasTranslation,
  }
}
