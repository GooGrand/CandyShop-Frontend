import _ from 'lodash'
import { Commit, GetterTree, ActionTree } from 'vuex'
import BigInt from "big.js";
import { Can, getCans, defaultCan, defaultRedeem } from '~/utils/candies'
import { UserCanData } from '~/store/wallet'

interface State {
  processingCan: Can
  cans: Can[]
  redeemProcessingCan: UserCanData
}
// edited via phone, will be prettied

function caclTokenPrice(tokenRes: BigInt, gtonRes: BigInt, gtonPrice: number) {
  return tokenRes.div(gtonRes).mul(gtonPrice).toFixed(2);
}

function getReserves(can: Can): BigInt[] {
  if(can.gton_address === can.token_a_address) {
    return [BigInt(can.reserve_a), BigInt(can.reserve_b)]
  } else {
    return [BigInt(can.reserve_b), BigInt(can.reserve_a)]
  }
}

export const state = () => {
  return {
    processingCan: defaultCan,
    redeemProcessingCan: defaultRedeem,
    cans: []
  }
}

export const actions: ActionTree<State, any> = {
  async uploadCans({ commit, rootState }) {
    const candies = await getCans()
    const price = rootState.price.gtonPrice
    for (const can of candies) {
    const [resGton, resToken] = getReserves(can)
      can.secondTokenPrice = caclTokenPrice(
        resToken, resGton, price
      )
    }
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