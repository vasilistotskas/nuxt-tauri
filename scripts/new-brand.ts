#!/usr/bin/env bun
/**
 * Scaffold a new brand app
 * Usage: bun run new-brand <brand-name> <identifier> <product-name>
 * Example: bun run new-brand pharmaplus com.pharmaplus.app "PharmaPlus"
 */

import { cpSync } from 'node:fs'
import { join } from 'node:path'

// ── Exported pure functions for testing ──────────────────

export function deriveLibName(brandName: string): string {
  return `${brandName.replace(/-/g, '_')}_lib`
}

export function generateCargoToml(brandName: string, libName: string): string {
  return `[package]
name = "${brandName}-app"
version = "1.0.0"
edition = "2021"

[lib]
name = "${libName}"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { workspace = true }

[dependencies]
tauri-core = { path = "../../../packages/tauri-core" }
tauri = { workspace = true }

# Plugin crates must be direct dependencies for Tauri's capability resolver
tauri-plugin-shell = { workspace = true }
tauri-plugin-notification = { workspace = true }
tauri-plugin-os = { workspace = true }
tauri-plugin-fs = { workspace = true }
tauri-plugin-store = { workspace = true }
tauri-plugin-http = { workspace = true }
tauri-plugin-deep-link = { workspace = true }
tauri-plugin-stronghold = { workspace = true }
tauri-plugin-biometric = { workspace = true }
tauri-plugin-barcode-scanner = { workspace = true }
tauri-plugin-geolocation = { workspace = true }
tauri-plugin-mcp-bridge = { workspace = true }
`
}

export function generateTauriConf(productName: string, identifier: string): object {
  return {
    bundle: {
      active: true,
      targets: 'all',
      icon: [
        'icons/32x32.png',
        'icons/128x128.png',
        'icons/128x128@2x.png',
        'icons/icon.icns',
        'icons/icon.ico',
      ],
      resources: [],
      category: 'Medical',
      shortDescription: `${productName} App`,
      longDescription: `${productName} - Mobile application`,
    },
    build: {
      beforeBuildCommand: 'bun run generate',
      frontendDist: '../.output/public',
      beforeDevCommand: 'bun run dev',
      devUrl: 'http://localhost:3000',
    },
    productName,
    version: '1.0.0',
    identifier,
    plugins: {},
    app: {
      withGlobalTauri: true,
      windows: [
        {
          label: 'main',
          title: productName,
          width: 1366,
          height: 768,
          minWidth: 375,
          minHeight: 812,
          resizable: true,
          fullscreen: false,
          visible: false,
        },
        {
          label: 'splashscreen',
          title: productName,
          url: '/splashscreen',
          width: 400,
          height: 500,
          resizable: false,
          decorations: false,
          center: true,
          transparent: false,
        },
      ],
      security: {
        csp: null,
      },
    },
  }
}

export function generatePackageJson(brandName: string): object {
  return {
    name: `@apps/${brandName}`,
    type: 'module',
    version: '1.0.0',
    private: true,
    scripts: {
      'dev': 'nuxt dev',
      'build': 'nuxt build',
      'generate': 'nuxt generate',
      'preview': 'nuxt preview',
      'tauri:dev': 'tauri dev',
      'tauri:build': 'tauri build',
      'tauri:build:debug': 'tauri build --debug',
      'tauri:android:init': 'tauri android init',
      'tauri:android:dev': 'tauri android dev',
      'tauri:android:build': 'tauri android build',
      'web:dev': 'NUXT_TARGET=web nuxt dev',
      'web:build': 'NUXT_TARGET=web nuxt build',
      'web:preview': 'NUXT_TARGET=web nuxt preview',
    },
    dependencies: {
      '@packages/core': 'workspace:*',
      '@tauri-apps/api': '^2.10.1',
      '@tauri-apps/plugin-barcode-scanner': '^2.4.4',
      '@tauri-apps/plugin-biometric': '^2.3.2',
      '@tauri-apps/plugin-deep-link': '^2.4.7',
      '@tauri-apps/plugin-geolocation': '^2.3.2',
      '@tauri-apps/plugin-http': '^2.5.7',
      '@tauri-apps/plugin-os': '^2.3.2',
      '@tauri-apps/plugin-shell': '^2.3.5',
      '@tauri-apps/plugin-stronghold': '^2.3.1',
    },
    devDependencies: {
      '@tauri-apps/cli': '^2.10.0',
    },
  }
}

export function generateNuxtConfig(productName: string): string {
  return `import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

const isTauri = process.env.NUXT_TARGET !== 'web'

export default defineNuxtConfig({
  extends: ['@packages/core'],

  ssr: !isTauri,

  devtools: {
    enabled: false,
  },

  compatibilityDate: 'latest',

  app: {
    head: {
      title: '${productName}',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'format-detection', content: 'no' },
        { name: 'description', content: '${productName}' },
      ],
    },
  },

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
`
}

export function generateAppConfig(brandName: string, productName: string): string {
  return `export default defineAppConfig({
  brand: {
    name: '${productName}',
    author: '${productName}',
    colors: {
      primary: '#000000',
      primaryDark: '#000000',
    },
    logo: '/images/${brandName}-logo.png',
    metadata: {
      title: '${productName}',
      description: '${productName}',
    },
  },

  nav: {
    items: [
      { labelKey: 'nav.home', icon: 'lucide:house', route: '/' },
      { labelKey: 'nav.shop', icon: 'lucide:search', route: '/shop' },
      { labelKey: 'nav.cart', icon: 'lucide:shopping-cart', route: '/cart' },
      { labelKey: 'nav.favorites', icon: 'lucide:heart', route: '/favorites' },
      { labelKey: 'nav.account', icon: 'lucide:user', route: '/account' },
    ],
  },

  // Account page menu items (add brand-specific items here)
  account: {
    menuItems: [
      { labelKey: 'account.myOrders', icon: 'lucide:package', route: '/orders' },
      { labelKey: 'account.purchasedProducts', icon: 'lucide:shopping-bag', route: '/purchased' },
      { labelKey: 'account.accountSettings', icon: 'lucide:settings', route: '/settings' },
      { labelKey: 'account.help', icon: 'lucide:help-circle', route: '/help' },
    ],
  },

  // Cart page configuration (set brand-specific values)
  cart: {
    supportPhone: '',
    freeShippingThreshold: '',
  },

  ui: {
    colors: {
      primary: 'cyan',
      secondary: 'cyan',
      neutral: 'neutral',
    },
  },
})
`
}

export function generateIndexPage(productName: string): string {
  return `<script setup lang="ts">
// Brand-specific home page
</script>

<template>
  <div class="px-4 py-8 text-center md:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-default">
      {{ $t('welcome') }}
    </h1>
  </div>
</template>

<i18n lang="yaml">
en:
  welcome: Welcome to ${productName}
el:
  welcome: Καλωσήρθατε στο ${productName}
</i18n>
`
}

export function generateSplashscreenPage(productName: string): string {
  return `<script setup lang="ts">
definePageMeta({
  layout: 'blank',
  middleware: 'tauri-only',
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-default">
    <h1 class="text-2xl font-bold text-default">
      ${productName}
    </h1>
  </div>
</template>
`
}

// ── Main script execution ────────────────────────────────

if (import.meta.main) {
  const args = process.argv.slice(2)

  if (args.length < 3) {
    console.error(`
Usage: bun run new-brand <brand-name> <identifier> <product-name>

Arguments:
  brand-name     Lowercase kebab-case name (e.g., pharmaplus)
  identifier     Reverse-domain identifier (e.g., com.pharmaplus.app)
  product-name   Display name (e.g., "PharmaPlus")

Example:
  bun run new-brand pharmaplus com.pharmaplus.app "PharmaPlus"
`)
    process.exit(1)
  }

  const [brandName, identifier, productName] = args
  const root = join(import.meta.dirname, '..')
  const appDir = join(root, 'apps', brandName)
  const templateDir = join(root, 'apps', 'wecare')

  const appDirExists = await Bun.file(join(appDir, 'package.json')).exists()
  if (appDirExists) {
    console.error(`Error: App "${brandName}" already exists at ${appDir}`)
    process.exit(1)
  }

  const libName = deriveLibName(brandName)

  console.log(`Scaffolding brand app "${brandName}"...`)

  // Create directory structure
  for (const dir of [
    'src-tauri/src',
    'src-tauri/capabilities',
    'src-tauri/icons',
    'app/assets/css',
    'app/pages',
    'i18n/locales',
  ]) {
    const { mkdir } = await import('node:fs/promises')
    await mkdir(join(appDir, dir), { recursive: true })
  }

  // ── src-tauri/Cargo.toml ──────────────────────────────────
  await Bun.write(join(appDir, 'src-tauri', 'Cargo.toml'), generateCargoToml(brandName, libName))

  // ── src-tauri/src/lib.rs ──────────────────────────────────
  await Bun.write(
    join(appDir, 'src-tauri', 'src', 'lib.rs'),
    `#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
\ttauri_core::run(tauri::generate_context!(), tauri_core::AppConfig::default());
}
`,
  )

  // ── src-tauri/src/main.rs ─────────────────────────────────
  await Bun.write(
    join(appDir, 'src-tauri', 'src', 'main.rs'),
    `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
\t${libName}::run();
}
`,
  )

  // ── src-tauri/build.rs ────────────────────────────────────
  await Bun.write(
    join(appDir, 'src-tauri', 'build.rs'),
    `fn main() {
\ttauri_build::build()
}
`,
  )

  // ── src-tauri/capabilities/main.json ──────────────────────
  cpSync(
    join(templateDir, 'src-tauri', 'capabilities', 'main.json'),
    join(appDir, 'src-tauri', 'capabilities', 'main.json'),
  )

  // ── src-tauri/icons (copy from template) ──────────────────
  cpSync(
    join(templateDir, 'src-tauri', 'icons'),
    join(appDir, 'src-tauri', 'icons'),
    { recursive: true },
  )

  // ── src-tauri/tauri.conf.json ─────────────────────────────
  await Bun.write(
    join(appDir, 'src-tauri', 'tauri.conf.json'),
    JSON.stringify(generateTauriConf(productName, identifier), null, '\t'),
  )

  // ── src-tauri/tauri.android.conf.json ─────────────────────
  await Bun.write(
    join(appDir, 'src-tauri', 'tauri.android.conf.json'),
    JSON.stringify(
      {
        build: {
          devUrl: 'http://localhost:3000',
        },
        app: {
          withGlobalTauri: true,
          windows: [
            {
              label: 'main',
              title: productName,
              url: '/splashscreen',
              width: 1366,
              height: 768,
              minWidth: 375,
              minHeight: 812,
              resizable: true,
              fullscreen: false,
              useHttpsScheme: false,
            },
          ],
        },
      },
      null,
      '\t',
    ),
  )

  // ── package.json ──────────────────────────────────────────
  await Bun.write(
    join(appDir, 'package.json'),
    JSON.stringify(generatePackageJson(brandName), null, 2),
  )

  // ── tsconfig.json ────────────────────────────────────────
  await Bun.write(
    join(appDir, 'tsconfig.json'),
    JSON.stringify(
      {
        extends: './.nuxt/tsconfig.json',
        compilerOptions: {
          types: ['bun'],
        },
      },
      null,
      2,
    ),
  )

  // ── nuxt.config.ts ────────────────────────────────────────
  await Bun.write(join(appDir, 'nuxt.config.ts'), generateNuxtConfig(productName))

  // ── app/app.config.ts ───────────────────────────────────────
  await Bun.write(join(appDir, 'app', 'app.config.ts'), generateAppConfig(brandName, productName))

  // ── app/pages/index.vue (brand-specific home page) ────────
  await Bun.write(join(appDir, 'app', 'pages', 'index.vue'), generateIndexPage(productName))

  // ── app/pages/splashscreen.vue (brand-specific splashscreen) ──
  await Bun.write(join(appDir, 'app', 'pages', 'splashscreen.vue'), generateSplashscreenPage(productName))

  // ── app/assets/css/brand.css ──────────────────────────────
  await Bun.write(
    join(appDir, 'app', 'assets', 'css', 'brand.css'),
    `/* ${productName} Brand CSS Variables */
:root {
  --brand-primary: #000000;
  --brand-primary-dark: #000000;
  --brand-primary-rgb: 0, 0, 0;
}
`,
  )

  // ── i18n/locales/en.json ─────────────────────────────────
  await Bun.write(
    join(appDir, 'i18n', 'locales', 'en.json'),
    JSON.stringify({}, null, 2),
  )

  // ── i18n/locales/el.json ─────────────────────────────────
  await Bun.write(
    join(appDir, 'i18n', 'locales', 'el.json'),
    JSON.stringify({}, null, 2),
  )

  // ── Print next steps ──────────────────────────────────────
  console.log(`
Brand app "${brandName}" scaffolded at apps/${brandName}/

Core provides default pages (shop, cart, favorites, account, product, 404).
Brand app includes stub index.vue and splashscreen.vue pages.

Next steps:
  1. Add "apps/${brandName}/src-tauri" to root Cargo.toml workspace members
  2. Replace icons in apps/${brandName}/src-tauri/icons/
  3. Customize apps/${brandName}/app/app.config.ts:
     - Brand colors, logo, metadata
     - account.menuItems (add brand-specific menu items)
     - cart.supportPhone and cart.freeShippingThreshold
  4. Edit apps/${brandName}/app/assets/css/brand.css for brand CSS variables
  5. Customize apps/${brandName}/app/pages/index.vue (brand home page)
  6. Run: bun install
  7. Run: bun run app ${brandName} tauri:dev
`)
}
