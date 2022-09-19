import path from 'path'
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bootstrap-ap-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/solana-wallets-vue.client.ts'
  ],

  alias: {
    '@solana/web3.js': path.resolve(__dirname, './node_modules/@solana/web3.js/lib/index.browser.esm.js')
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  publicRuntimeConfig: {
    ACCESS_PROGRAM_ID: 'acp1VPqNoMs5KC5aEH3MzxnyPZNyKQF1TCPouCoNRuX',
    ACCESS_POOL_ID: 'B1PciBp1hnhRYtE1rQyHFZBiGfZXTYDg7h6M6pAzY3Hd',
    ACCESS_UNSTAKE_URL: 'https://st-app.accessprotocol.co',
    SECONDS_IN_DAY: '86400',
    SOLANA_NETWORK: 'devnet',
    SOLANA_RPC_PROVIDER_URL: 'https://api.devnet.solana.com'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true
    },
    transpile: [
      '@theblockcrypto/ap'
    ],
    extend(config, {}) {
      config.node = {
        fs: 'empty'
      }
    }
  },
})
