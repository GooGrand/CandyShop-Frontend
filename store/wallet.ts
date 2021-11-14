import _ from 'lodash'
import { Commit, GetterTree, ActionTree } from "vuex";
import { Chains } from '~/utils/metamask';

export enum WalletProvider {
  Metamask,
}

type State = {
  [key in WalletProvider]: WalletBody
}

export interface WalletBody {
  provider: WalletProvider | null
  isConnected: boolean
  checked: boolean
  wallet: Wallet,
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
    address: "",
    wallet: {
      label: "",
      id: Chains.Eth
    }
  }
}

export const state = () => {
  return {
    [WalletProvider.Metamask]: buildWallet(),
  }
}

export const actions: ActionTree<State, any> = {
  // updateCanData({ commit }) {
  // },
  disconnectWallet({ commit }: {commit: Commit}, { provider }: {provider: WalletProvider}) {
    const metamask = buildWallet()

    commit('updateWalletData', {
      provider,
      body: metamask,
    })
  },
}

export const mutations = {
  updateWalletData(state: State, { provider, body }: {provider: WalletProvider, body: WalletBody}) {
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
  isWalletAvailable: (_, getters) => Boolean(getters.currentWallet),
}
