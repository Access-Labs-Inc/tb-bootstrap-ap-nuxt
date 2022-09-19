<template>
  <div v-click-outside="listener" class="walletConnection">
    <ConnectButton
      :address="address"
      :minimum-stake="minimumStake"
      :unstaked="unstaked"
      :has-access="hasAccess"
      :connected="connected"
      :loading="loading"
      @connect="handleConnect"
    />
    <Teleport to="body">
      <wallet-multi-button
        logo=""
        :dark="theme == 'dark'"
        :connect-modal="showWalletModal"
        @reinstall="reinstallWalletAdapters"
        @open="(e) => showWalletModal = e"
      />
    </Teleport>
    <component
      v-if="showProfile"
      :is="subView"
      :gas="gas"
      :loading="loading"
      :indicators="poolIndicators"
      :error="error"
      :minimum-stake="minimumStake"
      :toStake="toStake"
      :address="address"
      :connected="connected"
      :unstaked="unstaked"
      :staked="staked"
      :claimable="claimable"
      :has-access="hasAccess"
      :unstake-redirect="unstakeRedirect"
      :wallet-name="walletName"
      @redirect="showProfile = false"
      @dismiss="$emit('dismiss')"
      @disconnect="$emit('disconnect'); showProfile = false"
      @claim="$emit('claim')"
      @stake="(e) => $emit('stake', e)"
    />
    <ConnectModal
      v-if="showConnectModal"
      @connect="guideModalConnect"
      @close="showConnectModal = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import ClickOutside from 'vue-click-outside'
import Teleport from 'vue2-teleport'
import WalletView from './WalletView.vue'
import ProgressModal from './ProgressModal.vue'
import ConnectModal from './ConnectModal.vue'
import ConnectButton from '@/components/Wallet/Layout/ConnectButton.vue'
import guidedConnection from '@/components/mixins/guidedConnection'
import walletStates from '@/components/mixins/walletStates'
import { WalletMultiButton } from '@/components/wallets-vue'


export default defineComponent({
  components: {
    Teleport,
    WalletMultiButton,
    ConnectButton,
    WalletView,
    ProgressModal,
    ConnectModal
  },
  props: {
    poolLoading: {
      type: Boolean,
      default: false
    },
    poolIndicators: {
      type: Object,
      default: () => {}
    },
    error: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  mixins: [guidedConnection, walletStates],
  computed: {
    subView () {
      return this.poolLoading ? 'ProgressModal' : 'WalletView'
    }
  },
  watch: {
    connected (newConn, oldConn) {
      if (!this.eagerConnection && (!oldConn && newConn)) {
        this.showProfile = true
      }
    },
  },
  mounted() {
    this.popupItem = this.$el
    window.addEventListener('scroll', this.listener)
  },
  directives: {
    ClickOutside
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.listener)
  },
  methods: {
    listener() {
      this.showProfile = false
      this.$emit('walletOpen', this.showProfile)
    },
    handleConnect (): void {
      if (this.checkFirstConnection()) {
        this.showConnectModal = true
        return
      }

      this.showWalletModal = !this.connected

      this.showProfile = this.connected && !this.showProfile

      this.$emit('walletOpen', this.showProfile)
    },
    reinstallWalletAdapters (): void {
      // stub
    }
  }
})
</script>

<style lang="scss">
@import './walletConnection';
</style>
