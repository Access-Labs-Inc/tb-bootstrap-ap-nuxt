
import { reactive, watch } from 'vue-demi'
import { sign } from 'tweetnacl'
import bs58 from 'bs58'
import {
  SET_ADDRESS,
  SET_WALLET_CONNECTION,
  SET_LOADING,
  SET_PUBLIC_KEY,
  SET_CONNECTION_STATE,
  SET_SEND_TRX,
  SET_GAS_BALANCE,
  IS_OPEN,
  SET_EAGERLY_CONNECTED,
  SET_WALLET_NAME,
  GUIDING_USER,
  START_POLLING,
  CLEAR_POLLING
} from './types'
import { getSOLBalance } from '@/services/solana'

export default {

  // Runs when the plugin is initialized, fetches and and initializes all wallet-related objects
  async init ({ commit, dispatch, rootGetters }) {
    const connection = rootGetters['program/connection']
    const { connected, publicKey, sendTransaction } = this.app.$wallet
    const walletState = reactive({ connected, publicKey, sendTransaction })

    const walletName = localStorage.getItem('walletName')
    walletName && commit(SET_WALLET_NAME, walletName)

    commit(SET_EAGERLY_CONNECTED, !!walletName)

    commit(SET_WALLET_CONNECTION, connection)
    commit(SET_CONNECTION_STATE, connected.value)
    commit(SET_SEND_TRX, sendTransaction)

    if (connected.value && publicKey.value) {
      commit(SET_ADDRESS, publicKey.value.toString())
      commit(SET_PUBLIC_KEY, publicKey.value)
    }

    watch(walletState, ({ connected, publicKey }) => {
      commit(SET_CONNECTION_STATE, connected)
      if (connected && publicKey) {
        commit(SET_ADDRESS, publicKey.toString())
        commit(SET_PUBLIC_KEY, publicKey)
      }

      if (connected && publicKey) {
        dispatch('loadAccount')
      }
    }, {
      deep: true,
      flush: 'post'
    })

    if (connected.value && publicKey.value && sendTransaction) {
      dispatch('loadAccount')
    }
  },

  // Fetch all necessary user data by dispatching actions to other store modules
  async loadAccount ({ commit, dispatch, rootGetters, state }): Promise<any> {
    commit(SET_LOADING)

    const { connected: isConnected, pubKey: publicKey, address } = state
    const connection = rootGetters['program/connection']

    if (!publicKey || !isConnected) {
      commit(SET_LOADING)
      return
    }

    const walletName = localStorage.getItem('walletName')
    walletName && commit(SET_WALLET_NAME, walletName)

    dispatch('startPolling')

    await dispatch('fetchGasBalance', {
      connection,
      publicKey
    })

    await dispatch('pools/getPoolData', {
    }, {
      root: true
    })

    const { balance } = await dispatch('pools/getTokenBalances', {
    }, {
      root: true
    })

    const [stakeKey, stakeAccount] = await dispatch('pools/getStakeAccount', {}, {
      root: true
    })

    const [hasAccess, totalStaked] = await dispatch('pools/getStakeState', {}, {
      root: true
    })

    if (!balance.toNumber() && !totalStaked.toNumber()) {
      commit(SET_LOADING)
      return
    }

    if (!stakeAccount && !totalStaked.toNumber()) {
      console.error('No Stake account')
      commit(SET_LOADING)
      return
    }

    await dispatch('pools/getRewardsBalance', {}, {
      root: true
    })

    commit(SET_LOADING)
  },

  // Allow the wallet dropdown to be forced open with vuex
  forceOpen ({ commit }, toggle) {
    commit(IS_OPEN, toggle)
  },

  // Global state used to determine if a user is in a modal
  guiding ({ commit }) {
    commit(GUIDING_USER)
  },

  // We poll the window's publickey for updates, this is for the wallet 'hot swap' functionality' that users can do with Phantom.
  startPolling ({ commit, state, dispatch }) {
    const { walletName } = state
    const { select: selectWallet } = this.app.$wallet

    if (walletName !== 'Phantom') { // Solflare doesn't work reliably, the other ones cant hotswap
      return
    }
    commit(START_POLLING, async () => {
      const currentKey = window.solana.publicKey.toString()

      if (currentKey !== state.address && window.solana.isPhantom) {
        await dispatch('disconnectWallet')
        selectWallet(walletName)
      }
    })
  },

  // Stub method, but ideally we can 'reinstall' the adapters and see if a user has installed the chrome extension for their wallet.
  reinstallAdapters ({ commit, state }) {
    this.app.$reinstallWallet()
  },

  async disconnectWallet ({ commit, dispatch }): Promise<any> {
    commit(SET_LOADING)
    await this.app.$wallet.disconnect()
    commit(SET_ADDRESS, '')
    commit(SET_WALLET_CONNECTION, undefined)
    commit(SET_PUBLIC_KEY, undefined)
    commit(SET_CONNECTION_STATE, undefined)
    commit(SET_LOADING)
    commit(SET_EAGERLY_CONNECTED, false)
    commit(CLEAR_POLLING)
    dispatch('pools/resetPool', {}, { root: true })
    localStorage.removeItem('wallet-reconnect')
  },

  // Used to see whether a user has enough SOL to interact with stuff.
  async fetchGasBalance ({ commit }, { connection, publicKey }): Promise<number> {
    const balance = await getSOLBalance(connection, publicKey)
    commit(SET_GAS_BALANCE, balance)
    return balance
  },
}
