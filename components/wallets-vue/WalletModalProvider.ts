import { computed, defineComponent, nextTick, ref, toRefs, watch } from 'vue-demi'
import { onClickOutside, onKeyStroke, useScrollLock } from '@vueuse/core'
import { useWallet } from './useWallet'
import WalletIcon from './WalletIcon'
import { h, slotWithDefault } from './render'

export default defineComponent({
  name: 'wallet-modal-provider',
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
    const { featured, logo, dark, connectModal } = toRefs(props)
    const modalPanel = ref<HTMLElement | null>(null)
    const modalOpened = ref(connectModal.value)
    const error = ref<{message: String, attemptedWallet: String}>(null)
    const openModal = () => modalOpened.value = true
    const closeModal = () => {
      modalOpened.value = false
      emit('open', false)
    }
    const dismissError = () => error.value = null
    const handleSelect = (wallet: string) => {
      let { readyState } = wallets.value.find(({name}) => name === wallet)

      if (['Installed', 'Loadable'].includes(readyState)) {
        selectWallet(wallet)
        closeModal()
        return
      }
      emit('reinstall')
      expandedWallets.value = false
      error.value = {
        attemptedWallet: wallet,
        message: `Wallet extension not found. Please install the ${wallet.split(' ')[0].trim()} browser extension to use this option.`
      }
    }
    const hasLogo = computed(() => !!slots.logo || !!logo.value)
    const { wallets, select: selectWallet, connected } = useWallet()
    const expandedWallets = ref(false)
    const featuredWallets = computed(() => wallets.value.slice(0, featured.value))
    const hiddenWallets = computed(() => wallets.value.slice(featured.value))
    const walletsToDisplay = computed(() => expandedWallets.value ? wallets.value : featuredWallets.value)

    // Close the modal when clicking outside of it or when pressing Escape.
    onClickOutside(modalPanel, closeModal)
    onKeyStroke('Escape', closeModal)

    // Ensures pressing Tab backwards and forwards stays within the modal.
    onKeyStroke('Tab', (event: KeyboardEvent) => {
      const focusableElements = modalPanel.value?.querySelectorAll('button') ?? []
      const firstElement = focusableElements?.[0]
      const lastElement = focusableElements?.[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement && lastElement) {
        lastElement.focus()
        event.preventDefault()
      } else if (! event.shiftKey && document.activeElement === lastElement && firstElement) {
        firstElement.focus()
        event.preventDefault()
      }
    })

    // Bring focus inside the modal when it opens.
    watch(modalOpened, isOpened => {
      if (! isOpened) return
      nextTick(() => modalPanel.value?.querySelectorAll('button')?.[0]?.focus())
    })

    watch(connectModal, toOpen => {
      toOpen && openModal() || closeModal()
    })

    watch(connected, isConnected => {
      isConnected && closeModal()
    })
    // Lock the body scroll when the modal opens.
    const scrollLock = useScrollLock(document.body)
    watch(modalOpened, isOpened => scrollLock.value = isOpened)

    // Define the bindings given to scoped slots.
    const scope = {
      dark,
      logo,
      hasLogo,
      featured,
      modalPanel,
      modalOpened,
      openModal,
      closeModal,
      expandedWallets,
      walletsToDisplay,
      featuredWallets,
      hiddenWallets,
      selectWallet,
    }

    const renderLogo = () => {
      if (!hasLogo.value) return
      return h('div', { class: 'swv-modal-logo-wrapper' }, [
        h('img', { claass: 'swv-modal-logo', src: logo.value, alt: 'logo' }),
      ])
    }

    const renderCloseButton = () => {
      return h('button', { class: 'swv-modal-button-close', on: { click: closeModal } }, [
        h('svg', { attrs: { width: '14', height: '14' } }, [
          h('path', { attrs: { d: 'M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z' } })
        ])
      ])
    }

    const renderExpandButton = () => {
      if (hiddenWallets.value.length <= 0) return
      return h('button', {
        attrs: {
          'aria-controls': 'swv-modal-collapse',
          'aria-expanded': expandedWallets.value,
        },
        class: ['swv-button swv-modal-collapse-button', { 'swv-modal-collapse-button-active': expandedWallets.value }],
        on: { click: () => { expandedWallets.value = !expandedWallets.value } }
      }, [
        h('p', {}, (expandedWallets.value ? 'Less' : 'More') + ' options'),
        h('i', { class: 'swv-button-icon' }, [
          h('svg', { attrs: { width: '11', height: '6' }}, [
            h('path', { attrs: { d: 'm5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z' }})
          ])
        ])
      ])
    }

    const renderErrorModal = () => {
      if (!error.value) return
      return h('div', {  class: 'swv-modal-error' }, [
        h('div', { class: 'container'}, [
          h('div', { class: 'errorMessage' }, error.value.message),
          h('div', { class: 'buttons' }, [
            h('button', { class: 'tryAgain', on: { click: () => { handleSelect(error.value.attemptedWallet) } } }, 'Try again'),
            h('button', { class: 'goBack', on: { click: () => { dismissError() } } }, 'Return to Wallet Options')
          ])
        ])
      ])
    }

    const renderModal = () => {
      if (!modalOpened.value) return null
      return h('div', {
        'aria-labelledby': 'swv-modal-title',
        'aria-modal': true,
        class: ['swv-modal', dark.value ? 'swv-dark' : ''],
        role: 'dialog',
      }, [
        slotWithDefault(slots.overlay, scope, () => h('div', { class: 'swv-modal-overlay' })),
        h('div', { class: 'swv-modal-container', ref: 'modalPanel' }, [
          slotWithDefault(slots.modal, scope, () => (
            h('div', { class: ['swv-modal-wrapper', { 'swv-modal-wrapper-no-logo': !hasLogo.value }] }, [
              slots.logo?.(scope) ?? renderLogo(),
              h('h1', { class: 'swv-modal-title', id: 'swv-modal-title' }, 'Connect Wallet'),
              renderCloseButton(),
              h('ul', { class: 'swv-modal-list' }, [
                walletsToDisplay.value.map(wallet => (
                  h('li', { key: wallet.name, on: { click: () => { handleSelect(wallet.name)} } }, [
                    h('button', { class: 'swv-button' }, [
                      h('p', {}, wallet.name),
                      h('p', { class: [wallet.name === 'Torus' ? 'recommended' : 'hiddenRec']}, '(Recommended for New Users)'),
                      h(WalletIcon, { props: { wallet } }),
                    ])
                  ])
                ))
              ]),
              renderErrorModal(),
              renderExpandButton(),
            ])
          )),
        ])
      ])
    }

    return () => h('div', { class: dark.value ? 'swv-dark' : '' }, [
      slots.default?.(scope),
      renderModal(),
    ])
  },
})
