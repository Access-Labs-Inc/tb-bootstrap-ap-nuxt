import Claim from './Claim'

export default {
  title: 'Web3/Wallet/Actions/Claim',
  component: Claim,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Claim },
  props: Object.keys(argTypes),
  template: '<Claim v-bind="$props" />'
})

export const claim = Template.bind({})
claim.args = {
  claimable: 69
}
