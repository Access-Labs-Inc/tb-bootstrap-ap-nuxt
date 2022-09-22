require('dotenv-defaults').config({
  path: './.env',
  encoding: 'utf8',
  systemvars: true,
  defaults: './.env.defaults'
})

module.exports = {
  publicRuntimeConfig: {
    CANONICAL_URL: process.env.CANONICAL_URL || 'http://localhost:3000',
    APP_HOST: process.env.APP_HOST || 'localhost',
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    API_URL: process.env.API_URL || 'http://localhost:300/api',
    NUXT_PORT: process.env.NUXT_PORT || 3000,

    ACCESS_UNSTAKE_URL: process.env.ACCESS_UNSTAKE_URL,
    ACCESS_PROGRAM_ID: process.env.ACCESS_PROGRAM_ID,
    ACCESS_POOL_ID: process.env.ACCESS_POOL_ID,
    SECONDS_IN_DAY: process.env.SECONDS_IN_DAY || 900,
    SOLANA_NETWORK: process.env.SOLANA_NETWORK || 'devnet',
    SOLANA_RPC_PROVIDER_URL: process.env.SOLANA_RPC_PROVIDER_URL || 'https://api.devnet.solana.com',
  },

  privateRuntimeConfig: {},
}
