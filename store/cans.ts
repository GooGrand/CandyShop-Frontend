import _ from 'lodash'
import { Commit, GetterTree, ActionTree } from 'vuex'
import { Can, getCans, defaultCan, defaultRedeem } from '~/utils/candies'
import { UserCanData } from '~/store/wallet'

interface State {
  processingCan: Can
  cans: Can[]
  redeemProcessingCan: UserCanData
}
// edited via phone, will be prettied

export const state = () => {
  return {
    processingCan: defaultCan,
    redeemProcessingCan: defaultRedeem,
    cans: []
  }
}

export const actions: ActionTree<State, any> = {
  async uploadCans({ commit }: { commit: Commit }) {
    const candies = await getCans()
    commit('setCandies', {
      candies,
    })
  },
}

export const mutations = {
  setCurrentCan(state: State, candy: Can) {
    state.processingCan = candy
  },
  setRedeemCan(state: State, data: UserCanData) {
    state.redeemProcessingCan = data
  },
  setCandies(state: State, { candies }: { candies: Can[] }) {
    state.cans = candies
  },
}

export const getters: GetterTree<State, any> = {
  currentCan: (state: State) => {
    return state.processingCan
  },
  redeemCan: (state: State) => {
    return state.redeemProcessingCan
  },
  getCandies: (state: State) => {
    return state.cans
  },
}