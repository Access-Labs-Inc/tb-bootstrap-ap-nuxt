import Section from '@/components/Wallet/Layout/WalletSection'

export default {
  title: 'Web3/Wallet/Layout/Section',
  component: Section,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Section },
  props: Object.keys(argTypes),
  template: `
      <div>
      <Section v-bind="$props" />
      </div>
    `
})

export const section = Template.bind({})
section.args = {
  main: 'Your Address',
  extra: 'Learn More',
  label: 'Your Balance',
  balance: 69
}
