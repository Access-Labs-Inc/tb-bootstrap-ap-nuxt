import { Stake } from '@/types/web3/solana/Staking'
import { formatBN, formatRewards } from '@/services/access/formatters'

export default {
  poolID: (state: Stake) => state.poolID,
  trueMinAmount: (state: Stake) => state.minStake,
  trueTokenAmount: (state: Stake) => state.userBalance,
  trueRewardAmount: (state: Stake) => state.rewards,
  trueStakedAmount: (state: Stake) => state.stakedAmount,
  minStake: (state: Stake) => formatBN(state.minStake),
  tokens: (state: Stake) => formatBN(state.userBalance),
  rewards: (state: Stake) => formatRewards(state.rewards),
  staked: (state: Stake) => formatBN(state.stakedAmount),
  stakeAccount: (state) => state.stakeAccount,
  stakerAta: (state: Stake) => state.stakerAta,
  stakerAtaAccount: (state: Stake) => state.stakerAtaAccount,
  indicators: (state: Stake) => state.indicators,
  loading: (state: Stake) => state.loading,
  error: (state: Stake) => state.error,
  hasAccess: (state: Stake) => state.hasAccess,
  hasBalance: (state: Stake) => (state.minStake > 0 && state.userBalance >= state.minStake)
}
