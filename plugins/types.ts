import { NuxtWeb3Instance } from './web3'

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $web3: NuxtWeb3Instance
  }

  interface NuxtAppOptions {}

  interface Configuration {}
}

declare module 'vue/types/vue' {
  interface Vue {
    $web3: NuxtWeb3Instance
  }
}
