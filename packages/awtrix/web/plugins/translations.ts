import { Plugin } from '@nuxt/types'
import { LifecycleApplication } from '@awtrix/common/dist/types/app'

const translationPlugin: Plugin = ({ app }, inject) => {
  const translate = (key: string, application: LifecycleApplication | undefined): string => {
    const locale = app.$accessor.config.locale
    // @ts-ignore
    const list = application ? application.config.translations[locale] : app.$accessor.config.translations[locale]

    if (!list) return key
    return (list[key] || key) as string
  }

  const hasTranslation = (key: string, application: LifecycleApplication | undefined): boolean => {
    return key != translate(key, application)
  }

  inject('t', translate)
  inject('ht', hasTranslation)
}

export default translationPlugin
