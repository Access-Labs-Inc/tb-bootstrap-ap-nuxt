import { defineComponent, PropType, toRefs } from 'vue-demi'
import { Wallet } from './createWalletStore'
import { h } from './render'

export default defineComponent({
  name: 'wallet-icon',
  props: {
    wallet: Object as PropType<Wallet>,
  },
  setup(props) {
    const { wallet } = toRefs(props)
    const image = wallet.value
      ? h('img', { attrs: { src: wallet.value.icon }, ref: 'root' })
      : undefined

    return () => h('i', { class: 'swv-button-icon', ref: 'root'}, [image])
  }
})
