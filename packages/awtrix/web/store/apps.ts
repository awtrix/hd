import { getAccessorType, mutationTree, getterTree } from 'typed-vuex'
import { LifecycleApplication } from '@/types/Application'

export const state = () => ({
  applications: [] as LifecycleApplication[],
  activeApplicationID: null as string | null,
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  setApps (state: RootState, apps: any) {
    state.applications = apps
  },

  setActiveApplication (state: RootState, application: string | null) {
    state.activeApplicationID = application
  },

  setUserConfig (state: RootState, { id, config }) {
    const apps = state.applications
    const index = state.applications.findIndex(app => app.id == id)

    const app = apps[index]
    app.userConfig = config

    apps.splice(index, 1, app)
  },
})

export const getters = getterTree(state, {
  activeApplication (state: RootState): LifecycleApplication | undefined {
    return state.applications.find((app) => app.id == state.activeApplicationID)
  }
})

export const accessorType = getAccessorType({
  state,
  mutations,
  getters,
})
