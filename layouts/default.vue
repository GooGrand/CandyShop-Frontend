<template>
  <div class="min-h-screen font-sans bg-body relative flex flex-col text-maastricht-blue">
    <vue-header />
    <mobile-menu-interface />

    <main class="flex-grow relative z-[1]">

      <nuxt />
    </main>
    <modals-connect-wallet />
    <modals-buyLP />
    <modals-redeem />
    <modals-confirmModal />
    <modals-select-network />
    <vue-footer />
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  async mounted() {
    await this.$store.dispatch("cans/uploadCans");
  }
})
</script>
