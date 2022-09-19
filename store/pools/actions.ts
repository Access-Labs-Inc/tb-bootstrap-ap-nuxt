import { PublicKey } from '@solana/web3.js'
import {
  SET_POOL_ID,
  SET_MINIMUM_STAKE_AMOUNT,
  SET_USER_BALANCE,
  SET_STAKED_AMOUNT,
  RESET_POOL,
  SET_STAKE_ACCOUNT,
  SET_POOL_DATA,
  SET_LOADING,
  RESET_INDICATORS,
  SET_RPC_ERROR,
  SET_REWARD_AMOUNT,
  SET_STAKE_KEY,
  SET_STAKER_ATA,
  SET_HAS_ACCESS,
  SET_INDICATOR_STATUS,

  ACCOUNT_CREATING,
  ACCOUNT_CREATED,
  ACCOUNT_CHECKING,
  ACCOUNT_FOUND,
  REWARDS_CLAIMING,
  REWARDS_CLAIMED,
  STAKE_STAKING,
  STAKE_STAKED,
  ERROR_MESSAGE
} from './types'
import { Stake } from '@/types/web3/solana/Staking'

import { fetchUser, UserData } from '@/services/access/user'
import {
  getPoolData,
  getStakeAccount,
  createAccessStakeAccount,
  claimAccessRewards,
  stakeToPool,
  getAssociatedTokenAddressAndAccount,
  createAssociatedTokenAccountInstruction,
  calculateRewardForStaker,
  getUserStakeState
} from '~/services/access/pools'

export default {
  async init ({ commit }): Promise<any> {
    const { ACCESS_POOL_ID } = this.app.$config

    if (!ACCESS_POOL_ID) {
      console.error(`Could not init pool:${ACCESS_POOL_ID}`)
      return {
        programID: ''
      }
    }

    const poolId = new PublicKey(ACCESS_POOL_ID)

    commit(SET_POOL_ID, poolId)

    return {
      poolId
    }
  },

  async getPoolData( {commit, state, rootGetters} ) {
    const { pool } = await getPoolData(rootGetters['program/connection'], state.poolID)
    const { minimumStakeAmount } = pool

    commit(SET_POOL_DATA, pool)
    commit(SET_MINIMUM_STAKE_AMOUNT, minimumStakeAmount)
  },

  async getTokenBalances ({ commit, rootGetters }): Promise<UserData> {
    const userData = await fetchUser(rootGetters['program/connection'], rootGetters['wallet/publicKey'], rootGetters['program/centralState'])
    const { balance } = userData

    commit(SET_USER_BALANCE, balance)

    return userData
  },

  async getStakeState({ commit, state, rootGetters}) {
    const stakeState = await getUserStakeState(
      rootGetters['program/connection'],
      rootGetters['wallet/publicKey'],
      rootGetters['program/programId'],
      state.poolID,
      state.stakeAccount,
      state.data
    )

    const [hasAccess, totalStaked] = stakeState

    commit(SET_HAS_ACCESS, hasAccess)
    commit(SET_STAKED_AMOUNT, totalStaked)

    return stakeState
  },

  async getStakeAccount({ commit, state, rootGetters }) {
    const [stakeKey, stakeAccount, error] = await getStakeAccount(
      rootGetters['program/connection'],
      rootGetters['wallet/publicKey'],
      rootGetters['program/programId'],
      state.poolID
    )

    if (!stakeAccount) {
      console.log(error.message)
      return [null, null]
    }

    commit(SET_STAKE_ACCOUNT, stakeAccount)
    commit(SET_STAKE_KEY, stakeKey)

    return [stakeKey, stakeAccount]
  },


  async createStakeAccount( { commit, state, rootGetters }) : Promise<any> {
    commit(SET_INDICATOR_STATUS, {
      name: 'accountCheck',
      status: 'loading',
      text: ACCOUNT_CREATING
    })
    const [stakeKey, stakeAccount] = await createAccessStakeAccount(
      rootGetters['program/mutableConnection'],
      rootGetters['wallet/publicKey'],
      rootGetters['program/programId'],
      state.poolID,
      rootGetters['wallet/sendTrx']
    )
    commit(SET_STAKE_ACCOUNT, stakeAccount)
    commit(SET_STAKE_KEY, stakeKey)
    commit(SET_INDICATOR_STATUS, {
      name: 'accountCheck',
      status: 'fulfilled',
      text: ACCOUNT_CREATED
    })
    return [stakeKey, stakeAccount]
  },

  async findOrCreateStakeAccount({ dispatch }) {
    let [stakeKey, stakeAccount] = await dispatch('getStakeAccount')
    if (!stakeAccount) {
      return await dispatch('createStakeAccount')
    }
    return [stakeKey, stakeAccount]
  },

  async findOrCreateAssociatedTokenAddressAndAccountAndTransaction( { commit, rootGetters }): Promise<any> {
    const [stakerAta, stakerAtaAccount] = await getAssociatedTokenAddressAndAccount(
      rootGetters['program/mutableConnection'],
      rootGetters['wallet/publicKey'],
      rootGetters['program/centralState']
    )

    if (!stakerAtaAccount) {
      return [
        stakerAta,
        null,
        createAssociatedTokenAccountInstruction(rootGetters['program/centralState'], stakerAta, rootGetters['wallet/publicKey'])
      ]
    }

    commit(SET_STAKER_ATA, {
      stakerAta,
      stakerAtaAccount
    })

    return [stakerAta, stakerAtaAccount, null]
  },

  async getRewardsBalance ({ commit, state }) {
    const { SECONDS_IN_DAY } = this.app.$config
    const { stakeAccount, data } = state

    if (!stakeAccount.owner || (!(stakeAccount.stakeAmount?.toNumber() > 0 && stakeAccount.lastClaimedTime < data.lastCrankTime))) {
      console.log('No Rewards')
      commit(SET_REWARD_AMOUNT, 0)
      return 0
    }
    try {
      const reward = await calculateRewardForStaker(
        state.stakeAccount.lastClaimedTime,
        state.data,
        state.stakeAccount.stakeAmount,
        SECONDS_IN_DAY
      )
      commit(SET_REWARD_AMOUNT, reward)
      return reward
    } catch (e) {
      console.log(e.message)
      return null
    }
  },

  async claimRewards({ commit, dispatch, rootGetters }): Promise<any> {
    const [stakeKey] = await dispatch('findOrCreateStakeAccount')
    const [stakerAta] = await dispatch('findOrCreateAssociatedTokenAddressAndAccountAndTransaction')

    dispatch('setLoading')
    try {
      commit(SET_INDICATOR_STATUS, {
        name: 'claimRewards',
        status: 'loading',
        text: REWARDS_CLAIMING
      })

      await claimAccessRewards(
        rootGetters['program/mutableConnection'],
        rootGetters['wallet/publicKey'],
        stakeKey,
        stakerAta,
        rootGetters['program/programId'],
        rootGetters['wallet/sendTrx']
      )

      commit(SET_REWARD_AMOUNT, 0)
      commit(SET_INDICATOR_STATUS, {
        name: 'claimRewards',
        status: 'loading',
        text: REWARDS_CLAIMED
      })
    } catch (e) {
      console.trace()
      dispatch('handleError', e.error || e)
    }
    dispatch('setLoading')
    return
  },

  async stake({ commit, rootGetters }, { batchTransactions, stakeKey, stakerAta, stakeAmount }): Promise<any> {
    commit(SET_INDICATOR_STATUS, {
      name: 'stakeStatus',
      status: 'loading',
      text: STAKE_STAKING
    })
    await stakeToPool(
      rootGetters['program/mutableConnection'],
      rootGetters['wallet/publicKey'],
      stakeKey,
      stakerAta,
      stakeAmount,
      batchTransactions,
      rootGetters['program/programId'],
      rootGetters['wallet/sendTrx']
    )
    commit(SET_INDICATOR_STATUS, {
      name: 'stakeStatus',
      status: 'fulfilled',
      text: STAKE_STAKED
    })
  },

  async getAccountsAndClaimRewardsAndStakeToPool({commit, dispatch, state, rootGetters}, stakeAmount): Promise<any> {
    dispatch('setLoading')
    dispatch('setError', '')
    try {
      commit(SET_INDICATOR_STATUS, {
        name: 'accountCheck',
        status: 'loading',
        text: ACCOUNT_CHECKING
      })
      const batchTransactions = []
      const [stakeKey, stakeAccount] = await dispatch('findOrCreateStakeAccount')
      const [stakerAta, stakerAtaAccount, stakerAtaAccountTrx] = await dispatch('findOrCreateAssociatedTokenAddressAndAccountAndTransaction')

      if (stakerAtaAccountTrx) {
        batchTransactions.push(stakerAtaAccountTrx)
      }
      commit(SET_INDICATOR_STATUS, {
        name: 'accountCheck',
        status: 'fulfilled',
        text: ACCOUNT_FOUND
      })

      if (stakeAccount && stakeAccount.stakeAmount.toNumber() > 0 && stakeAccount.lastClaimedTime < state.data.lastCrankTime) {
        commit(SET_INDICATOR_STATUS, {
          name: 'claimRewards',
          status: 'loading',
          text: REWARDS_CLAIMING
        })
        await claimAccessRewards(
          rootGetters['program/mutableConnection'],
          rootGetters['wallet/publicKey'],
          stakeKey,
          stakerAta,
          rootGetters['program/programId'],
          rootGetters['wallet/sendTrx']
        )
        commit(SET_INDICATOR_STATUS, {
          name: 'claimRewards',
          status: 'fulfilled',
          text: REWARDS_CLAIMED
        })
      }

      await dispatch('stake', {
        batchTransactions,
        stakeKey,
        stakerAta,
        stakeAmount
      })

      await dispatch('getStakeAccount')
      dispatch('getTokenBalances')
      dispatch('setLoading')
      dispatch('getStakeState')
      dispatch('wallet/auth', rootGetters['wallet/publicKey'], {
        root: true
      })
    } catch (e) { // Standard phantom error codes from https://docs.phantom.app/integrating/errors
      console.trace()
      await dispatch('handleError', e.error || e)
      dispatch('setLoading')
      return
    }
  },

  async handleError({ commit, dispatch, state }: { commit: any, dispatch: any, state: Stake }, error: Error) {
    const name = Object.keys(state.indicators).find((key) => state.indicators[key].status === 'loading')
    commit(SET_INDICATOR_STATUS, {
      name,
      status: 'error',
      text: ERROR_MESSAGE
    })

    setTimeout(() => {
      dispatch('setError', error.message)
      commit(RESET_INDICATORS)
    }, 750)
  },

  setError({ commit }, message) {
    commit(SET_RPC_ERROR, message)
  },

  resetPool ({ commit }) {
    commit(RESET_POOL)
  },

  setLoading ({ commit, state }) {
    commit(SET_LOADING)
    commit(RESET_INDICATORS)
  }
}
