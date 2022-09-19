import { App, isVue2, isVue3 } from 'vue-demi'
import { WalletStoreProps } from './createWalletStore'
import { initWallet, useWallet } from './useWallet'
import { walletOptions } from '@/plugins/solana-wallets-vue.client'

export * from './components'
export * from './createWalletStore'
export * from './errors'
export * from './useAnchorWallet'
export * from './useWallet'

export default {
  install: (app: App, options: WalletStoreProps = {}) => {
    console.log({ isVue2, isVue3 })
    initWallet(options)
    let walletStore = useWallet()

    if (isVue3) {
      app.config.globalProperties.$wallet = walletStore
    } else {
      Object.defineProperties((app as any), {
        $wallet: {
          get: function() {
            return walletStore
          }
        },
        $reinstallWallet: {
          value: function() {
            console.log('Reinstalling')
            initWallet(walletOptions)
            walletStore = useWallet()
          }
        }
      })
    }
  },
}
