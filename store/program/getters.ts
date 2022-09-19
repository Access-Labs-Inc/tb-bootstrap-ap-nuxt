import { clusterApiUrl, Connection } from '@solana/web3.js'
import { Program } from './state'
export default {
  connection: (state: Program) => state.connection,
  mutableConnection: (_state: Program) => new Connection(clusterApiUrl(process.env.SOLANA_NETWORK), 'confirmed'),
  programId: (state: Program) => state.programId,
  centralState: (state: Program) => state.centralState,
  unstakeURL: (state: Program) => state.unstakeURL
}
