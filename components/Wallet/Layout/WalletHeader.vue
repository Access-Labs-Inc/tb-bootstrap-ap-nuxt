<template>
  <div class="dropdownTop">
    <AccessLogo />
    <ConnectStatusIndicator
      :has-access="hasAccess"
      :unstaked="unstaked"
      :minimum-stake="minimumStake"
      :connected="connected"
    />
  </div>
</template>

<script>
import walletStates from '@/components/mixins/walletStates'

import AccessLogo from '@/components/Wallet/Layout/AccessLogo.vue'
import ConnectStatusIndicator from '@/components/Wallet/Layout/ConnectStatusIndicator.vue'
export default {
  components: {
    AccessLogo,
    ConnectStatusIndicator
  },
  mixins: [walletStates]

}
</script>

<style lang="scss" scoped>
@import './walletHeader.scss';
</style>
