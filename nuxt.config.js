import path from 'path'
import { defineNuxtConfig } from '@nuxt/bridge'
import runtimeConfigs from './config'

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
    '@/plugins/program.client.js',
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

  ...runtimeConfigs,

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
