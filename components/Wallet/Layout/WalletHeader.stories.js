import text from '@/components/Wallet/mockText'
import WalletHeader from '@/components/Wallet/Layout/WalletHeader'
import AccessLogo from '@/components/Bagel/IconsLogos/AccessLogo'
import ConnectStatusIndicator from '@/components/Bagel/UiComponents/ConnectStatusIndicator' // TODO: REPLACE WITH WALLET/LAYOUT PATH

export default {
  title: 'Web3/Wallet/Layout/Header',
  component: WalletHeader,
  parameters: {
    backgrounds: {
      default: 'Access Protocol'
    }
  }
}

const Template = (_args, { argTypes }) => ({
  components: { WalletHeader, AccessLogo, ConnectStatusIndicator },
  props: Object.keys(argTypes),
  template: `
      <div>
      <WalletHeader v-bind="$props">
          <AccessLogo />
          <ConnectStatusIndicator v-bind="$props" />
      <WalletHeader/>
      </div>
    `
})

export const headerNoAccess = Template.bind({})
headerNoAccess.args = {
  statusIndicator: text.statusIndicator.notMet
}

export const headerWithAccess = Template.bind({})
headerWithAccess.args = {
  statusIndicator: text.statusIndicator.met
}
