const text = {
    warningText: {
        validation: 'Warning validation message.',
        minimum: 'Minimum 10,000 ACS to unlock content.',
        insufficient: 'Insufficient balance for staking.',
        fees: '+ Protocol Fee: 10 ACS\n' + '+ Transaction Fee: 0.00005 SOL - 0.00004 SOL',
        unstake: 'Unstaking may lose access to content on The Block'
    },
    statusIndicator: {
        notMet: 'Threshold Not Met',
        met: 'Access Unlocked',
        stakingNotMet: 'Staking Not Met'
    },
    assetBalance: {
        label: 'label',
        balance: 99999,
        unstaked: 'Unstaked',
        fiveGrand: 5000,
        yourStaked: 'Your Stake',
        _13Grand: 13000,
        claimable: 'Claimable',
        mockPrice: '14.25',
        zeroBalance: 0,
        tenGrand: 10000,
        available: 'available',
    },
    unlockAmount: 5000,
    buttonText: {
        add: 'Add ACS',
        stake: 'Stake ACS',
        unstake: 'Unstake',
        unstakeAccess: 'Unstake on Access',
        read: 'Read Access Content',
        claimRewards: 'Claim Rewards',
        claim: 'Claim'
    },
    header: {
        main: 'Header',
        extra: 'Extra Details',
        wallet: 'Your Wallet',
        disconnect: 'Disconnect',
        rewards: 'Rewards',
        learn: `<a href="https://www.theblock.co/">Learn More</a>`,
        staking: 'Staking',
        unlockAmount: '7,000 more to unlock',
        walletAddress: 'EsYT3zHuHmCiet9be2Et5eHEFy4C6ZNjWEifKQK6gy7V',
        stake: 'Stake',
        claim: 'Claim'
    },
    staking: {
        min: 'Min',
        max: 'Max'
    },
    toggle: {
        stake: 'Stake',
        claim: 'Claim',
        unstake: 'Unstake'
    },
    paywallMessages:  {
        message: 'In order to read this feature you must connect a web3 wallet and have a certain amount of ACS (Access Protocol) staked with The Block. Start by connecting your wallet below. If you don\'t have a web3 wallet you can also use the button below to create one.',
        unlimited: 'Once you meet the staking requirement, you will get unlimited access to content The Block when your wallet is connected. Once you\'re in, you\'re in! However, if you choose to unstake ACS from The Block you may be subject to new staking requirements.',
        confused: `Still confused? <a href="https://www.theblock.co">You can read more about Access here</a>.`
    },
    paywallSteps:  {
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
    },
    paywallHeadline: 'Stake ACS with The Block to Read This Feature',
    paywallSubHeadline: 'Once You\'re In, You\'re In!', 
}

export default text
