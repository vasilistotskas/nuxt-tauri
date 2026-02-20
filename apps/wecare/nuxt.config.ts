import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['@packages/core'],

  // WeCare-specific configuration
  ssr: false,

  devtools: {
    enabled: false,
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
    './app/assets/css/brand.css',
  ],

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
  },
})
