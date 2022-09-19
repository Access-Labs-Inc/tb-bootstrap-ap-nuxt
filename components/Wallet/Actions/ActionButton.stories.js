import ActionButton from './ActionButton'
import text from '@/components/Wallet/mockText'

export default {
  title: 'Web3/Wallet/Layout/Button',
  component: ActionButton,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { ActionButton },
  props: Object.keys(argTypes),
  template: '<ActionButton v-bind="$props" />'
})

export const button = Template.bind({})
button.args = {
  text: text.buttonText.stake
}
