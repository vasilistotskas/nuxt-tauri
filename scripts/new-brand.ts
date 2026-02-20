#!/usr/bin/env bun
/**
 * Scaffold a new brand app
 * Usage: bun run new-brand <brand-name> <identifier> <product-name>
 * Example: bun run new-brand pharmaplus com.pharmaplus.app "PharmaPlus"
 */

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
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
    },
    dependencies: {
      '@packages/core': 'workspace:*',
      '@tauri-apps/api': '^2.10.1',
      '@tauri-apps/plugin-os': '^2.3.2',
      '@tauri-apps/plugin-shell': '^2.3.5',
    },
    devDependencies: {
      '@tauri-apps/cli': '^2.10.0',
    },
  }
}

export function generateNuxtConfig(productName: string): string {
  return `import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['@packages/core'],

  ssr: false,

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
      { label: 'Home', icon: 'lucide:house', route: '/' },
      { label: 'Shop', icon: 'lucide:search', route: '/shop' },
      { label: 'Cart', icon: 'lucide:shopping-cart', route: '/cart' },
      { label: 'Favorites', icon: 'lucide:heart', route: '/favorites' },
      { label: 'Account', icon: 'lucide:user', route: '/account' },
    ],
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
  const root = join(import.meta.dir, '..')
  const appDir = join(root, 'apps', brandName)
  const templateDir = join(root, 'apps', 'wecare')

  if (existsSync(appDir)) {
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
  ]) {
    mkdirSync(join(appDir, dir), { recursive: true })
  }

  // ── src-tauri/Cargo.toml ──────────────────────────────────
  writeFileSync(join(appDir, 'src-tauri', 'Cargo.toml'), generateCargoToml(brandName, libName))

  // ── src-tauri/src/lib.rs ──────────────────────────────────
  writeFileSync(
    join(appDir, 'src-tauri', 'src', 'lib.rs'),
    `#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
\ttauri_core::run(tauri::generate_context!(), tauri_core::AppConfig::default());
}
`,
  )

  // ── src-tauri/src/main.rs ─────────────────────────────────
  writeFileSync(
    join(appDir, 'src-tauri', 'src', 'main.rs'),
    `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
\t${libName}::run();
}
`,
  )

  // ── src-tauri/build.rs ────────────────────────────────────
  writeFileSync(
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
  writeFileSync(
    join(appDir, 'src-tauri', 'tauri.conf.json'),
    JSON.stringify(generateTauriConf(productName, identifier), null, '\t'),
  )

  // ── src-tauri/tauri.android.conf.json ─────────────────────
  writeFileSync(
    join(appDir, 'src-tauri', 'tauri.android.conf.json'),
    JSON.stringify(
      {
        build: {
          devUrl: 'http://TAURI_DEV_HOST:3000',
        },
        app: {
          windows: [
            {
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
  writeFileSync(
    join(appDir, 'package.json'),
    JSON.stringify(generatePackageJson(brandName), null, 2),
  )

  // ── tsconfig.json ────────────────────────────────────────
  writeFileSync(
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
  writeFileSync(join(appDir, 'nuxt.config.ts'), generateNuxtConfig(productName))

  // ── app.config.ts ─────────────────────────────────────────
  writeFileSync(join(appDir, 'app.config.ts'), generateAppConfig(brandName, productName))

  // ── app/assets/css/brand.css ──────────────────────────────
  writeFileSync(
    join(appDir, 'app', 'assets', 'css', 'brand.css'),
    `/* ${productName} Brand CSS Variables */
:root {
  --brand-primary: #000000;
  --brand-primary-dark: #000000;
  --brand-primary-rgb: 0, 0, 0;
}
`,
  )

  // ── Print next steps ──────────────────────────────────────
  console.log(`
Brand app "${brandName}" scaffolded at apps/${brandName}/

Next steps:
  1. Add "apps/${brandName}/src-tauri" to root Cargo.toml workspace members
  2. Replace icons in apps/${brandName}/src-tauri/icons/
  3. Edit apps/${brandName}/app.config.ts for brand colors and config
  4. Edit apps/${brandName}/app/assets/css/brand.css for brand CSS variables
  5. Run: bun install
  6. Run: bun run app ${brandName} tauri:dev
`)
}
