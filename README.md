<p align="center">
    <img src="banner.png" alt="banner">
</p>
<h1 align="center">Nuxt Tauri Monorepo</h1>
<p align="center">
Multi-brand mobile &amp; desktop applications powered by <a href="https://nuxt.com">Nuxt 4</a> and <a href="https://v2.tauri.app">Tauri 2</a>
</p>

## Overview

A monorepo for building native iOS, Android, and desktop apps from a single codebase. Brand apps extend a shared core layer via Nuxt's layers pattern — add a new brand by creating a directory under `apps/` with brand-specific config, styles, and components.

**Primary focus:** Mobile (iOS & Android). Desktop (Windows/macOS/Linux) is supported but secondary. Web deployment with SSR is also supported.

## Tech Stack

- **Nuxt 4** with Layers architecture
- **Tauri 2** for native mobile & desktop builds
- **Nuxt UI v4** component library
- **TailwindCSS v4**
- **Bun** workspaces & package manager
- **TypeScript** with auto-generated types
- **ESLint** with `@antfu/eslint-config`

## Prerequisites

- [Bun](https://bun.sh) >= 1.3
- [Node.js](https://nodejs.org) >= 24
- [Rust](https://tauri.app/start/prerequisites/) (for Tauri builds)
- [Android Studio](https://developer.android.com/studio) with SDK & NDK (for Android builds)
- Xcode (for iOS builds, macOS only)

For Android, add Rust targets:
```sh
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
```

## Quick Start

```sh
# Install dependencies (also runs nuxt prepare for all layers & apps)
bun install

# Start dev server (Tauri SPA mode)
bun run app <app-name> dev

# Start with Tauri (desktop)
bun run app <app-name> tauri:dev

# Start with Tauri (Android)
bun run app <app-name> tauri:android:dev

# Start web dev server (SSR enabled)
bun run app <app-name> web:dev
```

## Project Structure

```
packages/
  core/                        # Shared Nuxt layer (brand-agnostic)
    components/                # Shared components (ProductCard, BottomNav, etc.)
    composables/               # Shared composables (useNavigation, etc.)
    i18n/locales/              # Shared translations (en.json, el.json)
    middleware/                 # Shared route middleware (tauri-only, etc.)
    server/api/                # Shared server routes (health, etc.)
    types/                     # Shared TypeScript types (auto-imported)
    assets/css/                # Base styles & design tokens

apps/
  wecare/                      # WeCare Pharmacy brand app
    app/
      components/              # Brand components (WeCareHeader, etc.)
      pages/                   # App pages
      layouts/                 # App layouts
      assets/css/brand.css     # Brand colors & overrides
    i18n/locales/              # Brand-specific translations (en.json, el.json)
    src-tauri/                 # Tauri config (Rust backend, capabilities)
    app/app.config.ts          # Brand identity & nav items
    nuxt.config.ts             # Extends @packages/core

scripts/
  app.ts                       # Unified CLI runner
  prepare.ts                   # Postinstall: nuxt prepare for all layers & apps
  typecheck.ts                 # Typecheck all layers & apps
```

## Available Commands

All app commands use the unified runner: `bun run app <app-name> <command>`

| Command | Description |
|---------|-------------|
| `dev` | Start Nuxt dev server |
| `build` | Build for production |
| `tauri:dev` | Tauri desktop dev mode |
| `tauri:build` | Build Tauri desktop app |
| `tauri:android:init` | Initialize Android project |
| `tauri:android:dev` | Android development |
| `tauri:android:build` | Build Android APK/AAB |
| `tauri:ios:dev` | iOS development (macOS only) |
| `tauri:ios:build` | Build iOS app (macOS only) |
| `web:dev` | Web dev server (SSR enabled) |
| `web:build` | Build for web production (SSR) |
| `web:preview` | Preview web production build |

Root scripts:

| Command | Description |
|---------|-------------|
| `bun run lint` | Lint & auto-fix all packages |
| `bun run typecheck` | Type-check all layers & apps |

## Creating a New Brand App

1. **Create the directory structure:**
   ```sh
   mkdir -p apps/mybrand/app/{components,pages,layouts,assets/css}
   mkdir -p apps/mybrand/public/images
   ```

2. **Create `apps/mybrand/package.json`:**
   ```json
   {
     "name": "@apps/mybrand",
     "private": true,
     "scripts": {
       "dev": "nuxt dev",
       "build": "nuxt build",
       "tauri:dev": "tauri dev",
       "tauri:build": "tauri build",
       "tauri:android:init": "tauri android init",
       "tauri:android:dev": "tauri android dev",
       "tauri:android:build": "tauri android build"
     },
     "dependencies": {
       "@packages/core": "workspace:*"
     }
   }
   ```

3. **Create `apps/mybrand/nuxt.config.ts`:**
   ```ts
   import { resolve } from 'node:path'
   import { defineNuxtConfig } from 'nuxt/config'

   const isTauri = process.env.NUXT_TARGET !== 'web'

   export default defineNuxtConfig({
     extends: ['@packages/core'],
     ssr: !isTauri,
     i18n: {
       locales: [
         { code: 'en', file: 'en.json' },
         { code: 'el', file: 'el.json' },
       ],
     },
     css: [
       '@packages/core/assets/css/main.css',
       './app/assets/css/brand.css',
     ],
     alias: {
       '@packages': resolve(__dirname, '../../packages'),
     },
   })
   ```

4. **Create `apps/mybrand/app/app.config.ts`:**
   ```ts
   export default defineAppConfig({
     brand: {
       name: 'MyBrand',
       author: 'MyBrand Inc.',
       colors: { primary: '#FF6600', primaryDark: '#FF8833' },
       logo: '/images/logo.png',
       metadata: { title: 'MyBrand', description: 'Your app description' },
     },
     nav: {
       items: [
         { labelKey: 'nav.home', icon: 'lucide:house', route: '/' },
         { labelKey: 'nav.account', icon: 'lucide:user', route: '/account' },
       ],
     },
     ui: {
       colors: { primary: 'orange', secondary: 'orange', neutral: 'neutral' },
     },
   })
   ```

5. **Create `apps/mybrand/app/assets/css/brand.css`:**
   ```css
   :root {
     --brand-primary: #FF6600;
     --brand-primary-dark: #FF8833;
     --brand-primary-rgb: 255, 102, 0;
   }
   .dark {
     --brand-primary: #FF8833;
   }
   ```

6. **Add a reference in `tsconfig.json`** (root):
   ```json
   { "path": "./apps/mybrand" }
   ```

7. **Run it:**
   ```sh
   bun install
   bun run app mybrand dev
   ```

## Component Naming

| Location | Convention | Example |
|----------|-----------|---------|
| `packages/core/components/` | Unprefixed | `ProductCard.vue`, `SearchBar.vue` |
| `apps/*/app/components/` | Brand-prefixed | `WeCareHeader.vue`, `WeCareCTACard.vue` |

Core components can expose slots for brand-specific content (e.g., `ProductCard` has a `#meta` slot).

## Internationalization (i18n)

English (default) and Greek, powered by `@nuxtjs/i18n` with the `prefix_except_default` strategy (English at `/`, Greek at `/el/`).

**Two translation patterns:**

| Pattern | Where | How | Translations live in |
|---------|-------|-----|---------------------|
| Component-level | Vue components & pages | `const { t } = useI18n()` + `<i18n lang="yaml">` SFC block | The component's `<i18n>` block |
| Global-level | Composables, Pinia stores, shared strings | `const { $i18n } = useNuxtApp()` + `$i18n.t('key')` | `i18n/locales/*.json` files |

**Decision rule:** If a string is used in only one component, put it in an `<i18n>` block. If shared across components, put it in global locale files.

**Locale files:**
- `packages/core/i18n/locales/{en,el}.json` — shared keys (`nav.*`, `cart.*`, `account.*`, `errors.*`)
- `apps/<brand>/i18n/locales/{en,el}.json` — brand-specific keys (merged with core; requires `i18n.locales` declared in brand's `nuxt.config.ts`)

The `LanguageSwitcher` core component uses Nuxt UI's `ULocaleSelect` for locale switching.

## Architecture Notes

- **Dual build targets:** Tauri mode (default, `ssr: false`) and web mode (`NUXT_TARGET=web`, `ssr: true`). The `isTauri` flag in `nuxt.config.ts` switches behavior.
- **Auto-imports** are enabled for Vue, Nuxt, VueUse composables, Zod, and all types in `packages/core/types/`
- **CSS load order:** Core `main.css` (design tokens & base) -> Brand `brand.css` (color overrides)
- **Tauri dev** uses WebSocket HMR on port 1421. Set `TAURI_DEV_HOST` to your local IP for mobile device testing
- **Desktop splashscreen** coordinates with the frontend via `set_complete` IPC command
- **Tauri-only pages** (e.g., splashscreen) use the `tauri-only` middleware, which redirects web users to `/`
- **Server routes** in `packages/core/server/` are inherited by all brand apps. Health check at `GET /api/health`

## License

MIT License &copy; 2025-PRESENT [VasilisTotskas](https://github.com/vasilistotskas)
