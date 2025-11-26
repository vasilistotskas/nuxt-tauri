export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    'reka-ui/nuxt',
    '@nuxt/eslint',
  ],
  ssr: false,
  imports: {
    autoImport: true,
    dirs: [
      '~/types',
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
  devtools: {
    enabled: false,
  },
  app: {
    head: {
      title: 'Nuxtauri',
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
    host: process.env.TAURI_DEV_HOST || '0.0.0.0',
    port: 3000,
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: 'latest',
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      cors: true,
      allowedHosts: true,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  hooks: {
    'vite:extendConfig': (config) => {
      const host = process.env.TAURI_DEV_HOST || '192.168.178.122'
      const server = config.server
      if (server) {
        server.strictPort = true
        server.hmr = {
          protocol: 'ws',
          host,
          port: 1421,
        }
      }
    },
  },
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
})
