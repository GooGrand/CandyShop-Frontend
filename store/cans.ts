import _ from 'lodash'
import { Commit, GetterTree, ActionTree } from 'vuex'
import { Can, getCans } from '~/utils/candies'

interface State {
  processingCan: Can
  cans: Can[]
}
// edited via phone, will be prettied
const defaultCan: Can = {
  apy: '1',
  can_address: '0xc5b8E7e2F8C4cd227f082cc6a01Ecc562Ab43917',
  candyshop_address: '0x17e1cC157893F61a3f981F8f6D6E1940014699ED',
  chain_meta: {
    chain_icon: '/img/gton/table-images/chain/ftm.svg',
    chain_id: 250,
    chain_name: 'Fantom',
    img: '/img/relaySwap/chains/fantom.svg',
    search: 'ftmfantom',
    small_img: '/img/farm/farm-elem/ftm-chain.svg',
    tvl_img: '/img/farm/liquidity-chart/ftm.svg',
  },
  chain_name: 'FTM',
  chain_type: 'evm',
  dex_name: 'OGSwap',
  explorer_url: 'http://ftmscan.com/',
  farm_address: '0x71862B9EE94972a516774E0750fF765737aaB82C',
  farm_id: 14,
  farm_index: 6,
  farm_tvl: 0.0,
  lp_price: 3.634362134903878e-18,
  lp_total_supply: '825275711504949114',
  pool_address: '0x51d44F0D376d2a09863CBDd2726969577DDDd48d',
  pool_id: 24,
  pool_meta: {
    token_img: 'ftm',
    native: true,
    token_pair_name: 'FTM',
    candy_picture: 'usdt',
  },
  relict_gton_address: '0x8EEef37e192C36B55408A1fF68c26634743a9d01',
  reserve_a: '881054127734547057',
  reserve_b: '773028555863258728',
  rpc_url: 'https://rpcapi.fantom.network',
  token_a_address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
  token_b_address: '0xC1Be9a4D5D45BeeACAE296a7BD5fADBfc14602C4',
  total_locked: '0',
  tvl: 2.999350796749444,
  wormhole_address: '0x0bE8009fE45b0605395e8DAB96C311477a0BbDB4',
}

export const state = () => {
  return {
    processingCan: defaultCan,
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
  setCan(state: State, candy: Can) {
    state.processingCan = candy
  },
  setCandies(state: State, { candies }: { candies: Can[] }) {
    state.cans = candies
  },
}

export const getters: GetterTree<State, any> = {
  currentCan: (state: State) => {
    return state.processingCan
  },
  getCandies: (state: State) => {
    return state.cans
  },
}