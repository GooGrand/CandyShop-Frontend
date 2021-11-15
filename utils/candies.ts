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
): Promise<TokenAmount[]> {
  const web3 = createWeb3Instance(rpc_url)
  const contract = new web3.eth.Contract(CanAbi as AbiItem[], can_address)
  const { providedAmount, aggregatedReward } = await contract.methods
    .usersInfo(userAddress)
    .call()
  return [new TokenAmount(providedAmount, 18), new TokenAmount(aggregatedReward, 18)]
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
