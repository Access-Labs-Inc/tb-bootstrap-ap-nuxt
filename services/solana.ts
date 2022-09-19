import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { SendTransactionOptions } from '@solana/wallet-adapter-base'

export async function sendTx (
  connection: Connection,
  feePayer: PublicKey,
  instructions: TransactionInstruction[],
  sendTransaction: (
    tx: Transaction,
    connection: Connection,
    options?: SendTransactionOptions,
  ) => Promise<string>,
  options?: SendTransactionOptions,
) {
  const tx = new Transaction().add(...instructions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  tx.feePayer = feePayer
  const signature = await sendTransaction(tx, connection, options)

  return connection.confirmTransaction(signature, 'finalized')
};

export async function getSOLBalance (connection: Connection, publicKey: PublicKey): Promise<number> {
  try {
    return (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
  } catch (e) {
    return e.message
  }
}
