import { Plugin } from '@nuxt/types'
import Web3 from 'web3'
const { HttpProvider } = Web3.providers;

export function createWeb3Instance(rpcUrl: string) {
  return new Web3(new HttpProvider(rpcUrl));
}

export async function getInjectedInstance() {
  return new Web3(window.ethereum);
}

const web3Plugin: Plugin = async (ctx, inject) => {
  const web3 = await getInjectedInstance();
  ctx.$web3 = web3
  inject('web3', web3)
}

export default web3Plugin

export interface NuxtWeb3Instance extends Web3 {}