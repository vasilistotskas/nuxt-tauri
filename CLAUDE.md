# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt 4 + Tauri 2 monorepo for multi-brand desktop/mobile applications. Uses **Bun workspaces** as the package manager (requires Node.js >= 23).

## Commands

```bash
# Install dependencies
bun install

# Run any app command via the unified runner
bun run app <app-name> <command>
# Examples:
bun run app wecare dev            # Nuxt dev server (0.0.0.0:3000)
bun run app wecare build          # Production build
bun run app wecare tauri:dev      # Tauri desktop dev
bun run app wecare tauri:build    # Build Tauri desktop app
bun run app wecare tauri:android:dev   # Android dev

# Lint (from root)
bun run lint
```

## Architecture

### Monorepo Layout

- `packages/core/` — Shared Nuxt layer (brand-agnostic components, composables, types, base CSS)
- `apps/wecare/` — WeCare Pharmacy brand app (extends core layer)
- `scripts/app.ts` — Unified CLI runner that routes commands to app workspaces via `bun --filter`

### Nuxt Layers Pattern

Brand apps extend the core layer (`extends: ['@packages/core']` in nuxt.config.ts). The core layer provides modules (@nuxt/ui, @vueuse/nuxt, reka-ui/nuxt), base configuration, and shared code. Brand apps add SSR/CSR settings, brand-specific CSS, Tauri config, and their own components/pages.

### CSS Cascade

Brand apps load styles in order: core `main.css` → brand `main.css`. Brand-specific CSS variables (`--brand-primary`, `--brand-primary-dark`) override core defaults. TailwindCSS v4 with `@import` syntax. Custom utility classes are defined in `@layer utilities`.

### Component Naming

- Core components: unprefixed (`ProductCard.vue`, `BottomNav.vue`)
- Brand components: brand-prefixed (`WeCareHeader.vue`, `WeCareCTACard.vue`)

### Key Conventions

- SSR is disabled in brand apps (Tauri requirement)
- Auto-imports enabled for Vue, Nuxt, VueUse composables, and Zod (`z` and `zInfer` type)
- Types in `packages/core/types/` are auto-imported
- Path aliases: `@packages/*` → `packages/*`, `@apps/*` → `apps/*`
- Nuxt UI v4 for component library with app.config.ts theming
- Page and layout transitions configured (`page` and `layout` names, `out-in` mode)

### ESLint

Uses `@antfu/eslint-config` with `eslint-plugin-better-tailwindcss`. The Tailwind plugin entry point is `packages/core/assets/css/main.css`. NuxtUI semantic classes (e.g., `text-primary*`, `bg-elevated*`) are allowlisted. `console.log` is permitted; `vue/multi-word-component-names` is off.

### Tauri

Each brand app has a `src-tauri/` directory with Rust backend config. Tauri dev uses WebSocket HMR on port 1421. The `TAURI_DEV_HOST` env var controls the HMR host for device testing.
