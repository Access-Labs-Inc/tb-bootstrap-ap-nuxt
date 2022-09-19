<template>
  <div class="error">
    <div class="message" v-html="error" />
    <div class="close" @click="$emit('dismiss')"> X </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'errorModal.scss';
</style>
