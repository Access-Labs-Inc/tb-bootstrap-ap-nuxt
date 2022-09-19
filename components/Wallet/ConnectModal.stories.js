import ConnectModal from './ConnectModal.vue'

const accessText = "To get unlimited Access to The Block please connect a web3 compatible wallet below. If you don't have a web3 wallet you can also use the button below to create a new wallet."
const explanationText = "The Block is now using web3 for login to enable Access to exclusive content you can't find anywhere else. Getting full Access to The Block's content is as easy as connecting a web3 wallet and staking ACS with The Block. To get started click the button above"

export default {
  title: 'Web3/Modal',
  components: { ConnectModal }
}

const Template = (_args, { argTypes }) => ({
  components: { ConnectModal },
  props: Object.keys(argTypes),
  template: `
    <div>
      <ConnectModal v-bind="$props" />
    </div>
  `
})

export const modal = Template.bind({})
modal.args = { accessText, explanationText }
