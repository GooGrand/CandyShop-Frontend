import _ from 'lodash'
import { Commit, GetterTree, ActionTree } from 'vuex'
import { Chains } from '~/utils/metamask'
import { Can, getCanBalance } from '~/utils/candies'
import { TokenAmount } from '~/utils/safe-math'
import Big from 'big.js'

export enum WalletProvider {
  Metamask,
}

type State = {
  [key in WalletProvider]: WalletBody
}

export interface UserCanData {
  paid: TokenAmount
  earned: TokenAmount
  token: Can
}

export interface WalletBody {
  provider: WalletProvider | null
  isConnected: boolean
  checked: boolean
  totalEarned: string
  wallet: Wallet
  activeCans: UserCanData[]
  address: string
}

export interface Wallet {
  label: string
  id: Chains
}

export function isWalletEqual(walletA: WalletBody, walletB: WalletBody) {
  const props = ['address', 'provider', 'wallet.label']

  for (const prop of props) {
    const [valueA, valueB] = [_.get(walletA, prop), _.get(walletB, prop)]

    if (valueA !== valueB) {
      console.log({ valueA, valueB })
      return false
    }
  }

  return true
}

export const buildWallet = (provider = null): WalletBody => {
  return {
    provider,
    checked: false,
    isConnected: false,
    address: '',
    totalEarned: "0",
    activeCans: [],
    wallet: {
      label: '',
      id: Chains.Eth,
    },
  }
}

export const state = () => {
  return {
    [WalletProvider.Metamask]: buildWallet(),
  }
}

export const actions: ActionTree<State, any> = {
  async updateCanData({ commit, rootState, state }, { provider }: { provider: WalletProvider }) {
    /**
     * Copy array in case of state changes
     */
    const available = [...rootState.cans.cans]
    const cans = [];
    let totalEarned = Big(0)
    for (const token of available) {
      const [paid, earned] = await getCanBalance(token, state[WalletProvider.Metamask].address)
      /**
       * It is beter to save the whole Can in case of array shuffle.
       * Accessing the property by index is faster, but unsecure
       */
      cans.push({ earned, paid, token })
      totalEarned = earned.toWei().add(totalEarned)
    }
    commit('updateWalletData', {provider, body:{totalEarned: new TokenAmount(totalEarned, 18).fixed(4), activeCans: cans}})
  },
  disconnectWallet(
    { commit }: { commit: Commit },
    { provider }: { provider: WalletProvider }
  ) {
    const metamask = buildWallet()

    commit('updateWalletData', {
      provider,
      body: metamask,
    })
  },
}

export const mutations = {
  updateWalletData(
    state: State,
    { provider, body }: { provider: WalletProvider; body: WalletBody }
  ) {
    state[provider].checked = false

    state[provider] = {
      ...state[provider],
      ...body,
    }
  },
}

export const getters: GetterTree<State, any> = {
  currentWallet: (state: State) => {
    // we look through available wallets and take the first one that is logged
    for (const wallet of Object.keys(state)) {
      //@ts-ignore
      if (state[wallet] && state[wallet].checked) {
        //@ts-ignore
        return state[wallet]
      }
    }
    return null
  },
  userCandies: (state: State) => {
    for (const wallet of Object.keys(state)) {
      //@ts-ignore
      if (state[wallet] && state[wallet].checked) {
        //@ts-ignore
        return state[wallet].activeCans
      }
      return []
    }
  },
  isWalletAvailable: (_, getters) => Boolean(getters.currentWallet),
}
