import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

const isTauri = process.env.NUXT_TARGET !== 'web'

export default defineNuxtConfig({
  extends: ['@packages/core'],

  ssr: !isTauri,

  devtools: {
    enabled: !isTauri,
  },

  compatibilityDate: 'latest',

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
    './assets/css/brand.css',
  ],

  ...(isTauri
    ? {
        devServer: {
          host: process.env.TAURI_DEV_HOST || '0.0.0.0',
          port: 3000,
        },
      }
    : {}),

  alias: {
    '@packages': resolve(__dirname, '../../packages'),
  },

  vite: {
    clearScreen: false,
    envPrefix: isTauri ? ['VITE_', 'TAURI_'] : ['VITE_'],
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
    ...(isTauri
      ? {
          'vite:extendConfig': (config) => {
            const host = process.env.TAURI_DEV_HOST || 'localhost'
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
        }
      : {}),
  },
})
