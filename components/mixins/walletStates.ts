export default {
  props: {
    connected: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    },
    hasAccess: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    },
    gas: {
      type: Number,
      default: 0
    },
    minimumStake: {
      type: Number,
      default: 0
    },
    unstaked: {
      type: Number,
      default: 0
    },
    staked: {
      type: Number,
      default: 0
    },
    claimable: {
      type: Number,
      default: 0
    },
    toStake: {
      type: Number,
      default: 0
    },
    error: {
      type: String,
      default: ''
    },
    unstakeRedirect: {
      type: String,
      default: ''
    },
    hasBalance: {
      type: Boolean,
      default: false
    },
    poolLoading: {
      type: Boolean,
      default: false
    },
    poolIndicators: {
      type: Object,
      default: () => {}
    },
    forcedOpen: {
      type: Boolean,
      default: false
    },
    guiding: {
      type: Boolean,
      default: false
    },
    eagerConnection: {
      type: Boolean,
      default: false
    },
    walletName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      webWallets: {
        'Sollet': 'https://www.sollet.io/',
        'Solflare': 'https://solflare.com/onboard',
        'Torus': 'https://solana.tor.us/'
      }
    }
  },
  computed: {
    truncatedAddress () {
      return this.address.length >= 32
        ? this.address.slice(0, 3) + '...' + this.address.slice(-3)
        : 'INVALID'
    },
    stakingStatus (): String { // Used for connection status after indicator
      if (!this.connected) {
        return 'Not Connected'
      }

      if (this.unstaked < this.actualStakingCost && !this.hasAccess) {
        return 'Needs ACS'
      }

      return this.hasAccess ? 'Access Unlocked' : 'Staking not met'
    },
    actualStakingCost (): number {
      return this.minimumStake + (this.minimumStake * 0.01)
    },
    connectionIndicator (): String { // Used for the circle indicator state
      if (!this.connected) {
        return 'notConnected'
      }

      if (this.unstaked < this.actualStakingCost && !this.hasAccess) {
        return 'insufficient'
      }

      return this.hasAccess ? 'hasAccess' : 'noAccess'
    },
    insufficientGas () {
      return this.gas < 0.0004
    }
  }
}
