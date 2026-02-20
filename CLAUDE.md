# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt 4 + Tauri 2 monorepo for multi-brand mobile applications. The **primary focus is mobile** — building native iOS and Android apps via Tauri. Desktop (Windows/macOS/Linux) is supported but secondary. Uses **Bun workspaces** as the package manager (requires Bun >= 1.3, Node.js >= 24).

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

# Lint & typecheck (from root)
bun run lint
bun run typecheck
```

## Architecture

### Monorepo Layout

- `packages/core/` — Shared Nuxt layer (brand-agnostic components, composables, types, base CSS)
- `apps/wecare/` — WeCare Pharmacy brand app (extends core layer)
- `scripts/` — Bun CLI scripts: `app.ts` (unified runner), `prepare.ts` (postinstall), `typecheck.ts` (type-check all apps)

### Nuxt Layers Pattern

Brand apps extend the core layer (`extends: ['@packages/core']` in nuxt.config.ts). The core layer provides:
- Modules: `@nuxt/ui`, `@vueuse/nuxt`, `reka-ui/nuxt`
- Base configuration, composables, and shared types
- UI design tokens via CSS variables and `app.config.ts`

Brand apps add: brand-specific CSS (`brand.css`), Tauri config (`src-tauri/`), brand components, pages, and `app.config.ts` overrides.

### Brand Configuration

Brand apps define their identity in `app.config.ts` with two key sections:
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

### Key Conventions

- SSR is disabled in brand apps (Tauri requirement)
- Auto-imports enabled for Vue, Nuxt, VueUse composables, and Zod (`z` and `zInfer` type)
- Types in `packages/core/types/` are auto-imported
- Path alias: `@packages` → `packages/` (defined in brand app `nuxt.config.ts`)
- Nuxt UI v4 for component library with `app.config.ts` theming
- Page and layout transitions configured (`page` and `layout` names, `out-in` mode)
- Hardcoded hex colors are not allowed in templates — use Nuxt UI semantic classes (`text-default`, `bg-muted`, `border-default`, `text-brand`, etc.)

### ESLint

Uses `@antfu/eslint-config` with `eslint-plugin-better-tailwindcss` (config in `eslint.config.mjs`). The Tailwind plugin entry point is `packages/core/assets/css/main.css`. NuxtUI semantic classes (e.g., `text-primary*`, `bg-elevated*`, `text-default*`) are allowlisted. `console.log` is permitted; `vue/multi-word-component-names` is off.

### Tauri

Each brand app has a `src-tauri/` directory with Rust backend config. Key details:
- Desktop uses a splashscreen window that coordinates with the frontend via `set_complete` IPC command
- Tauri dev uses WebSocket HMR on port 1421
- `TAURI_DEV_HOST` env var controls the dev server host for device testing (set to your machine's local IP for mobile)
- Android config in `tauri.android.conf.json`, iOS config in `tauri.ios.conf.json`
- MCP bridge plugin is included in debug builds only
