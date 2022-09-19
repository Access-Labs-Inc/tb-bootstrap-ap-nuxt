import { computed, defineComponent, ref, toRefs } from 'vue-demi'
import { onClickOutside, useClipboard } from '@vueuse/core'
import { useWallet } from './useWallet'
import { h } from './render'
import WalletModalProvider from './WalletModalProvider'
import './styles.css'

export default defineComponent({
  name: 'wallet-multi-button',
  props: {
    featured: { type: Number, default: 3 },
    logo: String,
    dark: Boolean,
    connectModal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, emit }) {
    const { featured, logo, dark } = toRefs(props)
    const { publicKey, wallet, disconnect } = useWallet()

    const dropdownPanel = ref<HTMLElement>()
    const dropdownOpened = ref(false)
    const openDropdown = () => (dropdownOpened.value = true)
    const closeDropdown = () => (dropdownOpened.value = false)
    onClickOutside(dropdownPanel, closeDropdown)

    const publicKeyBase58 = computed(() => publicKey.value?.toBase58())
    const publicKeyTrimmed = computed(() => {
      if (!wallet.value || !publicKeyBase58.value) return null
      return publicKeyBase58.value.slice(0, 4) + '..' + publicKeyBase58.value.slice(-4)
    })

    const { copy, copied: addressCopied, isSupported: canCopy } = useClipboard()
    const copyAddress = () => publicKeyBase58.value && copy(publicKeyBase58.value)

    // Define the bindings given to scoped slots.
    const scope = {
      featured,
      logo,
      dark,
      wallet,
      publicKey,
      publicKeyTrimmed,
      publicKeyBase58,
      canCopy,
      addressCopied,
      dropdownPanel,
      dropdownOpened,
      openDropdown,
      closeDropdown,
      copyAddress,
      disconnect,
    }

    return () => h(WalletModalProvider, {
      props,
      ref: 'root',
      on: {
        open: (e) => emit('open', e),
        reinstall: () => emit('reinstall')
      },
      scopedSlots: {
        default (modalScope: any) {
          return h('span')
        },
        overlay (modalScope: any) {
          return slots.modalOverlay?.({ ...modalScope, ...scope }) ?? null
        },
        modal (modalScope: any) {
          return slots.modal?.({ ...modalScope, ...scope }) ?? null
        },
      }
    })
  },
})
