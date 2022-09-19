import { install } from 'vue-demi'
import SolanaWallets from '@/components/wallets-vue/index'

install()
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
  } from '@solana/wallet-adapter-wallets'

export const walletOptions = {
    wallets: [
      new TorusWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: 'devnet' }),
      new SolletWalletAdapter({ network: 'devnet' }),
      new SolletExtensionWalletAdapter({ network: 'devnet' }),
    ],
    autoConnect: true,
}

export default async ({ app }) => {
    SolanaWallets.install(app, walletOptions)
}




