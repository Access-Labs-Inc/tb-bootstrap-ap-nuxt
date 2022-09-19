<template>
  <div v-if="!loading" class="walletView">
    <WalletHeader
      :has-access="hasAccess"
      :unstaked="unstaked"
      :minimum-stake="minimumStake"
      :connected="connected"
    />
    <div class="addSection">
      <WalletSection
        :main="truncatedAddress"
        :clipboard="true"
        :web-wallet="webWallet"
        extra="Disconnect"
        label="Your stake"
        :balance="staked"
        @disconnect="$emit('disconnect')"
      />
      <ActionButton
        @redirect="$emit('redirect')"
        text="Read Access Content"
        redirectTo="access"
        :disabled="!hasAccess"
        :redirects="true"
      />
      <WalletWarning v-if="!hasAccess" type="minimum">
        You need at least {{ minimumStake + (minimumStake * 0.01) }} ACS to meet the staking requirement to unlock Access content
      </WalletWarning>
    </div>
    <Toggle
      :pills="pills"
      :selected="actionView"
      :has-access="hasAccess"
      :claimable="claimable"
      @click="(e) => actionView = e"
    />
    <component
      :is="actionView"
      :staked="staked"
      :unstaked="unstaked"
      :claimable="claimable"
      :minimum-stake="minimumStake"
      :toStake="toStake"
      :insufficient-gas="insufficientGas"
      @stake="stake"
      @claim="claim"
      @unstake="unstake"
    />
    <WalletWarning v-if="insufficientGas" type="insufficient">
      Insufficient SOL for this transaction
    </WalletWarning>
    <ErrorModal
      v-if="error"
      :error="error"
      @dismiss="$emit('dismiss')"
    />
  </div>
  <div v-else class="walletView">
    <div class="spinner" />
  </div>
</template>

<script lang="ts">
import Toggle from '@/components/Wallet/Layout/Toggle.vue'
import WalletHeader from '@/components/Wallet/Layout/WalletHeader.vue'
import WalletSection from '@/components/Wallet/Layout/WalletSection.vue'
import walletStates from '@/components/mixins/walletStates'
import ActionButton from '@/components/Wallet/Actions/ActionButton.vue'
import Pill from '@/components/Wallet/Layout/Pill.vue'
import Stake from '@/components/Wallet/Actions/Stake.vue'
import Claim from '@/components/Wallet/Actions/Claim.vue'
import Unstake from '@/components/Wallet/Actions/Unstake.vue'
import ErrorModal from './Layout/ErrorModal.vue'
import WalletWarning from '@/components/Wallet/Layout/WalletWarning.vue'

export default {
  components: {
    WalletSection,
    WalletHeader,
    ActionButton,
    Pill,
    Stake,
    Claim,
    Unstake,
    Toggle,
    ErrorModal,
    WalletWarning
  },
  mixins: [walletStates],
  data () {
    return {
      actionView: 'Stake',
      pills: ['Stake', 'Claim', 'Unstake']
    }
  },
  computed: {
    webWallet () {
      const wallets = Object.keys(this.webWallets)
      if (!wallets.includes(this.walletName)) {
        return {}
      }

      const name = wallets.find(name => name === this.walletName)
      return {
        name,
        url: this.webWallets[name]
      }
    }
  },
  methods: {
    stake (toStake: Number): void {
      this.$emit('stake', toStake)
    },

    claim (): void {
      this.$emit('claim')
    },

    unstake (): void {
      window.open(this.unstakeRedirect, "_blank")
    }
  }
}
</script>

<style lang="scss" scoped>
@import './walletView.scss';
</style>
