<template>
  <div class="dropdownWarning" :class="type">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './walletWarning.scss';
</style>
