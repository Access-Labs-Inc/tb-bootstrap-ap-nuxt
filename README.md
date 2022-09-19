# bootstrap-ap-nuxt

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# .environment variables
$ cp .env.defaults .env
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## What is this?

This is a Nuxt app intended to bootstrap your development with Nuxt on Access Protocol.

## How does this work?

It starts with the [solana-wallets-vue](https://github.com/TheBlockCrypto/bootstrap-ap-nuxt/blob/main/plugins/solana-wallets-vue.client.ts) client side plugin. The plugin installs all of our desired [wallet adapters ](https://www.npmjs.com/package/@solana/wallet-adapter-wallets) and [initializes the global wallet state](https://github.com/TheBlockCrypto/bootstrap-ap-nuxt/blob/main/components/wallets-vue/index.ts).

The state is implemented in [createWalletStore.ts](https://github.com/TheBlockCrypto/bootstrap-ap-nuxt/blob/main/components/wallets-vue/createWalletStore.ts) which is a port from [solana-wallets-vue](https://github.com/lorisleiva/solana-wallets-vue/blob/main/src/createWalletStore.ts) with some tweaks made to make it compatible with Vue 2 and Nuxt Bridge. 

Once that state is intialized, the [`wallet` store ](https://github.com/TheBlockCrypto/bootstrap-ap-nuxt/blob/main/store/wallet/actions.ts) watches it using `vue-demi` to be forward compatible with the Vue 3 context used in `createWalletStore`. 

## Store Directory

### Wallet Actions

This is the first store module that gets called. 

##### init
On a successful connect, it dispatches all the necessary actions to fetch the wallet's balances and accounts. 

On launch, this store sets up a [watch](https://github.com/TheBlockCrypto/theblock.co/blob/start-bagel-stories/store/wallet/actions.ts#L50) on the connected state and publicKey, both of which are handled by `createWalletStore`. 

##### loadAccount 
Fetches all necessary user data by dispatching actions to other store modules.

##### forceOpen
Forces the wallet dropdown's open/closed state.

##### guiding
Sets the state to determine if a user currently has the wallet dropdown open.

##### startPolling
Polls the window's publickey. This is used for listening to wallet 'hot swaps'
* * *
### Pools Actions

A collection of actions that are called from wallet. These vuex actions call [access-protocol services](https://github.com/TheBlockCrypto/bootstrap-ap-nuxt/tree/main/services/access) and set the data, with occasional safety checks.

### Program Actions

A central state to can call the access program. This gives the app a safe and reliable program to interact with, rather than having a potentially mutable instance that could cause issues.
