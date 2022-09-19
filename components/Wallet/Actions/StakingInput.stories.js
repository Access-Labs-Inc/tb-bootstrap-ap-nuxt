import StakingInput from './StakingInput.vue'
import text from '@/components/Wallet/mockText'

export default {
  title: 'Web3/Wallet/Actions/Input',
  components: { StakingInput },
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { StakingInput },
  props: Object.keys(argTypes),
  template: '<StakingInput v-bind="$props" />'
})

export const input = Template.bind({})
input.args = {
  unstaked: 2500,
  minimumStake: 1000,
  stakingError: ''
}
