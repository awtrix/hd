import { createStore } from 'vuex'
import { useAccessor } from 'typed-vuex'
import * as apps from './apps'
import * as config from './config'

const modules = {
  apps, config
}

const store = createStore({ modules })
export const accessor = useAccessor(store, { modules })

export default store
