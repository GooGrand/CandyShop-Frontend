import { Chains } from './metamask'
import { TokenAmount } from './safe-math'
import { AbiItem } from 'web3-utils'
import { createWeb3Instance } from '~/plugins/web3'
import CanAbi from '~/abis/Can.json'

interface ChainMeta {
  chain_icon: string
  chain_id: 250
  chain_name: string
  img: string
  search: string
  small_img: string
  tvl_img: string
}
interface PoolMeta {
  token_pair_name: string
  candy_picture: string
  token_img: string
  native: boolean
}
export type Can = {
  apy: string
  can_address: string
  candyshop_address: string
  chain_meta: ChainMeta
  pool_meta: PoolMeta
  chain_name: string
  chain_type: string
  dex_name: string
  explorer_url: string
  pool_id: number
  farm_address: string
  farm_id: number
  farm_index: number
  farm_tvl: number
  lp_price: number
  lp_total_supply: string
  pool_address: string
  relict_gton_address: string
  reserve_a: string
  reserve_b: string
  rpc_url: string
  token_a_address: string
  token_b_address: string
  total_locked: string
  tvl: number
  wormhole_address: string
}

const baseUrl = 'https://cache.api.graviton.one/'

export const chainQuery: { [key in Chains]?: string } = {
  [Chains.Eth]: '0',
  [Chains.Ftm]: '3',
  [Chains.Pol]: '5',
  [Chains.Bsc]: '6',
}

export const defaultCan: Can = {
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

export const defaultRedeem = {
  paid: "0.000",
  earned: "0.000",
  token: defaultCan
}

export async function getCans(
  options?: Record<string, string>
): Promise<Can[]> {
  let url = baseUrl + 'apiv2/candy'
  if (options) {
    url += '?'
    for (const item of Object.keys(options)) {
      url += item + '=' + options[item] + '&'
    }
  }
  const res = await fetch(url)
  const body = await res.json()
  return body
}

export async function getCanBalance(
  { rpc_url, can_address }: Can,
  userAddress: string
): Promise<string[]> {
  const web3 = createWeb3Instance(rpc_url)
  const contract = new web3.eth.Contract(CanAbi as AbiItem[], can_address)
  const { providedAmount, aggregatedReward } = await contract.methods
    .usersInfo(userAddress)
    .call()
  return [new TokenAmount(providedAmount, 18).fixed(4), new TokenAmount(aggregatedReward, 18).fixed(4)]
}

/**
 *
 * @param tokenAmountIn token amount to be inserted in pool
 * @param totalSupply total lp token supply
 * @param tokenReserve reserve if the inserted token in pool
 * @returns amount lp token to be mint
 */
export function amountLpOut(
  tokenAmountIn: TokenAmount,
  totalSupply: TokenAmount,
  tokenReserve: TokenAmount
): TokenAmount {
  const res = tokenAmountIn.wei.mul(totalSupply.wei).div(tokenReserve.wei)
  return new TokenAmount(res, 18)
}
