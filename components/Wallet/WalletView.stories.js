import WalletView from '@/components/Wallet/WalletView.vue'
import text from '@/components/Wallet/mockText'

export default {
  title: 'Web3/Wallet/View',
  component: WalletView,
  argTypes: {
    error: {
      options: ['', 'YOU ARE POOR', 'User has rejected this transaction'],
      control: { type: 'radio' }
    },
    unstaked: {
      options: [0, 10, 1000],
      control: { type: 'radio' }
    },
    minimumStake: {
      options: [0, 10, 1000],
      control: { type: 'radio' }
    },
    claimable: {
      options: [0, 10, 1000],
      control: { type: 'radio' }
    },
    staked: {
      options: [0, 10, 1000],
      control: { type: 'radio' }
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { WalletView },
  props: Object.keys(argTypes),
  template: `
      <div>
        <WalletView v-bind="$props" />
      </div>
    `
})

export const view = Template.bind({})
view.args = {
  address: text.header.walletAddress,
  isConnected: true,
  hasAccess: true,
  loading: false,
  unstaked: 1,
  staked: 10,
  claimable: 10
}

export const viewBelowThreshold = Template.bind({})
viewBelowThreshold.args = {
  address: text.header.walletAddress,
  isConnected: true,
  hasAccess: false,
  loading: false,
  unstaked: 10,
  staked: 0,
  claimable: 0
}

export const viewNoTokens = Template.bind({})
viewNoTokens.args = {
  address: text.header.walletAddress,
  isConnected: true,
  hasAccess: true,
  loading: false,
  unstaked: 0,
  staked: 1000,
  claimable: 0
}

export const viewWebWallet = Template.bind({})
viewWebWallet.args = {
  address: text.header.walletAddress,
  walletName: 'Solflare',
  isConnected: true,
  hasAccess: true,
  loading: false,
  unstaked: 0,
  staked: 1000,
  claimable: 0
}



export const viewNoRewards = Template.bind({})
viewNoRewards.args = {
  address: text.header.walletAddress,
  isConnected: true,
  hasAccess: true,
  loading: false,
  unstaked: 10,
  staked: 1000,
  claimable: 0
}

export const viewSpinning = Template.bind({})
viewSpinning.args = {
  address: text.header.walletAddress,
  isConnected: true,
  hasAccess: true,
  loading: true,
  unstaked: 0,
  staked: 10000,
  claimable: 10
}

export const viewError = Template.bind({})
viewError.args = {
  address: text.header.walletAddress,
  isConnected: true,
  hasAccess: true,
  loading: false,
  unstaked: 0,
  staked: 10000,
  claimable: 10
}
