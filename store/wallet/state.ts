import { Connection, PublicKey } from "@solana/web3.js"

export interface Wallet {
  address: String,
  pubKeyPoll: number,
  sendTrx: Function,
  connected: Boolean,
  guiding: Boolean,
  eagerlyConnected: Boolean,
  connection?: Connection,
  pubKey?: PublicKey,
  gas: Number,
  access: Boolean,
  loading: Boolean,
  walletName: String,
  walletViewOpen: Boolean
}

export default (): Wallet => ({
  address: '',
  pubKeyPoll: 0,
  sendTrx: () => ({}),
  connected: false,
  guiding: false,
  eagerlyConnected: false,
  connection: {},
  pubKey: {},
  gas: 0,
  access: false,
  loading: false,
  walletName: '',
  walletViewOpen: false
})
