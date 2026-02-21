export default defineAppConfig({
  // WeCare brand configuration
  brand: {
    name: 'WeCare',
    author: 'WeCare Pharmacy',
    colors: {
      primary: '#1887AA',
      primaryDark: '#1B9AC0',
    },
    logo: '/images/wecare-logo.png',
    metadata: {
      title: 'WeCare Pharmacy',
      description: 'Your trusted health partner',
    },
  },

  // Navigation items for WeCare
  nav: {
    items: [
      { labelKey: 'nav.home', icon: 'lucide:house', route: '/' },
      { labelKey: 'nav.shop', icon: 'lucide:search', route: '/shop' },
      { labelKey: 'nav.cart', icon: 'lucide:shopping-cart', route: '/cart' },
      { labelKey: 'nav.favorites', icon: 'lucide:heart', route: '/favorites' },
      { labelKey: 'nav.account', icon: 'lucide:user', route: '/account' },
    ],
  },

  // Account menu items for WeCare
  account: {
    menuItems: [
      { labelKey: 'account.myOrders', icon: 'lucide:package', route: '/orders' },
      { labelKey: 'account.purchasedProducts', icon: 'lucide:shopping-bag', route: '/purchased' },
      { labelKey: 'wecare.carePointsAndDiscounts', icon: 'lucide:gift', route: '/points' },
      { labelKey: 'account.accountSettings', icon: 'lucide:settings', route: '/settings' },
      { labelKey: 'account.help', icon: 'lucide:help-circle', route: '/help' },
    ],
  },

  // Cart page configuration for WeCare
  cart: {
    supportPhone: '210 700 1375',
    freeShippingThreshold: '49.00',
  },

  // Override UI colors for WeCare brand
  ui: {
    colors: {
      primary: 'cyan',
      secondary: 'cyan',
      neutral: 'neutral',
    },
  },
})
