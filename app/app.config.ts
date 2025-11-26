export default defineAppConfig({
  app: {
    name: 'WeCare',
    author: 'WeCare Pharmacy',
    repo: 'https://github.com/NicolaSpadari/nuxtor',
    tauriSite: 'https://tauri.app',
    nuxtSite: 'https://nuxt.com',
    nuxtUiSite: 'https://ui4.nuxt.dev',
  },
  pageCategories: {
    system: {
      label: 'System',
      icon: 'lucide:square-terminal',
    },
    storage: {
      label: 'Storage',
      icon: 'lucide:archive',
    },
    interface: {
      label: 'Interface',
      icon: 'lucide:app-window-mac',
    },
    other: {
      label: 'Other',
      icon: 'lucide:folder',
    },
  },
  ui: {
    colors: {
      primary: 'neutral',
      secondary: 'cyan',
      neutral: 'neutral',
    },
    icons: {
      light: 'lucide:sun',
      dark: 'lucide:moon',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    formField: {
      slots: {
        root: 'w-full',
      },
    },
    input: {
      slots: {
        root: 'w-full',
      },
    },
    textarea: {
      slots: {
        root: 'w-full',
        base: 'resize-none',
      },
    },
    accordion: {
      slots: {
        trigger: 'cursor-pointer',
        item: 'md:py-2',
      },
    },
    navigationMenu: {
      slots: {
        link: 'cursor-pointer',
      },
    },
  },
})
