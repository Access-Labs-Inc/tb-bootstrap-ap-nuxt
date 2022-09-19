<template>
  <NuxtLink
    v-if="redirects"
    class="dropDownButton"
    @click.native="$emit('redirect')"
    :class="{ disabled }"
    :to="redirectTo"
    :event="disabled ? '' : 'click'"
  >
    {{ text }}
  </NuxtLink>
  <button v-else @click.stop="$emit('click')" class="dropDownButton" v-html="text" :disabled="disabled" />
</template>

<script lang="ts">
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    redirects: {
      type: Boolean,
      default: false
    },
    redirectTo: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
@import './actionButton.scss';
</style>
