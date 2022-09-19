import WalletConnection from '@/components/Wallet/WalletConnection.vue'
import text from '@/components/Wallet/mockText'

export default {
  title: 'Web3/Wallet/Connection',
  component: WalletConnection,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { WalletConnection },
  props: Object.keys(argTypes),
  template: `
      <div>
        <WalletConnection v-bind="$props" />
      </div>
    `
})

export const connection = Template.bind({})
connection.args = {
  walletConnected: true,
  walletAddress: text.header.walletAddress,
  hasAccess: true,
  loading: false,
  unstaked: 0,
  staked: 10000,
  claimable: 10
}
