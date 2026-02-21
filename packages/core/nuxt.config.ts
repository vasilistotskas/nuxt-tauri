import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    'reka-ui/nuxt',
    '@nuxtjs/i18n',
  ],

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
      './types',
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
