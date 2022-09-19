import Vue from 'vue'
import { useWallet } from '@/components/wallets-vue/useWallet'
import { watch } from 'vue-demi'

export default Vue.extend({
  data () {
    return {
      showProfile: false,
      showWalletModal: false,
      showConnectModal: false,
    }
  },
  watch: {
    connected (newVal, oldVal) {
      if (this.checkFirstConnection() && (!oldVal && newVal)) { // On first ever successful connection
        localStorage.setItem('firstAttempt', false)

        this.showProfile = false
        this.$emit('guiding')
      }
      this.showConnectModal = false
      this.$emit('guiding')
    },
    forcedOpen (toggle: Boolean) {
      this.showProfile = toggle
    }
  },
  mounted () {
    const { showModal } = useWallet()
    watch(showModal, (toOpen) => {
      toOpen && this.guideModalConnect()
    })
  },
  methods: {
    guideModalConnect() {
      this.showConnectModal = false
      this.showWalletModal = true
    },
    checkFirstConnection (): Boolean {
      return localStorage.getItem('firstAttempt')
        ? JSON.parse(localStorage.getItem('firstAttempt'))
        : true
    },
    guidedStake (toStake: number): void {
      this.$emit('stake', toStake)
      this.showProfile = !this.showProfile
    },
    articleGuide (): void {
      if (!this.connected) { // In article, when user is following the steps
        this.showConnectModal = true
        return
      }
      this.$emit('forceOpen', !this.forcedOpen)
    }
  }
})
