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
      { label: 'Home', icon: 'lucide:house', route: '/' },
      { label: 'Shop', icon: 'lucide:search', route: '/shop' },
      { label: 'Cart', icon: 'lucide:shopping-cart', route: '/cart' },
      { label: 'Favorites', icon: 'lucide:heart', route: '/favorites' },
      { label: 'Account', icon: 'lucide:user', route: '/account' },
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
