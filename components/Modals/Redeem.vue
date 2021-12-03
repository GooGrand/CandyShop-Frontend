<template>
  <modal name="redeem" @close="$store.commit('app/CLOSE_MODAL')">
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

      <div class="flex border-b border-[#D9DCE2] pb-4 sm:pb-[22px]">
        <div class="flex">
          <div
            class="
              h-10
              w-10
              flex
              justify-center
              rounded-[40px]
              border-[1px] border-[#D9DCE2]
              items-center
              z-20
              bg-white
            "
          >
            <icon class="text-[22px]" name="mono/gton" />
          </div>
          <div
            class="
              h-10
              w-10
              flex
              justify-center
              rounded-[40px]
              border-[1px] border-[#D9DCE2]
              items-center
              z-10
              bg-white
              ml-[-7px]
            "
          >
            <icon
              class="text-[22px]"
              :name="'tokens/' + can.pool_meta.token_img"
            />
          </div>
        </div>
        <span class="font-medium text-[26px] pl-2 text-[#12161D]">
          can{{ can.pool_meta.token_pair_name }}
        </span>
      </div>
      <div
        class="
          flex flex-wrap
          mt-5
          rounded-[23px]
          border-[1px] border-[#B85DFF]
          p-5
          sm:p-8
          bg-white
        "
      >
        <div class="w-full">
          <div class="flex items-end font-medium text-[#12161D]">
            <div class="mr-auto text-[13px]">Amount</div>
            <div
              class="
                text-[#12161D] text-opacity-50
                ml-2
                sm:ml-4
                mr-1
                text-[10px]
                md:text-[13px]
              "
            >
              Token available:
            </div>
            <div class="text-[10px] md:text-[13px]">
              {{ canData.paid }} {{ can.pool_meta.token_pair_name }}
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="amount"
              type="text"
              class="
                w-full
                rounded-[27px]
                border-[1px] border-[#b7d2d6]
                text-[#12161d] text-xs
                p-3
                appearance-none
                outline-none
                font-medium
                focus:border-[#FF00F5]
              "
            />
          </div>
          <div class="flex mt-[14px] text-[13px] font-medium">
            <div class="text-[#12161D] mr-auto">You will receive:</div>
          </div>
          <div class="flex mt-[10px] text-[13px] font-medium">
            <div class="text-[#12161D] text-opacity-50 mr-auto">
              Earned rewards:
            </div>
            <div class="">{{ canData.earned }} GTON</div>
          </div>
          <div class="flex mt-[10px] text-[13px] font-medium">
            <div class="text-[#12161D] text-opacity-50 mr-auto">
              Paid token:
            </div>
            <div class="">
              {{ tokenReturn }} {{ can.pool_meta.token_pair_name }}
            </div>
          </div>
          <!-- <div class="flex mt-[10px] text-[13px] items-center font-medium">
            <div class="text-[#12161D] mr-auto">Total:</div>
            <div class="text-[25px]">${{total}}</div>
          </div> -->
        </div>
      </div>
      <div v-if="!isWalletAvailable" class="flex mt-5">
        <btn block rounded variant="gradient" @click="connect">
          Connect MetaMask
        </btn>
      </div>
      <div v-else-if="invalidChain" class="flex mt-5">
        <btn
          block
          rounded
          variant="gradient"
          @click="switchChain(can.chain_meta.chain_id)"
        >
          Switch to {{ can.chain_name }}
        </btn>
      </div>
      <div v-else class="flex mt-5">
        <btn rounded block variant="gradient" @click="confirmRedeem">
          Redeem
        </btn>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserCanData } from '~/store/wallet'
import { Can } from '~/utils/candies'
import logger from '~/utils/logger'
import {
  availableChains,
  Chains,
  Invoker,
  toPlainString,
} from '~/utils/metamask'
import { TokenAmount } from '~/utils/safe-math'

const invoker = new Invoker()
// !TODO: validation + correct chain
export default Vue.extend({
  data: () => ({
    connected: false,
    amount: 0,
    processing: false,
  }),
  computed: {
    invalidChain(): boolean {
      if (!this.isWalletAvailable) return true
      // eslint-disable-next-line
      return this.can.chain_meta.chain_id != this.currentWallet.wallet.id
    },
    canData(): UserCanData {
      return this.$store.getters['cans/redeemCan']
    },
    currentWallet() {
      return this.$store.getters['wallet/currentWallet']
    },
    isWalletAvailable() {
      return this.$store.getters['wallet/isWalletAvailable']
    },
    can(): Can {
      return this.canData.token
    },
    tokenReturn(): string {
      return Number(this.amount).toFixed(4)
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
    connect() {
      const modal = JSON.parse(
        JSON.stringify(this.$store.getters['app/exampleModals'].connectWallet)
      )

      modal.data.callbackConnect = () => {
        this.connected = true
        this.$store.commit('app/CLOSE_MODAL')
      }
      this.$store.commit('app/PUSH_MODAL', modal)
    },
    async switchChain(id: Chains) {
      await invoker.switchMetamaskNetwork(availableChains[id])
    },
    async getDecimals(): Promise<number> {
      if (this.can.pool_meta.native) return 18
      const { decimals } = await invoker.tokenBalanceAndDecimals(
        this.$web3,
        this.can.token_a_address,
        this.currentWallet.address
      )
      return decimals
    },
    async confirmRedeem() {
      if (!this.amount) return
      const decimals = await this.getDecimals()
      const formattedAmount = toPlainString(
        new TokenAmount(this.amount, decimals, false).toEther().toNumber()
      )
      const formattedReward = toPlainString(
        new TokenAmount(this.canData.earned, decimals, false)
          .toEther()
          .toNumber()
      )
      try {
        this.processing = true
        await invoker.burnCan(
          this.$web3,
          this.can.can_address,
          formattedAmount,
          formattedReward
        )
        this.data.callbackRedeem && this.data.callbackRedeem()
        const modal = JSON.parse(
          JSON.stringify(this.$store.getters['app/exampleModals'].confirmModal)
        )
        this.$store.commit('app/PUSH_MODAL', modal)
      } catch (e) {
        logger(e)
        this.processing = false
      }
    },
  },
})
</script>
