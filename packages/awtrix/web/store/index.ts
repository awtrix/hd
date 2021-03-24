import { getAccessorType } from 'typed-vuex'
import * as apps from './apps'
import * as config from './config'

export const accessorType = getAccessorType({
  modules: {
    apps,
    config,
  },
})
