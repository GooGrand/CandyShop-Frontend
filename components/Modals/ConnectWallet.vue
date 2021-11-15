<template>
  <modal name="connect-wallet" @close="$store.commit('app/CLOSE_MODAL')">
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
        Connect to {{ label }}
      </div>
      <div
        class="flex border-[1px] border-[#B85DFF] rounded-[23px] justify-center"
      >
        <div
          class="
            bg-dark-charcoal
            rounded-[10px]
            min-h-[215px]
            flex flex-col
            justify-center
            items-center
          "
        >
          <img
            class="w-[86px] h-[80px] object-center object-contain mb-[30px]"
            :src="img"
            :alt="label"
          />
          <btn
            v-show="!connected"
            variant="gradient"
            rounded
            class="w-[150px]"
            @click="onClickMetamaskConnect"
          >
            Connect
          </btn>
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { WalletProvider, WalletBody, isWalletEqual } from '~/store/wallet'
import {
  Web3WalletConnector,
  availableChains,
  Chains,
  Invoker,
} from '~/utils/metamask'
import logger from '~/utils/logger'
import { metamaskBus } from '~/components/metamaskBus'

const invoker = new Invoker()

const connector = new Web3WalletConnector()
export default Vue.extend({
  data: () => ({
    connected: false,
    userConnectOccured: false,
    balanceWatchInterval: 0 as unknown as NodeJS.Timeout,
    WalletProvider,
    userLoggedOnce: [false, false],
    userLoggedOncePhantom: false,
  }),
  computed: {
    modals(): any {
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
    provider(): string {
      return this.data?.provider
    },
    img(): String {
      return this.data?.img
    },
    isWalletUpdateAllowed(): boolean {
      return (
        this.userConnectOccured ||
        this.$store.getters['wallet/isWalletAvailable']
      )
    },
  },
  mounted() {
    this.userLoggedOnce[WalletProvider.Metamask] = Boolean(
      window.localStorage.getItem('logged_once')
    )
    const connect = this.connectMetamask.bind(this)
    setTimeout(connect, 3000)
    metamaskBus.$on('logout', (data: WalletProvider) => {
      this.logWalletOut(data)
    })
    metamaskBus.$on('connect', async () => {
      await this.connectMetamask()
    })
  },
  created() {
    const fn = () => {
      if (!this.isWalletUpdateAllowed) {
        return
      }
      this.walletDataUpdate()
    }
    this.balanceWatchInterval = setInterval(fn.bind(this), 4000)
  },
  beforeDestroy() {
    clearInterval(this.balanceWatchInterval)
  },
  methods: {
    async buildWalletBody(
      provider: WalletProvider
    ): Promise<Array<WalletBody>> {
      const address = await invoker.resolveCurrentAddress()
      const id: Chains = await invoker.getNetworkVersion()
      const label: string = availableChains[id]
        ? availableChains[id].chainName
        : 'Unknown'
      const oldWalletData = this.$store.getters['wallet/currentWallet']
      const updatedWalletBody = {
        isConnected: true,
        address,
        checked: true,
        activeCans: [],
        totalEarned: "0",
        wallet: { id, label },
        provider,
      }
      return [updatedWalletBody, oldWalletData]
    },
    async walletDataUpdate() {
      if (!this.isWalletUpdateAllowed) return
      await this.checkWalletData(WalletProvider.Metamask)
    },
    async checkWalletData(provider: WalletProvider): Promise<void> {
      const [updatedWalletBody, oldWalletData] = await this.buildWalletBody(
        provider
      )
      if (isWalletEqual(oldWalletData, updatedWalletBody)) {
        return
      }
      this.$store.commit('wallet/updateWalletData', {
        // eslint-disable-next-line
        provider: provider,
        body: updatedWalletBody,
      })
    },
    dispatch() {
      const wallet = this.$store.getters['wallet/currentWallet']
      const provider = wallet.provider
      this.userConnectOccured = false
      this.$store.dispatch('wallet/disconnectWallet', { provider })
    },
    logWalletOut(walletName: WalletProvider) {
      window.localStorage.removeItem('logged_once')
      window.localStorage.removeItem('logged_once_phantom')
      clearInterval(this.balanceWatchInterval)
      setTimeout(this.dispatch.bind(this, walletName), 1000)
    },
    async connectMetamask() {
      const isConnected = connector.ethEnabled()
      if (!isConnected) {
        return
      }
      await this.checkWalletData(WalletProvider.Metamask)
      this.userConnectOccured = true
      window.localStorage.setItem('logged_once', 'true') 
      this.$store.dispatch('wallet/updateCanData', {
        provider: WalletProvider.Metamask,
      })
    },
    async onClickMetamaskConnect() {
      try {
        await this.connectMetamask()
      } catch (err) {
        logger({ err })
      } finally {
        this.$store.commit('app/CLOSE_MODAL')
      }
    },
  },
})
</script>
