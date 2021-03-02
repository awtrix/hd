import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import io, { Socket } from 'socket.io-client'
import { LifecycleApplication } from '@/types/Application'

export const state = () => ({
  locale: 'en',
  translations: {
    de: {},
    en: {},
  },
  socket: undefined as typeof Socket | undefined,
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setSocket (state, socket: typeof Socket) {
    state.socket = socket
  },
})

export const actions = actionTree({ state, mutations }, {
  initializeSocket ({ commit }) {
    const socket = io(`http://${location.hostname}:3001`)

    socket.on('reload', () => { window.location.reload() })

    socket.on('applications', (apps: LifecycleApplication[]) => {
      this.app.$accessor.apps.setApps(apps)
    })

    socket.on('activeApplicationID', (id: string) => {
      this.app.$accessor.apps.setActiveApplication(id)
    })

    commit('setSocket', socket)
  }
})

export const accessorType = getAccessorType({
  state,
  mutations,
  actions,
})
