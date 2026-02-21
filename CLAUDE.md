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

- `packages/core/` — Shared Nuxt layer (brand-agnostic components, composables, middleware, server routes, types, base CSS)
- `packages/tauri-core/` — Shared Rust library crate (splashscreen coordination, plugin registration, tray icon, setup state machine)
- `apps/wecare/` — WeCare Pharmacy brand app (extends core layer + tauri-core)
- `scripts/` — Bun CLI scripts: `app.ts` (unified runner), `prepare.ts` (postinstall), `typecheck.ts` (type-check all apps), `new-brand.ts` (scaffold new brand apps)

### Nuxt Layers Pattern

Brand apps extend the core layer (`extends: ['@packages/core']` in nuxt.config.ts). The core layer provides:
- Modules: `@nuxt/ui`, `@vueuse/nuxt`, `reka-ui/nuxt`
- Base configuration, composables, and shared types
- UI design tokens via CSS variables and `app.config.ts`

Brand apps add: brand-specific CSS (`brand.css`), Tauri config (`src-tauri/`), brand components, pages, and `app/app.config.ts` overrides.

### Brand Configuration

Brand apps define their identity in `app/app.config.ts` (inside `srcDir`, required for SSR) with two key sections:
- `brand` — name, author, colors, logo, metadata (typed via `BrandConfig` interface)
- `nav.items` — navigation items array (consumed by `useNavigation()` composable)

Core provides empty defaults; brand apps populate them. The `useNavigation()` composable reads items from `appConfig.nav.items` and adds active-state logic.

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

- Core components: unprefixed (`ProductCard.vue`, `BottomNav.vue`)
- Brand components: brand-prefixed (`WeCareHeader.vue`, `WeCareCTACard.vue`)
- Core `ProductCard` exposes a `#meta` slot for brand-specific content (e.g., `WeCareProductCard` fills it with cares points)
- Product data uses `meta?: Record<string, unknown>` for brand-extensible metadata

### Build Targets

Brand apps support two build targets controlled by the `NUXT_TARGET` env var:

- **Tauri mode** (default, `NUXT_TARGET` unset or any value except `web`): `ssr: false`, Tauri-specific Vite config (HMR on port 1421, `TAURI_` env prefix), devServer binds to `TAURI_DEV_HOST` / `0.0.0.0`. This is the standard mode for native mobile & desktop builds.
- **Web mode** (`NUXT_TARGET=web`): `ssr: true`, clean Vite config for web, devServer uses Nuxt defaults (localhost). Server routes in `packages/core/server/` and brand `server/` directories are active.

The `isTauri` flag (`process.env.NUXT_TARGET !== 'web'`) in `nuxt.config.ts` conditionally applies Tauri-specific devServer, Vite envPrefix, and HMR hooks. The `new-brand` scaffold generates this pattern automatically.

Tauri-only pages (e.g., splashscreen) use the `tauri-only` middleware from core, which redirects non-Tauri users to `/` and is SSR-safe.

### Server Routes

Core server routes live in `packages/core/server/` and are inherited by all brand apps via Nuxt layers. Brand apps can add their own in `apps/<brand>/server/`. The starter health route is at `GET /api/health`.

### Key Conventions

- SSR is disabled by default in brand apps (Tauri mode); enabled when `NUXT_TARGET=web`
- Auto-imports enabled for Vue, Nuxt, VueUse composables, and Zod (`z` and `zInfer` type)
- Types in `packages/core/types/` are auto-imported
- Path alias: `@packages` → `packages/` (defined in brand app `nuxt.config.ts`)
- Nuxt UI v4 for component library with `app.config.ts` theming
- Page and layout transitions configured (`page` and `layout` names, `out-in` mode)
- Hardcoded hex colors are not allowed in templates — use Nuxt UI semantic classes (`text-default`, `bg-muted`, `border-default`, `text-brand`, etc.)

### ESLint

Uses `@antfu/eslint-config` with `eslint-plugin-better-tailwindcss` (config in `eslint.config.mjs`). The Tailwind plugin entry point is `packages/core/assets/css/main.css`. NuxtUI semantic classes (e.g., `text-primary*`, `bg-elevated*`, `text-default*`) are allowlisted. `console.log` is permitted; `vue/multi-word-component-names` is off.

### Tauri

**Cargo workspace:** Root `Cargo.toml` defines a workspace with members `packages/tauri-core` and `apps/*/src-tauri`. Dependencies are centralized via `[workspace.dependencies]`.

**Shared crate (`packages/tauri-core/`):** Contains all brand-agnostic Rust code:
- `SetupState` — tracks splashscreen coordination (frontend + backend tasks)
- `set_complete` IPC command — called by frontend and backend to signal readiness
- `default_backend_setup` — async 2-second setup task
- `setup_tray` — desktop-only system tray with quit menu
- `base_builder()` — returns `tauri::Builder` with all plugins and state pre-configured
- `run(context, config)` — full app runner for zero-customization brands

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
