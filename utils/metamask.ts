import { AbiItem } from 'web3-utils'
import Web3 from 'web3'

/**
 * ABI imports
 */
import ERC20 from '~/abis/ERC20.json'
import Can from '~/abis/Can.json'
import { TokenAmount } from './safe-math'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

interface NativeCurrency {
  name: string
  decimals: number
  symbol: string
}

export type MetamaskChain = {
  chainId: string | number | null
  chainIdHex: string | null
  chainName: string
  rpcUrls: Array<string>
  nativeCurrency: NativeCurrency
  img: string
  blockExplorerUrls: Array<string>
}

export enum Chains {
  Eth = '1', // eth
  Bsc = '56', // bsc
  Ftm = '250', // ftm
  Xdai = '100',
  Heco = '128',
  Avax = '43114',
  Pol = '137',
  Okex = '66',
}

export const availableChains: { [key in Chains]: MetamaskChain } = {
  [Chains.Eth]: {
    chainId: 1,
    chainIdHex: '0x1',
    chainName: 'Ethereum',
    rpcUrls: ['https://mainnet.infura.io/v3/ec6afadb1810471dbb600f24b86391d2'],
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    img: '/img/bridge/chains/ethereum.svg',
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [Chains.Okex]: {
    chainId: 66,
    chainIdHex: '0x1',
    chainName: 'OKExChain',
    rpcUrls: ['https://exchainrpc.okex.org'],
    nativeCurrency: { name: 'OKT', decimals: 18, symbol: 'OKT' },
    img: '~/assets/sprite/svg/tokens/okex.svg',
    blockExplorerUrls: ['https://www.oklink.com/okexchain'],
  },
  [Chains.Pol]: {
    chainId: 137,
    chainIdHex: '0x89',
    chainName: 'Polygon',
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    img: '/img/bridge/chains/ethereum.svg',
    blockExplorerUrls: ['https://explorer.matic.network/'],
  },
  [Chains.Bsc]: {
    chainId: 56,
    chainIdHex: '0x38',
    chainName: 'BSC',
    img: '/img/bridge/chains/binance.svg',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [Chains.Ftm]: {
    chainId: 250,
    chainIdHex: '0xFA',
    chainName: 'Fantom',
    img: '/img/bridge/chains/fantom.svg',
    rpcUrls: ['https://rpcapi.fantom.network'],
    nativeCurrency: { name: 'FTM', decimals: 18, symbol: 'FTM' },
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  [Chains.Xdai]: {
    chainName: 'xDAI Chain',
    chainId: 100,
    chainIdHex: '0x64',
    img: '',
    rpcUrls: ['https://dai.poa.network'],
    nativeCurrency: { name: 'xDAI', decimals: 18, symbol: 'XDAI' },
    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
  },
  [Chains.Heco]: {
    chainName: 'Heco',
    chainId: 128,
    chainIdHex: '0x80',
    img: '',
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    nativeCurrency: { name: 'HT', decimals: 18, symbol: 'HT' },
    blockExplorerUrls: ['https://hecoinfo.com'],
  },
  [Chains.Avax]: {
    chainName: 'Avalanche',
    chainId: 43114,
    chainIdHex: '0xA86A',
    img: '',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    blockExplorerUrls: ['https://cchain.explorer.avax.network'],
  },
}

const hexToChainMap: { [key: string]: Chains } = {
  '0x1': Chains.Eth,
  '0x89': Chains.Pol,
  '0x38': Chains.Bsc,
  '0xfa': Chains.Ftm,
  '0x64': Chains.Xdai,
  '0x80': Chains.Heco,
  '0xa86a': Chains.Avax,
}

export class Invoker {
  async switchMetamaskNetwork(chain: MetamaskChain) {
    let { chainIdHex, chainName, rpcUrls, nativeCurrency, blockExplorerUrls } =
      chain
    if (chainIdHex == availableChains[Chains.Eth].chainIdHex) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: chainIdHex,
          },
        ],
      })
      return
    }

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chainIdHex,
          chainName,
          rpcUrls,
          nativeCurrency,
          blockExplorerUrls,
        },
      ],
    })
  }
  async getNetworkVersion(): Promise<Chains> {
    let res = await window.ethereum.request({ method: 'eth_chainId' })
    return hexToChainMap[res]
  }
  async resolveCurrentAddress() {
    await window.ethereum.enable()
    const addressList = await window.ethereum.request({
      method: 'eth_accounts',
    })
    return addressList[0].toLowerCase()
  }
  async approveToken(
    web3: Web3,
    token: string,
    lockAddress: string,
    amount: string
  ) {
    let contract = new web3.eth.Contract(ERC20 as AbiItem[], token)
    await contract.methods
      .approve(lockAddress, amount)
      .send({ from: await this.resolveCurrentAddress() })
  }
  async tokenBalanceAndDecimals(
    web3: Web3,
    token: string,
    userAddress: string
  ): Promise<{ amount: TokenAmount; decimals: number }> {
    let contract = new web3.eth.Contract(ERC20 as AbiItem[], token)
    const decimals = await contract.methods.decimals.call().call()
    const res = await contract.methods.balanceOf(userAddress).call()
    return {
      amount: new TokenAmount(res, Number(decimals)),
      decimals: decimals,
    }
  }
  async nativeTokenBalance(
    web3: Web3,
    address: string
  ): Promise<{ amount: TokenAmount; decimals: number }> {
    const balance = await web3.eth.getBalance(address)
    return { amount: new TokenAmount(balance, 18), decimals: 18 }
  }
  async mintCan(web3: Web3, canAddress: string, amount: string) {
    let contract = new web3.eth.Contract(Can as AbiItem[], canAddress)
    const from = await this.resolveCurrentAddress()
    await contract.methods.mintFor(from, amount).send({ from })
  }
}

export class Web3WalletConnector {
  ethEnabled(): boolean {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.ethereum.enable()
      return true
    }
    return false
  }
}

export function toPlainString(num: number): string {
  return num.toLocaleString('fullwide', { useGrouping: false })
}
