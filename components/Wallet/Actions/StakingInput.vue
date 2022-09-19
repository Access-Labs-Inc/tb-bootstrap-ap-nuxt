<template>
  <label class="inputLabel">
    <input
      class="stakingInput"
      :class="{ disabled: !unstaked }"
      v-model.number="toStake"
      type="numeric"
      :disabled="!unstaked"
      :placeHolder="unstaked ? minimumStake : 0"
    />
    <div :class="[{ disabled: !unstaked }, minMaxLabel]" @click="setMinMax"> {{ minMaxLabel }} </div>
  </label>
</template>

<script lang="ts">
export default {
  props: {
    unstaked: {
      type: Number,
      default: 0
    },
    minimumStake: {
      type: Number,
      default: 0
    },
    stakingError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      toStake: 0
    }
  },
  watch: {
    toStake (newVal, _oldVal) {
      this.$emit('change', newVal)
    },
    unstaked: {
      handler (newVal, oldVal) {
        if (!newVal && !oldVal) {
          this.toStake = 0
          return
        }
        newVal >= this.minimumStake
        ? this.toStake =  Math.ceil(newVal - newVal * 0.01)
        : this.toStake = this.minimumStake
      },
      immediate: true
    }
  },
  computed: {
    minMaxLabel () {
      return this.toStake > this.minimumStake ? 'min' : 'max'
    },
    canStake () {
      return this.toStake > this.minimumStake && this.toStake <= this.unstaked
    }
  },
  methods: {
    setMinMax () {
      this.toStake > this.minimumStake
      ? this.toStake = this.minimumStake
      : this.toStake = Math.ceil(this.unstaked - this.unstaked * 0.01)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './stakingInput.scss';
</style>
