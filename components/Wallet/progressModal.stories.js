import ProgressModal from './ProgressModal.vue'
import {
  ACCOUNT_CREATING,
  ACCOUNT_CREATED,
  ACCOUNT_CHECKING,
  ACCOUNT_FOUND,
  REWARDS_CLAIMING,
  REWARDS_CLAIMED,
  STAKE_STAKING,
  STAKE_STAKED,
  ERROR_MESSAGE
} from '@/store/pools/types'

let ACCOUNT_INDICATOR = {
  name: 'accountCheck',
  status: 'fulfilled',
  text: ACCOUNT_FOUND
}

let CLAIM_INDICATOR = {
  name: 'claimRewards',
  status: 'loading',
  text: REWARDS_CLAIMING
}

let STAKE_INDICATOR = {
  name: 'stakeStatus',
  status: 'fulfilled',
  text: STAKE_STAKED
}

export default {
  title: 'Web3/ProgressIndicator',
  components: { ProgressModal }
}

const Template = (_args, { argTypes }) => ({
  components: { ProgressModal },
  props: Object.keys(argTypes),
  template: `
    <div>
      <ProgressModal v-bind="$props" />
    </div>
  `
})

export const progressIndicator = Template.bind({})
progressIndicator.args = {
  indicators: {
    ACCOUNT_INDICATOR,
    CLAIM_INDICATOR,
    STAKE_INDICATOR
  }
}
