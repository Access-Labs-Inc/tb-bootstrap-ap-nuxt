import { Connection, PublicKey } from '@solana/web3.js'
import {
  SET_ADDRESS,
  SET_CONNECTION_STATE,
  SET_PUBLIC_KEY,
  SET_WALLET_CONNECTION,
  SET_GAS_BALANCE,
  TOGGLE_WALLET_ACCESS,
  SET_LOADING,
  FIRST_ATTEMPT,
  SET_SEND_TRX,
  IS_OPEN,
  SET_EAGERLY_CONNECTED,
  SET_WALLET_NAME,
  GUIDING_USER,
  START_POLLING,
  CLEAR_POLLING
} from './types'
const PUBLIC_KEY_POLLING_RATE = 750

import { Wallet } from './state'

export default {
  [SET_ADDRESS] (state: Wallet, address: string) {
    state.address = address
  },

  [SET_WALLET_CONNECTION] (state: Wallet, connection: Connection) {
    state.connection = connection
  },

  [SET_PUBLIC_KEY] (state: Wallet, pubKey: PublicKey) {
    state.pubKey = pubKey
  },

  [START_POLLING] (state: Wallet, callback: Function) {
    state.pubKeyPoll = setInterval(() => {
      if (callback) {
        callback()
      }
    }, PUBLIC_KEY_POLLING_RATE)
  },

  [CLEAR_POLLING] (state: Wallet) {
    clearInterval(state.pubKeyPoll)
    state.pubKeyPoll = 0
  },

  [SET_GAS_BALANCE] (state: Wallet, balance: number) {
    state.gas = balance
  },

  [SET_CONNECTION_STATE] (state: Wallet, connectionState: boolean) {
    state.connected = connectionState
  },

  [TOGGLE_WALLET_ACCESS] (state: Wallet) {
    state.connected = !state.connected
  },

  [SET_LOADING] (state: Wallet) {
    state.loading = !state.loading
  },

  [SET_SEND_TRX] (state, fn) {
    state.sendTrx = fn
  },

  [IS_OPEN] (state: Wallet, isOpen: boolean) {
    state.walletViewOpen = isOpen
  },

  [GUIDING_USER] (state: Wallet, guiding: boolean) {
    state.guiding = !state.guiding
  },

  [SET_WALLET_NAME] (state: Wallet, name: string) {
    state.walletName = name
  },

  [SET_EAGERLY_CONNECTED] (state: Wallet, wasEager: Boolean) {
    state.eagerlyConnected = wasEager
  }
}
