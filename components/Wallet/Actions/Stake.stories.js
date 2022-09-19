import Stake from './Stake'
import Input from './StakingInput'
import WalletSection from '@/components/Wallet/Layout/WalletSection.vue'
import text from '@/components/Wallet/mockText'

export default {
  title: 'Web3/Wallet/Actions/Stake',
  component: Stake,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Stake, Input, WalletSection },
  props: Object.keys(argTypes),
  template: '<Stake v-bind="$props" />'
})

export const stake = Template.bind({})
stake.args = {
  minimumStake: 1000,
  unstaked: 2500
}
