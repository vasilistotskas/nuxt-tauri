import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    'reka-ui/nuxt',
    '@nuxtjs/i18n',
    ['@pinia/nuxt', { storesDirs: ['./stores'] }],
  ],

  runtimeConfig: {
    public: {
      apiBase: '', // Set NUXT_PUBLIC_API_BASE to enable live API mode
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'el', name: 'Ελληνικά', file: 'el.json' },
    ],
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
      cookieKey: 'i18n_redirected',
    },
  },
  devtools: {
    enabled: true,
  },
  imports: {
    autoImport: true,
    dirs: [
      './stores',
    ],
    presets: [
      {
        from: 'zod',
        imports: [
          'z',
          {
            name: 'infer',
            as: 'zInfer',
            type: true,
          },
        ],
      },
    ],
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  // CSS is imported by brand apps via their main.css
  // css: ['./assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: 'latest',
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      include: ['../app.config.*'],
    },
  },
})
