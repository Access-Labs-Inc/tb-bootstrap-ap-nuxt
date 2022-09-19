<template>
    <div class='statusIndicator'>
        <span :class="connectionIndicator">
            &centerdot;
        </span>

        <p class="statusText" v-html="stakingStatus"/>
    </div>
</template>
<script>
import walletStates from '@/components/mixins/walletStates'

export default {
    mixins: [walletStates]
}
</script>
<style lang="scss" scoped>
@import './connectStatusIndicator.scss';
</style>
