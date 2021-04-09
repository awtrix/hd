import { createStore, StoreOptions } from 'vuex'
import { useAccessor } from 'typed-vuex'
import * as apps from './apps'
import * as config from './config'

const storePattern: StoreOptions<any> = {
  modules: {
    apps,
    config,
  },
}

const store = createStore(storePattern)
export const accessor = useAccessor(store, storePattern)

export default store
