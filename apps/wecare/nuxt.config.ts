import { resolve } from 'node:path'

export default defineNuxtConfig({
  extends: ['@packages/core'],

  // WeCare-specific configuration
  ssr: false,

  devtools: {
    enabled: false,
  },

  app: {
    head: {
      title: 'WeCare Pharmacy',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'format-detection', content: 'no' },
        { name: 'description', content: 'WeCare Pharmacy - Your trusted health partner' },
      ],
    },
  },

  // Include core styles first, then brand-specific overrides
  css: [
    '@packages/core/assets/css/main.css',
    './app/assets/css/main.css',
  ],

  dir: {
    modules: 'app/modules',
  },

  devServer: {
    host: process.env.TAURI_DEV_HOST || '0.0.0.0',
    port: 3000,
  },

  alias: {
    '@packages': resolve(__dirname, '../../packages'),
  },

  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    resolve: {
      alias: {
        '@packages': resolve(__dirname, '../../packages'),
      },
    },
    server: {
      cors: true,
      allowedHosts: true,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
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
})
