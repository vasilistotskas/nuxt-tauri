---
name: new-brand
description: Scaffold a new brand app in the monorepo with full Nuxt + Tauri setup
disable-model-invocation: true
---

# New Brand Scaffold

Scaffold a new brand app in the Nuxt 4 + Tauri 2 monorepo.

## Arguments

The user must provide:
- **brand-name** — Lowercase kebab-case (e.g., `pharmaplus`)
- **identifier** — Reverse-domain bundle ID (e.g., `com.pharmaplus.app`)
- **product-name** — Human-readable display name (e.g., `"PharmaPlus"`)

If any argument is missing, ask the user before proceeding.

## Steps

### 1. Validate inputs

- Ensure `brand-name` is lowercase kebab-case (letters, numbers, hyphens only)
- Ensure `identifier` follows reverse-domain format (e.g., `com.example.app`)
- Ensure `product-name` is provided and non-empty
- Confirm the app does NOT already exist at `apps/<brand-name>/`

### 2. Run the scaffold script

```bash
bun run new-brand <brand-name> <identifier> "<product-name>"
```

Verify the command succeeds and the directory `apps/<brand-name>/` was created.

### 3. Add to Cargo workspace

Edit the root `Cargo.toml` to add the new app to `[workspace] members`:

```toml
members = [
  "packages/tauri-core",
  "apps/wecare/src-tauri",
  "apps/<brand-name>/src-tauri",
]
```

### 4. Install dependencies

```bash
bun install
```

### 5. Customize brand identity

Ask the user for their brand colors and preferred Tailwind palette, then update:

- `apps/<brand-name>/app/assets/css/brand.css` — Set `--brand-primary`, `--brand-primary-dark`, and `--brand-primary-rgb`
- `apps/<brand-name>/app.config.ts` — Update `brand.colors`, `brand.logo`, `brand.metadata`, `ui.colors.primary`, and `ui.colors.secondary`

### 6. Verify the setup

Run a cargo check to ensure the Rust workspace compiles:

```bash
cargo check --manifest-path apps/<brand-name>/src-tauri/Cargo.toml
```

### 7. Print summary

Tell the user:
- The app was scaffolded at `apps/<brand-name>/`
- Remaining manual steps:
  - Replace placeholder icons in `apps/<brand-name>/src-tauri/icons/`
  - Add brand-specific pages and components
  - Run `bun run app <brand-name> tauri:dev` to start developing
