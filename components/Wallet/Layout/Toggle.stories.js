import Toggle from '@/components/Wallet/Layout/Toggle.vue'

export default {
  title: 'Web3/Wallet/Layout/Toggle',
  component: Toggle,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { Toggle },
  props: Object.keys(argTypes),
  template: `
    <div>
      <Toggle v-bind="$props" />
    </div>
  `
})

const NoClaim = (_args, { argTypes }) => ({
  components: { Toggle },
  props: Object.keys(argTypes),
  template: `
    <div>
      <Toggle v-bind="$props" />
    </div>
  `
})

export const toggle = Template.bind({})
toggle.args = {
  claimable: 11,
  pills: ['Stake', 'Claim', 'Unstake'],
  selected: 'Stake',
  hasAccess: true
}
