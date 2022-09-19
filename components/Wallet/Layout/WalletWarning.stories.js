import Warning from '@/components/Wallet/Layout/WalletWarning.vue'

export default {
  title: 'Web3/Wallet/Layout/Warning',
  component: Warning,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Warning },
  props: Object.keys(argTypes),
  template: `
    <div>
      <Warning v-bind="$props" />
    </div>
  `
})

export const warning = Template.bind({})
warning.args = {
  text: 'This is a warning. You are poor. You cannot afford ACCS tokens. Go back to ETH. Or worse.. Cardano..'
}
