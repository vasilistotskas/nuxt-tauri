export default defineAppConfig({
  // Brand defaults - overridden by brand apps
  brand: {
    name: '',
    author: '',
    colors: {
      primary: '',
      primaryDark: '',
    },
    logo: '',
    metadata: {
      title: '',
      description: '',
    },
  },

  // Navigation items - populated by brand apps
  nav: {
    items: [] as { label: string, icon: string, route: string }[],
  },

  // Default UI configuration - can be extended by brand apps
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
