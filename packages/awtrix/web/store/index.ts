import { getAccessorType } from 'typed-vuex'
import * as apps from '~/store/apps'
import * as config from '~/store/config'

export const accessorType = getAccessorType({
  modules: {
    apps,
    config,
  },
})
