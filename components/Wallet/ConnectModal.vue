<template>
  <div class="modal">
    <div class="container">
      <div>
        <h1>Connect Wallet</h1>
        <a @click="$emit('close')">
          <ModalClose class="close" />
        </a>
      </div>

      <p v-html="accessText" />
      <ActionButton
        class="connect"
        text="Connect Wallet"
        @click="$emit('connect')"
      />

      <div class="divider" />
      <h1>What Is This?</h1>
      <p v-html="explanationText" />
      <ActionButton
        class="learn"
        text="Learn More"
        @click="learnMoreLink"
      />
    </div>
  </div>
</template>

<script>
import Icon from '@/assets/svg/close.svg?inline'
import ActionButton from '@/components/Wallet/Actions/ActionButton'
import ModalClose from '@/components/Wallet/Layout/ModalClose.vue'

export default {
  components: {
    Icon,
    ActionButton,
    ModalClose
  },
  computed: {
    accessText () {
      return "To get unlimited Access to The Block please connect a web3 compatible wallet below. If you don't have a web3 wallet you can also use the button below to create a new wallet."
    },
    explanationText () {
      return "The Block is now using web3 for login to enable Access to exclusive content you can't find anywhere else. Getting full Access to The Block's content is as easy as connecting a web3 wallet and staking ACS with The Block. To get started click the button above"
    }
  },
  methods: {
    learnMoreLink () {
      window.open = ('https://www.theblock.co', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './connectModal.scss';
</style>
