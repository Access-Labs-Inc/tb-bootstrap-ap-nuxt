<template>
  <client-only>
    <WalletConnection
      :connected="$store.getters['wallet/isConnected']"
      :address="$store.getters['wallet/address']"
      :has-access="$store.getters['pools/hasAccess']"
      :loading="$store.getters['wallet/loading']"
      :error="$store.getters['pools/error']"
      :gas="$store.getters['wallet/gas']"
      :minimum-stake="$store.getters['pools/minStake']"
      :unstaked="$store.getters['pools/tokens']"
      :staked="$store.getters['pools/staked']"
      :claimable="$store.getters['pools/rewards']"
      :pool-loading="$store.getters['pools/loading']"
      :pool-indicators="$store.getters['pools/indicators']"
      :forced-open="$store.getters['wallet/forcedOpen']"
      :unstake-redirect="$store.getters['program/unstakeURL']"
      :wallet-name="$store.getters['wallet/walletName']"
      :guiding="$store.getters['wallet/guiding']"
      :eager-connection="$store.getters['wallet/wasEager']"

      @disconnect="$store.dispatch('wallet/disconnectWallet')"
      @dismiss="$store.dispatch('pools/setError', '')"
      @claim="$store.dispatch('pools/claimRewards')"
      @stake="(e) => $store.dispatch('pools/getAccountsAndClaimRewardsAndStakeToPool', e)"
      @walletOpen="(e) => $store.dispatch('wallet/forceOpen', e)"
    />
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import WalletConnection from '@/components/Wallet/WalletConnection.vue'

export default Vue.extend({
  components: {
    WalletConnection
  }
})
</script>
