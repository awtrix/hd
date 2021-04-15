import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import { Socket } from 'socket.io-client'
import { Types } from '@awtrix/common'
import { accessor } from '.'

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
  initializeSocket ({ commit }): void {
    const socket = io(`http://${location.hostname}:3002`)

    socket.on('reload', () => { window.location.reload() })

    socket.on('applications', (apps: Types.Application.LifecycleApplication[]) => {
      accessor.apps.setApps(apps)
    })

    socket.on('activeApplicationID', (id: string) => {
      accessor.apps.setActiveApplication(id)
    })

    commit('setSocket', socket)
  }
})

export const accessorType = getAccessorType({
  state,
  mutations,
  actions,
})
