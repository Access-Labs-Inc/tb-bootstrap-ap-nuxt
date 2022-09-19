export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_WALLET_CONNECTION = 'SET_WALLET_CONNECTION'
export const SET_PUBLIC_KEY = 'SET_PUBLIC_KEY'
export const START_POLLING = 'START_POLLING'
export const CLEAR_POLLING = 'CLEAR_POLLING'
export const SET_CONNECTION_STATE = 'SET_CONNECTIONN_STATE'
export const SET_GAS_BALANCE = 'SET_GAS_BALANCE'

export const TOGGLE_WALLET_ACCESS = 'TOGGLE_WALLET_ACCESS'

export const SET_LOADING = 'SET_LOADING'
export const FIRST_ATTEMPT = 'FIRST_ATTEMPT'
export const IS_OPEN = 'IS_OPEN'
export const GUIDING_USER = 'GUIDING_USER'

export const SET_SEND_TRX = 'SET_SEND_TRX'
export const SET_EAGERLY_CONNECTED = 'SET_EAGERLY_CONNECTED'
export const SET_WALLET_NAME = 'SET_WALLET_NAME'
export const NOT_ENOUGH_ACS = (min: number) => `You currently do not have any ACS in your wallet to stake. You need at least <strong>${min ? min : 0}</strong> to unlock content. Find out how to get ACS here. <a href="https://accessprotocol.co/" target="_blank"> https://accessprotocol.co/ </a>`
export const SIGN_WALLET_AUTH = (nonce: string) => `Sign this message for authenticating with your wallet. Nonce: ${nonce}`
