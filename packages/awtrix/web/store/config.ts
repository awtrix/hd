import { getAccessorType, mutationTree, getterTree } from 'typed-vuex'

export const state = () => ({
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
})

export const accessorType = getAccessorType({
  state,
  mutations,
})
