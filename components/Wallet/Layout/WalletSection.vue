<template>
  <div>
    <div class="header">
      <div class="headerBox">
        <div class="headerMain" v-html="feedback ? feedback : main" />
        <div v-if="clipboard" class="copy" @click="copy" >
          <font-awesome-icon :icon="['fas', 'copy']" />
        </div>
        <div v-if="isWebWallet" class="headerExtra webWallet">
          <a :href="webWallet.url">View Wallet</a>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"/></svg>
        </div>
        <div class="headerExtra" @click="handler" v-html="extra" />
      </div>
    </div>

    <slot v-if="useSlot" />

    <div v-else class="assetBalance">
      <div class="balanceBox">
        <div class="label" v-html="label" />
        <div class="balance">
          {{ balance }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onClickOutside, useClipboard } from '@vueuse/core'
import { useWallet } from '@/components/wallets-vue/useWallet'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

library.add(faCopy)

export default {
  components: { FontAwesomeIcon },
  props: {
    main: {
      type: String,
      default: ''
    },
    clipboard: {
      type: Boolean,
      default: false
    },
    webWallet: {
      type: Object,
      default: () => {}
    },
    extra: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    balance: {
      type: Number,
      default: 0
    },
    useSlot: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      feedback: ''
    }
  },
  computed: {
    isWebWallet () {
      return this.webWallet?.name
    }
  },
  methods: {
    async copy() {
      const { copy, isSupported: canCopy } = useClipboard()
      const { publicKey } = useWallet()

      if (!publicKey.value || !canCopy) {
        return
      }

      copy(publicKey.value.toString())

      this.feedback = 'Address Copied'

      await new Promise((resolve) => setTimeout(resolve, 2000))

      this.feedback = ''
    },
    handler (_e: Event): void {
      if (this.extra.toLowerCase() === 'disconnect') {
        this.$emit('disconnect')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './walletSection.scss';
</style>
