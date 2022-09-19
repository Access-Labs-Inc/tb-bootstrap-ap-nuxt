import Unstake from './Unstake'
import text from '@/components/Wallet/mockText'

export default {
  title: 'Web3/Wallet/Actions/Unstake',
  component: Unstake,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Unstake },
  props: Object.keys(argTypes),
  template: '<Unstake v-bind="$props" />'
})

export const unstake = Template.bind({})
unstake.args = {
  text: text.buttonText.unstake
}
