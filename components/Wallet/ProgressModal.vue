<template>
  <div class="modalView">
    <div v-for="(value, key, index) in indicators" :key="index" class="progressItem">
      <div class="spinner" :class="indicators[key].status" />
      <div class="step"> {{ indicators[key].text }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Indicator } from '@/types/web3/solana/Staking'

export default {
  props: {
    indicators: {
      type: Object as () => Indicator,
      default: () => {}
    }
  },
}
</script>

<style lang="scss" scoped>
@import './progressModal';
</style>
