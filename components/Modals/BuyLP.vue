<template>
  <modal name="buyLP" @close="$store.commit('app/CLOSE_MODAL')">
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
        max-w-[610px]
      "
    >
      <button
        aria-label="Close the modal window"
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
        @click="$store.commit('app/CLOSE_MODAL')"
      >
        <icon class="fill-current stroke-current" name="mono/close" />
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
          px-6
          py-5
          sm:px-[30px] sm:pt-[30px]
        "
      >
        <div class="w-full sm:w-auto">
          <div class="text-[13px] font-medium text-[#12161D]">Token</div>
          <div class="pt-2 pb-4 sm:py-3 w-full">
            <div class="relative sm:mr-4 w-full flex">
              <div class="dropdown w-full sm:w-auto">
                <button
                  class="
                    flex
                    items-center
                    text-sm
                    rounded-[40px]
                    border-[#D9DCE2] border-[1px]
                    h-[42px]
                    w-full
                    sm:w-[168px]
                    py-[4px]
                    pl-[12px]
                    sm:my-0
                  "
                >
                  <span
                    class="
                      h-[30px]
                      w-[30px]
                      mr-1
                      flex
                      justify-center
                      rounded-[40px]
                      border-[1px] border-[#D9DCE2]
                      items-center
                      z-20
                      bg-white
                    "
                  >
                    <icon
                      class="text-[16px]"
                      :name="'tokens/' + can.pool_meta.token_img"
                    />
                  </span>
                  {{ can.pool_meta.token_pair_name }}
                </button>
                <!-- <div
                     class="dropdown-content overflow-hidden rounded-[11px] border-[#D9DCE2] border-[1px] bg-white w-[168px]" tabindex="0">
                  <div>
                    <button class="flex items-center bg-white w-full h-[42px] p-[10px] hover:cursor-pointer hover:bg-[#D9DCE2] hover:rounded-t-[11px] hover:bg-opacity-50 "
                         @click="closeDropMenu">
                      <span class="h-[30px] w-[30px] mr-1 flex justify-center rounded-[40px] border-[1px] border-[#D9DCE2] items-center z-20 bg-white">
                        <icon class="text-[16px]"
                              name="mono/usdt"/>
                      </span>
                      USDT
                    </button>
                    <button class="flex items-center w-full bg-white h-[42px] p-[10px] hover:cursor-pointer hover:bg-[#D9DCE2] hover:bg-opacity-50"
                    @click="closeDropMenu">
                      <span class="h-[30px] w-[30px] mr-1 flex justify-center rounded-[40px] border-[1px] border-[#D9DCE2] items-center z-20 bg-white  ">
                        <icon class="text-[16px]"
                              name="mono/usdc"/>
                      </span>
                      USDC
                    </button>
                    <button class="flex items-center w-full bg-white h-[42px] p-[10px] hover:cursor-pointer hover:bg-[#D9DCE2] hover:rounded-b-[11px] hover:bg-opacity-50 "
                         @click="closeDropMenu">
                      <span class="h-[30px] w-[30px] mr-1 flex justify-center rounded-[40px] border-[1px] border-[#D9DCE2] items-center z-20 bg-white">
                        <icon class="text-[16px]"
                              name="mono/busd"/>
                      </span>
                      BUSD
                    </button>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="w-full sm:w-auto whitespace-nowrap">
          <div class="flex items-end font-medium text-[#12161D]">
            <div class="text-[13px] mr-auto">Amount</div>
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
              Candy available:
            </div>
            <div class="text-[10px] md:text-[13px]">
              {{ tokenBalance.fixed(4) }} {{ can.pool_meta.token_pair_name }}
            </div>
          </div>
          <div class="pt-2 pb-4 sm:py-3 w-full">
            <input
              v-model="amount"
              class="
                w-full
                sm:w-[268px]
                rounded-[27px]
                border-[1px] border-[#b7d2d6]
                text-[#12161d] text-xs
                p-3
                outline-none
                font-medium
                focus:border-[#FF00F5]
              "
              type="text"
              :readonly="processing || status == Status.Send"
            />
          </div>
        </div>
        <div class="w-full">
          <div
            class="flex items-end font-medium text-[#12161D] whitespace-nowrap"
          >
            <div class="text-[#12161D] text-opacity-50 mr-1 text-[13px]">
              You will receive:
            </div>
            <div class="text-[13px]">{{ amountLpOut }} LP token</div>
          </div>
        </div>
      </div>
      <div class="sm:flex mt-4 text-[10px] font-medium">
        <div class="text-[#12161D] text-opacity-50 mr-auto">
          Estemated transaction time:
        </div>
        <div class="">~ 5 minutes</div>
      </div>
      <div class="sm:flex mt-2 text-[10px] font-medium">
        <div class="text-[#12161D] text-opacity-50 mr-auto">
          Estemated transaction fee:
        </div>
        <div class="">the standard fee of the outbound network</div>
      </div>
      <div v-if="!isWalletAvailable" class="flex mt-[22px]" >
        <btn
          block
          rounded
          variant="gradient"
          @click="connect"
        >
          Connect MetaMask
        </btn>
      </div>
      <div v-else class="flex mt-[22px]" >
        <btn
          v-if="status === Status.Approve"
          block
          rounded
          variant="gradient"
          :disabled="processing || invalidInput"
          @click="approve"
        >
          Approve
        </btn>
        <btn
          v-else
          block
          rounded
          variant="gradient"
          :disabled="processing"
          @click="confirmBuy"
        >
          Buy NOW
        </btn>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { Can, amountLpOut } from '~/utils/candies'
import { TokenAmount } from '~/utils/safe-math'
import { Invoker, toPlainString } from '~/utils/metamask'
import { WalletBody } from '~/store/wallet'
import logger from '~/utils/logger'
import { createWeb3Instance } from '~/plugins/web3'

const invoker = new Invoker()
enum Status {
  Approve,
  Send,
}
export default Vue.extend({
  data: () => ({
    connected: false,
    processing: false,
    decimals: 18,
    tokenBalance: new TokenAmount(0, 18),
    dropdown: false,
    status: Status.Approve,
    Status,
    amount: null as null | number,
    weiToSend: '',
  }),
  computed: {
    invalidInput(): boolean {
      // @ts-ignore
      return Number(this.amount) === 0 || this.amount > this.tokenBalance.toEther().toNumber();
    },
    amountLpOut(): string {
      if (!this.amount) return '0'
      return amountLpOut(
        new TokenAmount(this.amount, this.decimals, false),
        new TokenAmount(this.can.lp_total_supply, this.decimals),
        new TokenAmount(this.can.reserve_a, this.decimals)
      ).fixed(4)
    },
    isWalletAvailable(): WalletBody {
      return this.$store.getters['wallet/isWalletAvailable']
    },
    currentWallet(): WalletBody {
      return this.$store.getters['wallet/currentWallet']
    },
    can(): Can {
      return this.$store.getters['cans/currentCan']
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
  watch: {
    async isWalletAvailable() {
      await this.setBalance()
    },
  },
  async mounted() {
    if (this.isWalletAvailable) {
      await this.setBalance()
    }
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
    async setBalance() {
      if(!this.isWalletAvailable) return;
      let amount;
      let decimals
      if(this.can.pool_meta.native) {
      ({ amount, decimals } = await invoker.nativeTokenBalance(
        createWeb3Instance(this.can.rpc_url),
        this.currentWallet.address
      ))
      } else {
      ({ amount, decimals } = await invoker.tokenBalanceAndDecimals(
        createWeb3Instance(this.can.rpc_url),
        this.can.token_a_address,
        this.currentWallet.address
      ))
      }
      this.tokenBalance = amount
      this.decimals = Number(decimals)

    },
    async approve() {
      if (!this.amount) return
      try {
        this.weiToSend = toPlainString(
          new TokenAmount(this.amount, this.decimals, false).toWei().toNumber()
        )
        this.processing = true
        await invoker.approveToken(
          this.$web3,
          this.can.token_a_address,
          this.can.can_address,
          this.weiToSend
        )
        this.status = Status.Send
      } catch (e) {
        logger(e)
      }
      this.processing = false
    },
    onClickOutside() {
      // @ts-ignore
      if (!document.activeElement.className.includes('dropdown')) {
        this.dropdown = false
      }
    },
    closeDropMenu() {
      this.dropdown = false
    },
    async confirmBuy() {
      try {
        await invoker.mintCan(this.$web3, this.can.can_address, this.weiToSend)
        const modal = JSON.parse(
          JSON.stringify(this.$store.getters['app/exampleModals'].confirmModal)
        )
        this.data.callbackBuy && this.data.callbackBuy()
        this.$store.commit('app/PUSH_MODAL', modal)
      } catch (e) {
        logger(e)
      }
    },
  },
})
</script>
