import { Wallet } from './state'

export default {
  address: (state: Wallet) => state.address ?? '',
  sendTrx: (state) => state.sendTrx,
  publicKey: (state: Wallet) => state.pubKey ?? {},
  connection: (state: Wallet) => state.connection ?? {},
  gas: (state: Wallet) => state.gas ?? 0,
  isConnected: (state: Wallet) => state.connected ?? false,
  guiding: (state: Wallet) => state.guiding ?? false,
  hasAccess: (state: Wallet) => state.access ?? false,
  loading: (state: Wallet) => state.loading ?? false,
  forcedOpen: (state: Wallet) => state.walletViewOpen ?? false,
  walletName: (state: Wallet) => state.walletName ?? '',
  wasEager: (state: Wallet) => state.eagerlyConnected
}
