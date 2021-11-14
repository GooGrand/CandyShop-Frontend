<template>
  <modal name="select-network" @close="$store.commit('app/CLOSE_MODAL')">
    <div
      class="
        relative
        h-full
        bg-white
        rounded-[23px]
        min-h-[307px]
        sm:py-[44px]
        p-6
        sm:px-[40px] sm:min-w-[610px]
      "
    >
      <button
        class="
          absolute
          z-10
          right-[12px]
          top-[12px]
          bg-ghost-white
          text-vampire-black
          hover:text-[#FF00F5]
          text-[12px]
          p-0
          rounded-full
          w-[27px]
          h-[27px]
          flex
          items-center
          justify-center
        "
        aria-label="Close the modal window"
        @click="$store.commit('app/CLOSE_MODAL')"
      >
        <icon name="mono/close" class="fill-current stroke-current" />
      </button>

      <div
        class="
          mb-[18px]
          text-[26px] text-[#12161D]
          leading-none
          text-center
          font-medium
          text-center
        "
      >
        Select a Network
      </div>
      <div
        class="
          mb-[18px]
          text-[13px] text-[#12161D] text-opacity-50
          leading-none
          text-center
          font-medium
          text-center
        "
      >
        You are in a {{ currentChainName }} network
      </div>
      <div
        class="flex border-[1px] border-[#B85DFF] rounded-[23px] justify-center"
      >
        <div
          class="
            flex flex-wrap
            mx-[-15px]
            bg-dark-charcoal
            rounded-[10px]
            flex
            justify-center
            items-center
            p-[30px]
          "
        >
          <div
          v-for="item in chains"
          :key="item.id"
            class="
              flex
              items-center
              rounded-[40px]
              border-gray-300 border-[1px]
              px-[15px]
              h-[42px]
              m-[10px]
              hover:cursor-pointer
            "
            :class="currentChain === item.id ? 'border-[#FF00F5]' : ''"
            @click="selectNetwork(item.id)"
          >
            <img
              :src="item.img"
              width="100"
              height="25"
              :alt="item.alt"
            />
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { WalletBody } from '~/store/wallet'
import { chains, chainName } from '~/components/common'
import { Invoker, availableChains, Chains } from '~/utils/metamask'

const invoker = new Invoker()

export default Vue.extend({
  data: () => ({
    connected: false,
    chains,
  }),
  computed: {
    currentChainName(): string {
      return chainName[this.currentChain] || ''
    },
    currentWallet(): WalletBody | null {
      return this.$store.getters['wallet/currentWallet']
    },
    currentChain(): Chains {
      if (!this.currentWallet) return Chains.Eth
      return this.currentWallet.wallet.id
    },
    modals() {
      return this.$store.getters['app/modals']
    },
    modal(): any {
      return this.modals[this.modals.length - 1]
    },
    data(): any {
      return this.modal?.data
    },
    label(): string {
      return this.data?.label
    },
    img(): string {
      return this.data?.img
    },
  },
  methods: {
    async selectNetwork(chain: Chains) {
      await invoker.switchMetamaskNetwork(availableChains[chain])
    },
  },
})
</script>
