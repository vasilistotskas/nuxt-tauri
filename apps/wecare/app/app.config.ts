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

  // Override UI colors for WeCare brand
  ui: {
    colors: {
      primary: 'cyan',
      secondary: 'cyan',
      neutral: 'neutral',
    },
  },
})
