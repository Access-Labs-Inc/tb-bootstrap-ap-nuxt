import crypto from 'crypto'
import { TextEncoder } from 'util'
import { PublicKey } from '@solana/web3.js'
import { sign } from 'tweetnacl'
import bs58 from 'bs58'

/**
 * Generates a randomly secure 32 bytes nonce
 * @returns hex encoded string
 */
export const generateNonce = () => {
  const nonce = crypto.randomBytes(32).toString('hex')
  return nonce
}

/**
 * Verifies if a string is a valid 32 bytes nonce
 * @param nonce hex encoded nonce
 * @returns
 */
export const isValidNonce = (nonce: string) => {
  const buff = Buffer.from(nonce, 'hex')
  if (buff.length !== 32) {
    return false
  }
  return true
}

/**
 * Verifies a signed nonce
 * @param nonce Hex encoded nonce
 * @param signedNonce Signed nonce (i.e signature to verify)
 * @param pubKeyString Public key used to sign the nonce
 * @returns
 */
export const verifyNonce = (
  nonce: string,
  signedNonce: string,
  pubKeyString: string
) => {
  return sign.detached.verify(
    bs58.decode(nonce),
    bs58.decode(signedNonce),
    new PublicKey(pubKeyString).toBytes()
  )
}
