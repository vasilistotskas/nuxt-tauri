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

  // App-specific configuration
  app: {
    name: 'WeCare',
    author: 'WeCare Pharmacy',
    tauriSite: 'https://tauri.app',
    nuxtSite: 'https://nuxt.com',
    nuxtUiSite: 'https://ui4.nuxt.dev',
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
