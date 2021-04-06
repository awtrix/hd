import { LifecycleApplication } from '@awtrix/common/dist/types/app'
import { App } from '@vue/runtime-core'
import { accessor } from './store'

export const translate = (key: string, application: LifecycleApplication | undefined): string => {
  const locale = accessor.config.locale
  // @ts-ignore
  const list = application ? application.config.translations[locale] : accessor.config.translations[locale]

  if (!list) return key
  return (list[key] || key) as string
}

export const hasTranslation = (key: string, application: LifecycleApplication | undefined): boolean => {
  return key != translate(key, application)
}

export default {
  install: (app: App<Element>, options: any) => {
    app.config.globalProperties.$t = translate
    app.config.globalProperties.$ht = hasTranslation
  }
}
