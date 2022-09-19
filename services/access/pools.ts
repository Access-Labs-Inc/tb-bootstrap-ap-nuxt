import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import BN from 'bn.js'
import {
  createStakeAccount,
  claimRewards,
  stake,
  StakeAccount,
  StakePool,
  BondAccount
} from '@theblockcrypto/ap'
import { sendTx } from '@/services/solana'

export async function getPoolData(connection: Connection, poolId: PublicKey): Promise<any> {
  const pool = await StakePool.retrieve(connection, poolId)

  return {
    pool
  }
}

export async function getStakeAccount(connection: Connection, publicKey: PublicKey, ACCESS_PROGRAM_ID: PublicKey,  ACCESS_POOL_ID: PublicKey): Promise<any> {
  try {
    const [stakeKey] = await StakeAccount.getKey(
      ACCESS_PROGRAM_ID,
      publicKey,
      ACCESS_POOL_ID
    )

    return [stakeKey, await StakeAccount.retrieve(connection, stakeKey)]
  } catch(e) {
    return [null, null, e]
  }
}

export async function createAccessStakeAccount(connection: Connection, publicKey: PublicKey, ACCESS_PROGRAM_ID: PublicKey, ACCESS_POOL_ID: PublicKey, sendTransaction: any) {
  console.log('createAccessStakeAccount', ACCESS_POOL_ID, publicKey, ACCESS_PROGRAM_ID)

  const [stakeKey] = await StakeAccount.getKey(
    ACCESS_PROGRAM_ID,
    publicKey,
    ACCESS_POOL_ID
  )

  const ixAccount = await createStakeAccount(
    ACCESS_POOL_ID,
    publicKey,
    publicKey,
    ACCESS_PROGRAM_ID,
  )

  await sendTx(connection, publicKey, [ixAccount], sendTransaction, {
    skipPreflight: true,
  })

  const stakeAccount = await StakeAccount.retrieve(connection, stakeKey)

  return [stakeKey, stakeAccount]
}

export async function getAssociatedTokenAddressAndAccount(connection: Connection, publicKey: PublicKey, centralState: any) {
  const stakerAta = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    centralState.tokenMint,
    publicKey,
  )

  return [stakerAta, await connection.getAccountInfo(stakerAta)]
}

export function createAssociatedTokenAccountInstruction(centralState: any, stakerAta: PublicKey, publicKey: PublicKey) {
  return Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    centralState.tokenMint,
    stakerAta,
    publicKey,
    publicKey,
  )
}

export async function claimAccessRewards(connection: Connection, publicKey: PublicKey, stakeKey: PublicKey, stakerAta: any, ACCESS_PROGRAM_ID: PublicKey, sendTransaction: any) {
  const ix = await claimRewards(
    connection,
    stakeKey,
    stakerAta,
    ACCESS_PROGRAM_ID,
    true
  )

  return sendTx(connection, publicKey, [ix], sendTransaction, {
    skipPreflight: true,
  })
}

export async function stakeToPool(connection: Connection, publicKey: PublicKey, stakeKey: PublicKey, stakerAta: any, stakeAmount: number, txs: TransactionInstruction[], ACCESS_PROGRAM_ID: PublicKey, sendTransaction: any) {
  const ixStake = await stake(
    connection,
    stakeKey,
    stakerAta,
    stakeAmount * Math.pow(10, 6),
    ACCESS_PROGRAM_ID,
  )
  txs.push(ixStake)
  const transaction = await sendTx(connection, publicKey, txs, sendTransaction, {
    skipPreflight: true,
  })

  return [ixStake, transaction]
}

export async function getBondAccounts (connection: Connection, owner: PublicKey, ACCESS_PROGRAM_ID: PublicKey, ACCESS_POOL_ID: PublicKey) {
  const filters = [
    {
      memcmp: {
        offset: 0,
        bytes: '6',
      },
    },
    {
      memcmp: {
        offset: 1,
        bytes: owner.toBase58(),
      },
    },
  ]

  const baseAccounts = await connection.getProgramAccounts(ACCESS_PROGRAM_ID, {
    filters,
  })

  const bondAccounts = await Promise.all(baseAccounts.map((account) => BondAccount.retrieve(
    connection,
    account.pubkey,
  )))

  return bondAccounts.filter((account) => account.stakePool.toBase58() === ACCESS_POOL_ID.toBase58() )
}

export async function getUserStakeState(connection: Connection, owner: PublicKey, ACCESS_PROGRAM_ID: PublicKey, ACCESS_POOL_ID: PublicKey, stakeAccount: any, stakePool: any) {
  const [bondStakeAmount, bondPoolMinimum] = await getBondAccountStakeAmounts(connection, owner, ACCESS_PROGRAM_ID, ACCESS_POOL_ID)
  const stakeAmount = stakeAccount?.stakeAmount || new BN(0)
  const totalStaked = (new BN(0)).add( bondStakeAmount ).add( stakeAmount )
  const { minimumStakeAmount } = stakePool
  const poolMinimums = [minimumStakeAmount.toNumber()]

  if (!stakeAccount?.owner && !bondStakeAmount.toNumber()) {
      return [false, totalStaked, bondStakeAmount, stakeAmount]
  }

  bondPoolMinimum && poolMinimums.push( bondPoolMinimum )
  stakeAccount?.owner && poolMinimums.push(stakeAccount.poolMinimumAtCreation.toNumber())

  const minimumRequired = Math.min(...poolMinimums)

  return [ totalStaked.toNumber() >= minimumRequired, totalStaked, minimumRequired, bondStakeAmount, stakeAmount]
}

export async function getBondAccountStakeAmounts(connection: Connection, owner: PublicKey, ACCESS_PROGRAM_ID: PublicKey, ACCESS_POOL_ID: PublicKey) {
  let totalStaked = new BN(0)

  const activeBondAccounts =  await getBondAccounts(connection, owner, ACCESS_PROGRAM_ID, ACCESS_POOL_ID)

  if (!activeBondAccounts.length) {
    return [totalStaked, null]
  }

  activeBondAccounts.forEach((account) => {
    totalStaked = totalStaked.add(account.totalStaked as BN)
  })

  const poolMinimums = activeBondAccounts.map(({ poolMinimumAtCreation }) => poolMinimumAtCreation.toNumber())
  const bondPoolMinimum = Math.min(...poolMinimums)

  return [totalStaked, bondPoolMinimum]
}



export function calculateReward (lastClaimedTime: BN, stakePool: StakePool, staker: boolean, SECONDS_IN_DAY: number) {
    const BUFF_LEN = 274
    let nb_days_behind = new Date().getTime() - Number(lastClaimedTime) * 1000
    nb_days_behind = Math.round(nb_days_behind / 1000 / Number(SECONDS_IN_DAY))
    nb_days_behind = nb_days_behind > BUFF_LEN - 1 ? BUFF_LEN - 1 : nb_days_behind

    const idx = stakePool.currentDayIdx
    let i = (idx - nb_days_behind) % BUFF_LEN
    let reward = new BN(0)

    while (i !== (idx + 1) % BUFF_LEN) {
      const reward_for_day = staker
        ? ((stakePool.balances[i]?.stakersReward ?? new BN(0)) as BN)
        : stakePool.balances[i]?.poolReward ?? (new BN(0) as BN)
      reward = reward.add(reward_for_day as BN)
      i = (i + 1) % BUFF_LEN
    }

    return reward
}

export function calculateRewardForStaker (lastClaimedTime: BN, stakePool: StakePool, stakeAmount: BN, SECONDS_IN_DAY: number) {
  const reward = calculateReward(lastClaimedTime, stakePool, true, SECONDS_IN_DAY)
  return reward.mul(new BN(stakeAmount.toNumber())).iushrn(32)
}

export function calculateRewardForPool (lastClaimedTime: BN, stakePool: StakePool, SECONDS_IN_DAY: number) {
  const reward = calculateReward(lastClaimedTime, stakePool, false, SECONDS_IN_DAY)
  return reward.iushrn(32)
}
