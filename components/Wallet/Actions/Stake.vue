<template>
  <div class="stakeSection">
    <WalletSection
      main="Stake"
      :extra="learnMoreAnchor"
      :use-slot="true"
    >
      <Input
        :unstaked="unstaked"
        :minimum-stake="minimumStake"
        :staking-error="stakingError"
        @change="(e) => toStake = e"
      />
    </WalletSection>
    <ActionButton
      :disabled="!unstaked || !validInput || tokenOverflow"
      @click="handler"
      text="Stake ACS"
    />
    <WalletWarning v-if="!unstaked" type="insufficient">
      Not Enough ACS in Wallet to Stake
    </WalletWarning>
    <WalletWarning v-if="!validInput && !tokenOverflow" type="insufficient">
      Staking amount doesn't meet requirement to unlock Access content. Need {{ minimumStake - toStake }} more
    </WalletWarning>
    <WalletWarning v-if="tokenOverflow" type="insufficient">
      The input amount exceeds the amount of tokens in your wallet ({{ unstaked }}).
    </WalletWarning>
    <WalletWarning type="fees">
      + 2% Protocol Fee ({{ accurateRound(toStake * 0.02)}} ACS)
      <a href="https://www.accessprotocol.co" target="_blank">
        <font-awesome-icon :icon="['fas', 'info-circle']"/>
      </a>
      <br />+ Transaction Fee: ~ 0.0004 SOL
    </WalletWarning>
  </div>
</template>

<script lang="ts">
import ActionButton from '@/components/Wallet/Actions/ActionButton.vue'
import Input from '@/components/Wallet/Actions/StakingInput.vue'
import WalletSection from '@/components/Wallet/Layout/WalletSection.vue'
import WalletWarning from '@/components/Wallet/Layout/WalletWarning.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faInfoCircle)
export default {
  components: { ActionButton, FontAwesomeIcon, Input, WalletSection, WalletWarning },
  props: {
    minimumStake: {
      type: Number,
      default: 0
    },
    staked: {
      type: Number,
      default: 0
    },
    unstaked: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      toStake: 0,
      stakingError: ''
    }
  },
  computed: {
    learnMoreAnchor (): string {
      return `<a class="learnMore" href="${this.$config?.ACCESS_UNSTAKE_URL ?? ''}" target="_blank" title="Learn more about staking ACS">Learn More<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"/></svg></a>`
    },
    validInput (): Boolean {
      return this.staked + this.toStake >= this.minimumStake && this.toStake <= this.unstaked
    },
    noTokens (): Boolean {
      return this.balance < this.minimumStake
    },
    tokenOverflow (): Boolean {
      return this.toStake > this.unstaked
    }
  },
  methods: {
    handler () {
      this.stakingError = this.validInput ? '' : `Error staking. The value ${this.toStake} is not in valid range.`
      this.$emit('stake', this.toStake)
    },
    accurateRound(num: number) {
      return Math.round((num + Number.EPSILON) * 100) / 100
    }
  }
}
</script>

<style lang="scss" scoped>
@import './stake.scss';
</style>
