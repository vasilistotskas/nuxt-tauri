export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    'nuxt-svgo',
    'reka-ui/nuxt',
    '@nuxt/eslint',
  ],
  ssr: false,
  imports: {
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
  devtools: {
    enabled: false,
  },
  app: {
    head: {
      title: 'Nuxtor',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'format-detection', content: 'no' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
    classSuffix: '',
  },
  dir: {
    modules: 'app/modules',
  },
  devServer: {
    host: process.env.VITE_DEV_SERVER_HOST || '0.0.0.0',
    port: Number(process.env.VITE_DEV_SERVER_PORT) || 3000,
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: 'latest',
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: process.env.VITE_DEV_SERVER_HMR_HOST || '0.0.0.0',
        port: Number(process.env.VITE_DEV_SERVER_HMR_PORT) || 3001,
      },
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
  svgo: {
    autoImportPath: '@/assets/',
  },
})
