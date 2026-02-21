# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt 4 + Tauri 2 monorepo for multi-brand mobile applications. The **primary focus is mobile** — building native iOS and Android apps via Tauri. Desktop (Windows/macOS/Linux) is supported but secondary. **Web deployment with SSR** is also supported via the `NUXT_TARGET=web` environment variable. Uses **Bun workspaces** as the package manager (requires Bun >= 1.3, Node.js >= 24).

# Project Standards and Rules
- Codebase must be clean, consistent, scalable, and follow best practices
- Use Zod 4 for validation
- Prefer Nuxt UI components
- The Application is still on development mode so we never keep legacy / backward compatibility code
- Do not use `any`
- Do not add `ts-ignore` , `eslint-disable` and such flags
- All code must be SSR-safe when `NUXT_TARGET=web` — no bare `window`/`document` access without `import.meta.server` guards

## Commands

```bash
# Install dependencies
bun install

# Run any app command via the unified runner
bun run app <app-name> <command>

# Development
bun run app wecare dev                 # Nuxt dev server (0.0.0.0:3000)
bun run app wecare tauri:dev           # Tauri desktop dev
bun run app wecare tauri:android:dev   # Android dev
bun run app wecare tauri:ios:dev       # iOS dev (macOS only)

# Production builds
bun run app wecare build               # Nuxt production build
bun run app wecare tauri:build         # Tauri desktop build
bun run app wecare tauri:android:build # Android build
bun run app wecare tauri:ios:build     # iOS build (macOS only)

# Web deployment (SSR enabled)
bun run app wecare web:dev             # Nuxt dev server (SSR, web mode)
bun run app wecare web:build           # Build for web production (SSR)
bun run app wecare web:preview         # Preview web production build

# Scaffold a new brand app
bun run new-brand <brand-name> <identifier> <product-name>

# Lint & typecheck (from root)
bun run lint
bun run typecheck
```

## Architecture

### Monorepo Layout

- `packages/core/` — Shared Nuxt layer (brand-agnostic components, composables, middleware, server routes, shared types, stores, default pages & layouts, base CSS)
- `packages/tauri-core/` — Shared Rust library crate (splashscreen coordination, plugin registration, tray icon, setup state machine)
- `apps/wecare/` — WeCare Pharmacy brand app (extends core layer + tauri-core)
- `scripts/` — Bun CLI scripts: `app.ts` (unified runner), `prepare.ts` (postinstall), `typecheck.ts` (type-check all apps), `new-brand.ts` (scaffold new brand apps)

### Nuxt Layers Pattern

Brand apps extend the core layer (`extends: ['@packages/core']` in nuxt.config.ts). The core layer provides:
- Modules: `@nuxt/ui`, `@vueuse/nuxt`, `reka-ui/nuxt`, `@nuxtjs/i18n`, `@pinia/nuxt`
- Base configuration, composables, shared types, and Pinia stores
- Default pages: shop, cart, favorites, account, product/[id], 404 catch-all
- Default layouts: `default` (with BottomNav) and `blank`
- UI design tokens via CSS variables and `app.config.ts`

Brand apps add: brand-specific CSS (`brand.css`), Tauri config (`src-tauri/`), brand components, brand-specific pages (home, splashscreen), page overrides, and `app/app.config.ts` overrides. A newly scaffolded brand works immediately with all core pages.

### Types & Directory Structure

Types are organized following the Nuxt 4 `shared/` convention to enable code sharing between the Vue app and Nitro server:

- **`packages/core/shared/types/`** — Framework-agnostic types shared between app and server. Auto-imported by Nuxt in both contexts. Contains: `product.ts` (Product, Category, ProductBadge), `api.ts` (Zod validation schemas), `brand.ts` (BrandConfig), `navigation.ts` (NavItem), `content.ts` (Banner, TrendingItem).
- **`packages/core/shared/data/`** — Shared data (mock data for development). Used by both app composables and server routes via relative imports.
- **`packages/core/types/`** — App-only type declarations. Contains: `tauri.ts` (Window augmentation for `__TAURI_INTERNALS__`), `tauri-plugins.d.ts` (ambient module declarations for Tauri plugins installed in brand apps).
- **`apps/<brand>/app/types/`** — Brand-specific UI types (e.g., `WeCareProductMeta`).

**Key rule:** Types in `shared/types/` are auto-imported — do NOT use explicit `import type { Product } from '../types/product'` in components, composables, or stores. The `Product`, `Category`, `BrandConfig`, `NavItem` types are globally available. Use explicit imports only for non-auto-imported paths like `shared/data/mock/`.

**Note on layers:** The `#shared` alias resolves to the consuming **app's** `shared/` directory, not the layer's. In layer code (packages/core), always use **relative imports** (e.g., `../shared/data/mock/products`) instead of `#shared`.

### Pages & Layouts

**Core provides default pages** in `packages/core/pages/` that work out of the box for any brand:
- `shop.vue` — product listing with search and category filters
- `favorites.vue` — saved products
- `cart.vue` — cart with suggested products and configurable info section
- `account.vue` — account page with configurable menu items
- `product/[id].vue` — product detail page
- `[...all].vue` — 404 catch-all

**Core provides default layouts** in `packages/core/layouts/`:
- `default.vue` — centered container with BottomNav
- `blank.vue` — empty wrapper (for splashscreen, etc.)

**Brand page overrides:** To customize a core page, create a page at the same path in the brand app's `app/pages/` directory. Nuxt layers give the consuming app's pages priority. For example, WeCare overrides `product/[id].vue` to add caresPoints display.

**Brand-specific pages** like `index.vue` (home) and `splashscreen.vue` live only in the brand app — they are inherently brand-specific and not provided by core.

### Brand Configuration

Brand apps define their identity in `app/app.config.ts` (inside `srcDir`, required for SSR) with these sections:
- `brand` — name, author, colors, logo, metadata (typed via `BrandConfig` interface)
- `nav.items` — navigation items array (consumed by `useNavigation()` composable)
- `account.menuItems` — account page menu items array. Each item has `labelKey` (i18n key), `icon`, and `route`. Core pages and BottomNav fall back to generic defaults (Orders, Purchased, Settings, Help) if empty.
- `cart.supportPhone` — phone number for telephone orders (shown in cart info section if non-empty)
- `cart.freeShippingThreshold` — free shipping threshold (shown in cart info section if non-empty)

Core provides empty defaults; brand apps populate them. The `useNavigation()` composable reads items from `appConfig.nav.items` and adds active-state logic.

### Data Layer & State Management

**API service pattern:** The data layer uses a repository composable pattern with mock/live switching:

- `useApiClient()` — reads `runtimeConfig.public.apiBase`. Empty string = mock mode, real URL = live mode.
- `useProducts(options?)` — fetches products with optional reactive `category` and `search` refs. Each caller should pass a unique `key` to avoid `useAsyncData` cache collisions.
- `useProduct(id)` — fetches a single product. Accepts `MaybeRef<string | number>` for reactive route params.
- `useCategories()` — fetches product categories.

**Switching from mock to live API:** Set `NUXT_PUBLIC_API_BASE=https://api.example.com` — zero page-level changes needed.

**Server routes:** `packages/core/server/api/products/` provides mock API endpoints for web SSR mode. These proxy to mock data during development and can be replaced with real API proxying later.

**Pinia stores** (`packages/core/stores/`):
- `useCartStore` — cart items, add/remove/update, computed totals
- `useFavoritesStore` — favorite product IDs (array, not Set — must be JSON-serializable for SSR hydration)
- `useAuthStore` — user state, token, authentication status
- `defineStore`, `storeToRefs`, `acceptHMRUpdate` are auto-imported by `@pinia/nuxt`
- Stores live in `packages/core/stores/` and are auto-imported via Pinia's `storesDirs` config
- Store state **must** use JSON-serializable types only (no `Set`, `Map`, `Date` objects in refs) for Pinia SSR hydration

### SSR Safety

All code must work in both Tauri mode (CSR) and web mode (SSR). Key rules:

- **Data fetching:** Always use `useAsyncData` or `useFetch` — never raw `fetch` in setup. Pass reactive refs (not `.value`) for params that change. Give each `useAsyncData` call a unique `key`.
- **Browser APIs:** Guard `window`/`document` access with `import.meta.server` or `onMounted`. Use `useTauriAvailable()` composable which already has this guard.
- **Stores in templates:** Always call `useCartStore()` / `useFavoritesStore()` in `<script setup>`, never inline in template event handlers (e.g., `@click="useCartStore().addItem(product)"` is wrong — call it once in setup and reference the variable).
- **Pinia SSR hydration:** State is serialized to JSON on server and hydrated on client. Only use JSON-serializable types in store refs.

### CSS Architecture

**Nuxt UI design tokens:** Nuxt UI provides semantic utility classes that automatically handle light/dark mode. Always use these instead of hardcoded hex colors or verbose `text-(--ui-*)` arbitrary value syntax:
- **Text:** `text-default`, `text-muted`, `text-dimmed`, `text-toned`, `text-highlighted`, `text-inverted`
- **Background:** `bg-default`, `bg-muted`, `bg-elevated`, `bg-accented`, `bg-inverted`
- **Border:** `border-default`, `border-muted`, `border-accented`, `border-inverted`
- **Semantic colors:** `text-primary`, `text-secondary`, `text-success`, `text-info`, `text-warning`, `text-error` (plus `bg-*` / `border-*` variants)

**Custom overrides in `main.css`:** The `--ui-*` CSS variables are customized in `:root` and `.dark` blocks to match the design spec (e.g., `--ui-text: #000000` instead of Nuxt UI's default `neutral-700`). These override Nuxt UI's auto-generated values from the neutral palette.

**Brand colors:** Custom `--brand-primary` / `--brand-primary-dark` CSS variables are defined in core `main.css` (with fallback defaults) and overridden by each brand's `brand.css`. Utility classes `text-brand`, `bg-brand`, `text-brand-dark`, `bg-brand-dark` are available via `@layer utilities`. These are registered in `@theme` so Tailwind generates matching `text-brand-*` / `bg-brand-*` classes.

**Semantic colors in `app.config.ts`:** Set `ui.colors.primary`, `ui.colors.secondary`, `ui.colors.neutral` to any Tailwind palette name (e.g., `'cyan'`). This drives all Nuxt UI component colors and the `text-primary` / `bg-primary` utility classes.

**Load order:** Core `main.css` → brand `brand.css`. TailwindCSS v4 with `@import` syntax. Custom utility classes in `@layer utilities`.

### Component Patterns

- Core components: unprefixed (`ProductCard.vue`, `BottomNav.vue`, `AccountMenuItem.vue`)
- Brand components: brand-prefixed (`WeCareHeader.vue`, `WeCareCTACard.vue`)
- Core `ProductCard` exposes a `#meta` slot for brand-specific content (e.g., `WeCareProductCard` fills it with cares points)
- `Product<TMeta>` is generic — brand apps define typed meta (e.g., `WeCareProductMeta { caresPoints?: number }`)

### Build Targets

Brand apps support two build targets controlled by the `NUXT_TARGET` env var:

- **Tauri mode** (default, `NUXT_TARGET` unset or any value except `web`): `ssr: false`, Tauri-specific Vite config (HMR on port 1421, `TAURI_` env prefix), devServer binds to `TAURI_DEV_HOST` / `0.0.0.0`. This is the standard mode for native mobile & desktop builds.
- **Web mode** (`NUXT_TARGET=web`): `ssr: true`, clean Vite config for web, devServer uses Nuxt defaults (localhost). Server routes in `packages/core/server/` and brand `server/` directories are active.

The `isTauri` flag (`process.env.NUXT_TARGET !== 'web'`) in `nuxt.config.ts` conditionally applies Tauri-specific devServer, Vite envPrefix, and HMR hooks. The `new-brand` scaffold generates this pattern automatically.

Tauri-only pages (e.g., splashscreen) use the `tauri-only` middleware from core, which redirects non-Tauri users to `/` and is SSR-safe.

### Server Routes

Core server routes live in `packages/core/server/` and are inherited by all brand apps via Nuxt layers. Brand apps can add their own in `apps/<brand>/server/`. Routes include:
- `GET /api/health` — health check
- `GET /api/products` — product listing (supports `?category=` and `?search=` query params)
- `GET /api/products/:id` — single product by ID

### Key Conventions

- SSR is disabled by default in brand apps (Tauri mode); enabled when `NUXT_TARGET=web`
- Auto-imports enabled for Vue, Nuxt, VueUse composables, Pinia (`defineStore`, `storeToRefs`), and Zod (`z` and `zInfer` type)
- Types in `packages/core/shared/types/` are auto-imported to both app and server
- Path alias: `@packages` → `packages/` (defined in brand app `nuxt.config.ts`)
- Nuxt UI v4 for component library with `app.config.ts` theming
- Page and layout transitions configured (`page` and `layout` names, `out-in` mode)
- Hardcoded hex colors are not allowed in templates — use Nuxt UI semantic classes (`text-default`, `bg-muted`, `border-default`, `text-brand`, etc.)

### ESLint

Uses `@antfu/eslint-config` with `eslint-plugin-better-tailwindcss` (config in `eslint.config.mjs`). The Tailwind plugin entry point is `packages/core/assets/css/main.css`. NuxtUI semantic classes (e.g., `text-primary*`, `bg-elevated*`, `text-default*`) are allowlisted. `console.log` is permitted; `vue/multi-word-component-names` is off.

### i18n

- Module: `@nuxtjs/i18n` configured in `packages/core/nuxt.config.ts` (inherited by all brands)
- Default locale: English (`en`), also supports Greek (`el`)
- Strategy: `prefix_except_default` (English URLs have no prefix, Greek gets `/el/`)
- Lazy-loaded locale files in JSON format
- `LanguageSwitcher` component in core uses Nuxt UI's `ULocaleSelect` with `useSwitchLocalePath()` for locale switching
- All locale-aware navigation uses `useLocalePath()` / `useSwitchLocalePath()`

**Translation file locations:**
- `packages/core/i18n/locales/{en,el}.json` — shared global translations (nav, cart, account, errors, shop, favorites, product)
- `apps/<brand>/i18n/locales/{en,el}.json` — brand-specific global translations (auto-merged with core)

**Global locale file keys (core):**
- `nav.*` — navigation labels (`home`, `shop`, `cart`, `favorites`, `account`)
- `cart.*` — cart page (`title`, `empty`, `youMightLike`, `freeShipping`, `freeShippingDesc`, `telephoneOrders`)
- `shop.*` — shop page (`title`, `allCategories`, `noResults`, `noResultsDesc`)
- `favorites.*` — favorites page (`title`, `empty`, `emptyDesc`)
- `product.*` — product detail page (`addToCart`, `description`, `inStock`, `reviews`, `save`)
- `account.*` — account page (`title`, `myOrders`, `purchasedProducts`, `accountSettings`, `language`, `help`, `logIn`, `changePassword`, `shippingTerms`, `returnPolicy`, `termsOfUse`, `privacyPolicy`, `cookies`)
- `errors.*` — error pages (`pageNotFound`, `pageNotFoundDesc`, `goHome`, `somethingWentWrong`, `errorDesc`, `tryAgain`)

**Global locale file keys (WeCare brand):**
- `wecare.*` — brand terms (`carePointsAndDiscounts`, `onlinePharmacy`)

**Two translation patterns:**

1. **Component-level** (Vue components/pages): Use `const { t } = useI18n()` with `<i18n lang="yaml">` SFC blocks for strings used only in that component. The `t()` function accesses component-scoped translations defined in the `<i18n>` block.

```vue
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UButton :label="t('addToCart')" />
</template>

<i18n lang="yaml">
en:
  addToCart: Add to Cart
el:
  addToCart: Προσθήκη στο καλάθι
</i18n>
```

2. **Global-level** (Pinia stores, composables, and components accessing shared translations): Use `const { $i18n } = useNuxtApp()` and `$i18n.t('key')` to access translations from `i18n/locales` files.

```ts
// In a composable or store
const { $i18n } = useNuxtApp()
const label = $i18n.t('account.title')
```

```vue
<!-- In a template -->
<template>
  <h1>{{ $i18n.t('cart.title') }}</h1>
</template>
```

**Decision rule:** If a string is used in only one component, put it in an `<i18n>` block. If shared across multiple components or part of a domain (nav, account, cart), put it in global locale files.

**Navigation:** Nav items use `labelKey` (i18n key, e.g. `'nav.home'`) instead of `label`. The `useNavigation()` composable resolves labels via `$i18n.t()` at render time.

### Tauri

**Cargo workspace:** Root `Cargo.toml` defines a workspace with members `packages/tauri-core` and `apps/*/src-tauri`. Dependencies are centralized via `[workspace.dependencies]`.

**Shared crate (`packages/tauri-core/`):** Contains all brand-agnostic Rust code:
- `SetupState` — tracks splashscreen coordination (frontend + backend tasks)
- `set_complete` IPC command — called by frontend and backend to signal readiness
- `default_backend_setup` — async 2-second setup task
- `setup_tray` — desktop-only system tray with quit menu
- `base_builder()` — returns `tauri::Builder` with all plugins and state pre-configured
- `run(context, config)` — full app runner for zero-customization brands

**Registered Tauri plugins:** shell, notification, os, fs, store, http, deep-link, biometric, barcode-scanner, geolocation, mcp-bridge (debug only)

**Core Tauri composables** (`packages/core/composables/`):
- `useTauriAvailable()` — SSR-safe check for Tauri environment
- `useBiometric()` — fingerprint/Face ID authentication
- `useBarcodeScanner()` — barcode/QR code scanning
- `useTauriGeolocation()` — GPS location (named to avoid VueUse conflict)

**Two usage levels for brand apps:**
- **Simple** (no custom IPC): `tauri_core::run(tauri::generate_context!(), AppConfig::default())` — 4 lines in `lib.rs`
- **Custom IPC**: Use `tauri_core::base_builder()`, add own `invoke_handler` + `setup`, call `.run(context)` — full control

**Brand app `src-tauri/` contains only:** `Cargo.toml` (depends on `tauri-core`), thin `lib.rs`/`main.rs`, `build.rs`, `tauri.conf.json` (brand identity), `tauri.android.conf.json`, `capabilities/main.json`, `icons/`

**Plugin crates** must be listed as direct dependencies in each brand app's `Cargo.toml` (Tauri's capability resolver requires this). The actual `.init()` calls happen in `tauri-core`.

**Scaffold new brand:** `bun run new-brand <name> <identifier> <product-name>` generates the full app skeleton. After scaffolding, add the app to root `Cargo.toml` workspace members.

**Other details:**
- Desktop uses a splashscreen window that coordinates with the frontend via `set_complete` IPC command
- Tauri dev uses WebSocket HMR on port 1421
- `TAURI_DEV_HOST` env var controls the dev server host for device testing (set to your machine's local IP for mobile)
- Android config in `tauri.android.conf.json`, iOS config in `tauri.ios.conf.json`
- MCP bridge plugin is included in debug builds only
