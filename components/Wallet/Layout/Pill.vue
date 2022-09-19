<template>
  <div @click="$emit('click', text)" class="togglePill">
    <div class="toggleText" v-html="text" />
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './pill.scss';
</style>
