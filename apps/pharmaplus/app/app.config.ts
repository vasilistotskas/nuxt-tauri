export default defineAppConfig({
  brand: {
    name: 'PharmaPlus',
    author: 'PharmaPlus',
    colors: {
      primary: '#000000',
      primaryDark: '#000000',
    },
    logo: '/images/pharmaplus-logo.png',
    metadata: {
      title: 'PharmaPlus',
      description: 'PharmaPlus',
    },
  },

  nav: {
    items: [
      { labelKey: 'nav.home', icon: 'lucide:house', route: '/' },
      { labelKey: 'nav.shop', icon: 'lucide:search', route: '/shop' },
      { labelKey: 'nav.cart', icon: 'lucide:shopping-cart', route: '/cart' },
      { labelKey: 'nav.favorites', icon: 'lucide:heart', route: '/favorites' },
      { labelKey: 'nav.account', icon: 'lucide:user', route: '/account' },
    ],
  },

  // Account page menu items (add brand-specific items here)
  account: {
    menuItems: [
      { labelKey: 'account.myOrders', icon: 'lucide:package', route: '/orders' },
      { labelKey: 'account.purchasedProducts', icon: 'lucide:shopping-bag', route: '/purchased' },
      { labelKey: 'account.accountSettings', icon: 'lucide:settings', route: '/settings' },
      { labelKey: 'account.help', icon: 'lucide:help-circle', route: '/help' },
    ],
  },

  // Cart page configuration (set brand-specific values)
  cart: {
    supportPhone: '',
    freeShippingThreshold: '',
  },

  ui: {
    colors: {
      primary: 'cyan',
      secondary: 'cyan',
      neutral: 'neutral',
    },
  },
})
