import { GetterTree, ActionTree } from 'vuex'
import {getGtonPrice} from "~/utils/price"

interface State {
  price: string
}

export const state = () => {
  return {
      price: "0"
  }
}

export const actions: ActionTree<State, any> = {
  async uploadGtonPrice({ commit }) {
    const price = await getGtonPrice()
    commit('setPrice', {
        price,
    })
  },
}

export const mutations = {
  setPrice(state: State, {price}: {price: string}) {
    state.price = price
  },
}

export const getters: GetterTree<State, any> = {
  gtonPrice: (state: State) => {
    return state.price
  },
}