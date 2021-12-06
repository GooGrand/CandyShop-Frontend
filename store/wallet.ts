import _ from 'lodash'
import { Commit, GetterTree, ActionTree } from 'vuex'
import BigInt from "big.js"
import {createWeb3Instance} from "~/plugins/web3"
import { Chains, Invoker } from '~/utils/metamask'
import { Can, getCanBalance } from '~/utils/candies'
import { TokenAmount } from '~/utils/safe-math'

export enum WalletProvider {
  Metamask,
}

export interface UserCanData {
  paid: string
  earned: string
  token: Can
}

export interface Wallet {
  label: string
  id: Chains
}

export interface WalletBody {
  provider: WalletProvider | null
  isConnected: boolean
  checked: boolean
  totalEarned: string
  wallet: Wallet
  canTotalBalance: TokenAmount
  activeCans: UserCanData[]
  address: string
}


type State = {
  [key in WalletProvider]: WalletBody
}

export function isWalletEqual(walletA: WalletBody, walletB: WalletBody) {
  const props = ['address', 'provider', 'wallet.label']

  for (const prop of props) {
    const [valueA, valueB] = [_.get(walletA, prop), _.get(walletB, prop)]

    if (valueA !== valueB) {
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
    canTotalBalance: new TokenAmount(0),
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
    const invoker = new Invoker();
    /**
     * Copy array in case of state changes
     */
    const available = [...rootState.cans.cans]
    const gtonPrice = rootState.price.gtonPrice
    const cans = [];
    let totalEarned = 0
    for (const token of available) {
      const [paid, earned] = await getCanBalance(token, state[WalletProvider.Metamask].address)
      /**
       * It is beter to save the whole Can in case of array shuffle.
       * Accessing the property by index is faster, but unsecure
       */
      if (Number(paid) > 0) {
        cans.push({ earned, paid, token })
        const relictPrice = await invoker.getRelictPrice(createWeb3Instance(token.rpc_url), token.wormhole_address);
        const earnedDollars = new TokenAmount(earned, 18).toEther().mul(100/relictPrice * Number(gtonPrice))
        totalEarned += earnedDollars.toNumber()
      }
    }
    commit('updateWalletData', { provider, 
      body: { 
        canTotalBalance: totalEarned.toFixed(2), 
        activeCans: cans }
      }
    )
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
      // @ts-ignore
      if (state[wallet] && state[wallet].checked) {
        // @ts-ignore
        return state[wallet]
      }
    }
    return null
  },
  userCandies: (state: State) => {
    for (const wallet of Object.keys(state)) {
      // @ts-ignore
      if (state[wallet] && state[wallet].checked) {
        // @ts-ignore
        return state[wallet].activeCans
      }
    }
    return []
  },
  isWalletAvailable: (_, getters) => Boolean(getters.currentWallet),
}
