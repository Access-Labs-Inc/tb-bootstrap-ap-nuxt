export default {
  computed: {
    buttonText (): String {
      return this.connected ? 'Stake Tokens' : 'Connect Wallet'
    },
    paywallHeadline (): String {
      return 'Stake ACS with The Block to Read This Feature'
    },
    paywallSubHeadline (): String {
      return 'Once You\'re In, You\'re In!'
    },
    paywallMessages (): Object {
      return {
        message: 'In order to read this feature you must connect a web3 wallet and have a certain amount of ACS (Access Protocol) staked with The Block. Start by connecting your wallet below. If you don\'t have a web3 wallet you can also use the button below to create one.',
        unlimited: 'Once you meet the staking requirement, you will get unlimited access to content The Block when your wallet is connected. Once you\'re in, you\'re in! However, if you choose to unstake ACS from The Block you may be subject to new staking requirements.',
        confused: 'Still confused? You can read more about Access <a href=https://accessprotocol.co>here</a>.'
      }
    },
    paywallSteps (): Object {
      return {
        step1: {
          title: 'Connect a Wallet',
          description: 'Use the button below to connect a web3 compatible wallet to The Block. If you don\'t currently have a wallet you can use the prompt to create one.'
        },
        step2: {
          title: 'Add ACS',
          description: 'You will need to have ACS in your connected wallet. You can do this on any exchange that supports ACS or you can use the button below.'
        },
        step3: {
          title: 'Stake ACS with The Block',
          description: 'Once you have ACS in your connected wallet you then need to stake at least a minimum of 20,000 ACS with The Block. '
        },
        step4: {
          title: 'Unlock Access Content on The Block',
          description: 'Once you meet the staking requirement, you will unlock Access content The Block. Once you\'re in, you\'re in! However, if you choose to unstake ACS from The Block you may need to meet new staking requirements.'
        }
      }
    },
    paywallButton (): Object {
      return {
        connected: 'See What You\'re Missing!',
        notConnected: 'Connect Wallet'
      }
    }
  }
}
