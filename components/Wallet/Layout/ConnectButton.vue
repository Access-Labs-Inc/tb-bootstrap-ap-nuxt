<template>
  <button @click="$emit('connect')" class="connectButton">
    <span class="indicator" :class="connectionIndicator">
      &centerdot;
    </span>
    <div class="buttonText">
      {{ buttonText }}
    </div>
  </button>
</template>

<script lang="ts">
import walletStates from '@/components/mixins/walletStates'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  mixins: [walletStates],

  computed: {
    buttonText (): String {
      return this.connected ? this.truncatedAddress : 'Connect'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './connectButton.scss';
</style>
