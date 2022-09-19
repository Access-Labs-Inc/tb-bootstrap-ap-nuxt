<template>
  <div class="unstake">
    <ActionButton
      text="Unstake"
      :disabled="insufficientGas"
      @click="$emit('unstake')"
    />
    <div class="dropdownWarning">
      You will be guided to accessprotocol.co for Unstaking. <br /> Warning: Unstaking may lose access to content on The Block
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from '@/components/Wallet/Actions/ActionButton.vue'

export default {
  components: { ActionButton },
  props: {
    insufficientGas: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './unstake.scss';
</style>
