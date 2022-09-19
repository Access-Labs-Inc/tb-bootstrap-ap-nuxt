import Pill from './Pill'

export default {
  title: 'Web3/Wallet/Layout/Pill',
  component: Pill,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Pill },
  props: Object.keys(argTypes),
  template: '<Pill v-bind="$props" />'
})

export const pill = Template.bind({})
pill.args = {
  text: 'Claim'
}
