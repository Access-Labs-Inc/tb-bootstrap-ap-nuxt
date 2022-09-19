<template>
  <div class="toggleBar">
    <Pill
      v-for="(pill, index) in pills"
      :key="index"
      :text="pill"
      :class="pillClasses(pill)"
      @click="pillDispatch(pill)"
    />
  </div>
</template>

<script lang="ts">
import Pill from '@/components/Wallet/Layout/Pill.vue'

export default {
  components: {
    Pill
  },
  props: {
    claimable: {
      type: Number,
      default: 0
    },
    pills: {
      type: Array as () => String[],
      default: () => []
    },
    selected: {
      type: String,
      default: 'stake'
    },
    hasAccess: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    claimable(newRewardAmount: number, oldRewardAmount: number) {
      if (!newRewardAmount && oldRewardAmount) {
        this.$emit('click', 'Stake')
      }
    }
  },
  methods: {
    pillClasses (title: String) {
      return {
        disabled: this.validateButton(title),
        toggleNotSelected: title !== this.selected
      }
    },
    pillDispatch (title: String) {
      if (this.validateButton(title)) {
        return
      }
      this.$emit('click', title)
    },
    validateButton (title: String): Boolean {
      switch (title) {
        case 'Claim':
          return !(this.hasAccess && this.claimable > 0)
        case 'Unstake':
          return !this.hasAccess
        default:
          return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './toggle.scss';
</style>
