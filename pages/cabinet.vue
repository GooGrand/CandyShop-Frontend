<template>
  <div class="container">
    <div class="flex pt-8 pb-4 px-6 text-[10px] font-bold mr-auto items-center">
      <a
        href="/"
        class="text-[#12161D] text-opacity-50 no-underline hover:underline"
      >
        Home
      </a>
      <icon
        class="
          text-[#12161D] text-opacity-50 text-[6px]
          fill-current
          stroke-current
          text-gray-600
          mx-1
        "
        name="mono/double-arrow"
      />
      <a
        href="/"
        class="text-[#12161D] text-opacity-50 no-underline hover:underline"
      >
        My candies
      </a>
    </div>

    <div class="flex pb-4 px-6">
      <span class="text-2xl font-bold mr-auto"> My balance 💰 </span>
    </div>
    <div class="flex flex-wrap">
      <div class="flex small-bg pt-5 pr-8 pb-9">
        <div
          class="
            flex
            border-[1px] border-white
            rounded-[14px]
            py-7
            pl-7
            pr-[150px]
            sm:pr-[285px]
          "
          style="backdrop-filter: blur(42px)"
        >
          <div class="text-[#12161D] leading-[135%] text-[26px] font-medium">
            ${{ farmedBalance }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex pt-8 pb-4 px-6">
      <span class="text-2xl font-bold mr-auto"> My candies </span>
    </div>
    <div
      class="
        flex flex-wrap
        border-[1px] border-[#B85DFF]
        p-4
        sm:p-10
        rounded-[23px]
        mb-[53px]
      "
    >
      <div class="flex w-full relative">
        <div class="flex w-full pb-2 overflow-x-scroll sm:overflow-x-auto">
          <table class="w-full min-w-[600px] mb-[70px]">
            <thead>
              <tr class="border-b border-[#D9DCE2] h-[70px]">
                <th class="text-[#12161D] text-opacity-50 text-left w-[5%]">
                  #
                </th>
                <th class="text-[#12161D] text-left w-[30%]">LP Candies</th>
                <th class="text-[#12161D] text-left w-[20%]">APY</th>
                <th class="text-[#12161D] text-left w-[20%]">Paid</th>
                <th class="text-[#12161D] text-left w-[20%]">Received</th>
                <th class="w-[5%]"></th>
              </tr>
            </thead>
            <tbody v-if="loaded">
              <tr
                v-for="(item, index) of activeCans"
                :key="index"
                class="border-b border-[#D9DCE2] h-[70px]"
              >
                <td class="text-[#12161D] text-opacity-50">{{ index++ }}</td>
                <td>
                  <div class="flex-wrap flex items-center h-full">
                    <div class="flex px-1">
                      <div
                        class="
                          h-8
                          w-8
                          flex
                          justify-center
                          rounded-[40px]
                          border-[1px] border-[#D9DCE2]
                          items-center
                          z-20
                          bg-white
                        "
                      >
                        <icon class="text-base" name="mono/gton" />
                      </div>
                      <div
                        class="
                          h-8
                          w-8
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
                          class="text-base"
                          :name="'tokens/' + item.token.pool_meta.token_img"
                        />
                      </div>
                    </div>
                    <div class="flex font-medium text-lg text-[#FF00F5]">
                      can{{ item.token.pool_meta.token_pair_name }}
                    </div>
                  </div>
                </td>
                <td class="text-[#12161D]">{{ item.token.apy }}%</td>
                <td class="text-[#FF00F5]">${{ item.paid }}</td>
                <td class="text-[#12161D]">${{ item.earned }} GTON</td>
                <td class="">
                  <btn
                    class="px-8"
                    size="medium"
                    variant="empty"
                    @click="openRedeem(item)"
                  >
                    Redeem
                  </btn>
                </td>
              </tr>
            </tbody>
            <div v-else class="flex justify-center mt-[50px] mb-[30px]">
              <div class="loader-2 center"><span></span></div>
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserCanData, WalletBody } from '~/store/wallet'
export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    farmedBalance(): string {
      if (!this.currentWallet) return '0'
      return this.currentWallet.totalEarned
    },
    activeCans(): UserCanData[] {
      return this.$store.getters['wallet/userCandies']
    },
    currentWallet(): WalletBody {
      return this.$store.getters['wallet/currentWallet']
    },
    loaded(): boolean {
      return this.activeCans.length > 0
    },
  },
  methods: {
    openRedeem(can: UserCanData) {
      this.$store.commit('cans/setRedeemCan', can)
      const modal = JSON.parse(
        JSON.stringify(this.$store.getters['app/exampleModals'].redeem)
      )
      modal.data.callbackRedeem = () => {
        this.$store.commit('app/CLOSE_MODAL')
      }
      this.$store.commit('app/PUSH_MODAL', modal)
    },
  },
})
</script>
