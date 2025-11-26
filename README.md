<p align="center">
    <img width="150" src="./apps/wecare/public/images/wecare-logo.png" alt="logo">
</p>
<h1 align="center">Nuxt Tauri Monorepo</h1>
<p align="center">
Made with <a href="https://nuxt.com">Nuxt 4</a> and <a href="https://v2.tauri.app">Tauri 2</a>
<br>
Build super fast desktop and mobile applications with multi-brand support!
</p>

<br />

<p align="center">Powered by Nuxt 4 Layers</p>

<br />

## Monorepo Structure

This project uses a Bun workspaces monorepo architecture with Nuxt layers for code sharing:

```
├── packages/
│   └── core/                    # Shared Nuxt layer
│       ├── components/          # Brand-agnostic components
│       ├── composables/         # Shared composables
│       ├── types/               # Shared TypeScript types
│       └── assets/css/          # Base styles (Tailwind)
│
├── apps/
│   └── wecare/                  # WeCare brand app
│       ├── app/
│       │   ├── components/      # Brand-specific components
│       │   ├── pages/
│       │   ├── layouts/
│       │   └── assets/css/      # Brand-specific styles
│       ├── src-tauri/           # Tauri config (desktop/mobile)
│       └── public/              # Static assets
│
├── scripts/
│   └── app.ts                   # Dynamic app runner
│
├── eslint.config.mjs            # ESLint configuration
├── tsconfig.json                # TypeScript project references
└── package.json                 # Workspaces & scripts
```

## Technologies run-down

- Nuxt v4 with Layers
- Tauri v2
- NuxtUI v4
- TailwindCSS v4
- Bun Workspaces
- Typescript
- ESLint

## Quick Start

```sh
# Install dependencies
$ bun install

# Start WeCare development
$ bun run app wecare dev

# Start WeCare with Tauri
$ bun run app wecare tauri:dev
```

## Available Scripts

The monorepo uses a dynamic app runner. Use `bun run app <app-name> <command>`:

| Command | Description |
|---------|-------------|
| `bun run app <app> dev` | Start Nuxt dev server |
| `bun run app <app> build` | Build for production |
| `bun run app <app> generate` | Generate static site |
| `bun run app <app> preview` | Preview production build |
| `bun run app <app> tauri:dev` | Start Tauri dev mode |
| `bun run app <app> tauri:build` | Build Tauri app |
| `bun run app <app> tauri:build:debug` | Build Tauri app (debug) |
| `bun run app <app> tauri:android:init` | Initialize Android project |
| `bun run app <app> tauri:android:dev` | Start Android development |
| `bun run app <app> tauri:android:build` | Build Android APK/AAB |
| `bun lint` | Run ESLint across all packages |

### Examples

```sh
# WeCare app
bun run app wecare dev
bun run app wecare tauri:build
bun run app wecare tauri:android:dev

# Future apps (e.g., newbrand)
bun run app newbrand dev
bun run app newbrand tauri:build
```

## Creating a New Brand App

1. Create a new directory under `apps/`:
   ```sh
   mkdir -p apps/newbrand/app/{components,pages,layouts,assets/css}
   ```

2. Create `apps/newbrand/package.json`:
   ```json
   {
     "name": "@apps/newbrand",
     "dependencies": {
       "@packages/core": "workspace:*"
     }
   }
   ```

3. Create `apps/newbrand/nuxt.config.ts`:
   ```typescript
   export default defineNuxtConfig({
     extends: ['@packages/core'],
     // Brand-specific configuration
   })
   ```

4. Create `apps/newbrand/app.config.ts` with brand configuration:
   ```typescript
   export default defineAppConfig({
     brand: {
       name: 'NewBrand',
       colors: {
         primary: '#yourcolor',
         primaryDark: '#yourdarkcolor',
       },
       logo: '/images/logo.png',
     },
   })
   ```

5. Run your new app (no additional configuration needed!):
   ```sh
   bun run app newbrand dev
   bun run app newbrand tauri:dev
   ```

## Component Naming Convention

| Location | Naming | Example |
|----------|--------|---------|
| `packages/core/components/` | No prefix | `ProductCard.vue` |
| `apps/*/app/components/` | Brand prefix | `WeCareHeader.vue` |

## Setup Prerequisites

- Configure your environment with Rust: [Tauri docs](https://tauri.app/start/prerequisites)
- Install Bun: https://bun.sh
- Node.js >= 23

## Build

```sh
# Build WeCare for production
$ bun run app wecare build

# Build WeCare Tauri app
$ bun run app wecare tauri:build
```

## Android Build

### Prerequisites
- Android Studio with SDK installed
- Android NDK
- Rust Android targets:
  ```sh
  rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
  ```

### Setup
```sh
# Initialize Android project
$ bun run app wecare tauri:android:init

# Development
$ bun run app wecare tauri:android:dev

# Build APK/AAB
$ bun run app wecare tauri:android:build
```

## Notes

- Nuxt SSR is disabled for Tauri compatibility
- Brand apps extend the core layer via `nuxt.config.ts`
- CSS variables (`--brand-primary`, `--brand-primary-dark`) can be overridden per brand
- Tauri permissions are managed in `src-tauri/capabilities/main.json`

## License

MIT License © 2025-PRESENT [VasilisTotskas](https://github.com/vasilistotskas)
