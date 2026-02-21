---
name: new-page
description: Scaffold a new Nuxt page with layout, i18n, Nuxt UI components, optional middleware, and proper routing conventions
disable-model-invocation: true
---

# New Page

Scaffold a new Nuxt page in the Nuxt 4 + Tauri 2 monorepo.

## Arguments

The user must provide:
- **page-name** — The page file name / route path (e.g., `favorites`, `shop/[id]`, `settings/profile`)
- **brand** — The brand app to create the page in (e.g., `wecare`)

Optional:
- **description** — What the page displays (used to infer layout, components, and content)
- **tauri-only** — Whether the page should only be accessible in Tauri (native) builds (default: `false`)

If any required argument is missing, ask the user before proceeding.

Pages live in brand apps, not in core. Core provides shared components, composables, and layouts — not pages.

## Steps

### 1. Determine the page path and route

**File path:** `apps/<brand>/app/pages/<page-name>.vue`

Examples:
- `favorites` → `apps/wecare/app/pages/favorites.vue` → route `/favorites`
- `shop/[id]` → `apps/wecare/app/pages/shop/[id].vue` → route `/shop/:id`
- `settings/profile` → `apps/wecare/app/pages/settings/profile.vue` → route `/settings/profile`

For nested routes, create parent directories as needed.

Verify the file does NOT already exist before proceeding.

### 2. Choose the layout

Available layouts (in `apps/<brand>/app/layouts/`):

- **`default`** — Standard page with BottomNav, centered container (max-w responsive), bottom padding for safe area. Use for most pages.
- **`blank`** — No chrome, just `<slot />`. Use for splashscreen, error pages, or full-screen experiences.

Default to `default` unless the user specifies otherwise or the page is a special case (splashscreen, error, full-screen modal).

### 3. Plan the page structure

Before writing code, plan:

**Data** — What data the page needs. Use `ref()` or `reactive()` for local state, composables for shared state.

**Components** — Identify which existing components to use (core and brand). Check what's available:
- Core: `ProductCard`, `BannerCarousel`, `CategoryTabs`, `SearchBar`, `TrendingSection`, `ProductSection`, `BottomNav`, `LanguageSwitcher`, `EmptyCartIllustration`
- Brand (WeCare): `WeCareHeader`, `WeCareProductCard`, `WeCareCTACard`, `WeCareAccountMenuItem`

**Nuxt UI components** — Always prefer Nuxt UI over custom HTML:
- Page structure: `UContainer`, `UPage`, `USeparator`, `UCard`
- Lists/grids: `UCarousel`, `UTable`, `UAccordion`
- Actions: `UButton`, `UDropdownMenu`, `UModal`, `UDrawer`
- Forms: `UForm` + Zod schema, `UFormField`, `UInput`, `USelect`, `UTextarea`, `USwitch`
- State: `UEmpty` (empty states), `USkeleton` (loading), `UProgress`
- Navigation: `UTabs`, `UBreadcrumb`, `UPagination`, `UStepper`
- Feedback: `UToast` (via `useToast()`), `UAlert`, `UBadge`

When unsure about a Nuxt UI component's API, use the `mcp__nuxt-ui-remote__get-component` tool to look up its props, slots, and usage.

### 4. Write the page

Follow this structure:

```vue
<script setup lang="ts">
// 1. Page meta
definePageMeta({
  layout: 'default',
  // middleware: 'tauri-only',  // only if tauri-only page
})

// 2. Composables
const { t } = useI18n()
const localePath = useLocalePath()

// 3. State and data
const items = ref([])

// 4. Computed properties

// 5. Methods / handlers
</script>

<template>
  <!-- Page content -->
</template>

<i18n lang="yaml">
en:
  title: Page Title
el:
  title: Τίτλος σελίδας
</i18n>
```

#### Template conventions

**Page header pattern** — Most pages follow this:
```vue
<template>
  <div>
    <!-- Page header -->
    <h1 class="text-center text-2xl font-bold text-default">
      {{ t('title') }}
    </h1>
    <USeparator class="my-4" />

    <!-- Page content -->
  </div>
</template>
```

**Responsive spacing** — Follow existing patterns:
- Between sections: `mb-5 md:mb-10`
- Page padding: handled by layout (don't add extra `px-*` at page level)
- Content gaps: `gap-4 md:gap-6`

**Mobile vs Desktop patterns** — Common approach:
- Mobile: `UCarousel` for horizontal scrolling
- Desktop: CSS Grid (`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4`)
- Use `hidden md:block` / `md:hidden` for layout switching

**Empty states** — Use `UEmpty` or `EmptyCartIllustration` pattern:
```vue
<UEmpty
  icon="lucide:heart"
  :title="t('emptyTitle')"
  :description="t('emptyDescription')"
/>
```

#### Script conventions

- **No `any`** — Use proper TypeScript types
- **No `ts-ignore` or `eslint-disable`**
- **Auto-imports** — Do NOT manually import `ref`, `computed`, `useRoute`, `useRouter`, `useI18n`, `useLocalePath`, `useColorMode`, `useAppConfig`, `navigateTo`, `definePageMeta`, or types from `packages/core/types/`
- **Zod** — `z` and `zInfer` type are auto-imported. Use for form validation with `UForm`:
  ```ts
  const schema = z.object({
    email: z.email(),
    name: z.string().min(1),
  })
  type FormState = zInfer<typeof schema>
  ```

#### Style conventions

- **No hardcoded hex colors** — Use Nuxt UI semantic classes:
  - Text: `text-default`, `text-muted`, `text-dimmed`, `text-highlighted`
  - Background: `bg-default`, `bg-muted`, `bg-elevated`, `bg-accented`
  - Border: `border-default`, `border-muted`
  - Semantic: `text-primary`, `text-success`, `text-warning`, `text-error`
  - Brand: `text-brand`, `bg-brand`
- **Scoped styles** — Only if absolutely necessary (e.g., complex animations like splashscreen). Prefer Tailwind classes.

#### i18n conventions

Apply the project's i18n decision rule:

**Page-specific strings** — Use `<i18n lang="yaml">` SFC block with `const { t } = useI18n()`:
```vue
<i18n lang="yaml">
en:
  title: Favorites
  emptyTitle: No favorites yet
  emptyDescription: Start adding products you love
el:
  title: Αγαπημένα
  emptyTitle: Δεν υπάρχουν αγαπημένα ακόμα
  emptyDescription: Ξεκινήστε να προσθέτετε προϊόντα που αγαπάτε
</i18n>
```

**Shared domain strings** — Use `$i18n.t()` for keys already in global locale files:
```vue
<script setup lang="ts">
const { $i18n } = useNuxtApp()
</script>

<template>
  <h1>{{ $i18n.t('account.title') }}</h1>
</template>
```

**New global keys** — If the page needs strings shared with other components, add them to:
- Core keys → `packages/core/i18n/locales/{en,el}.json`
- Brand keys → `apps/<brand>/i18n/locales/{en,el}.json`

**Always provide both `en` and `el` translations.** If unsure about Greek, add a reasonable placeholder and note it for the user.

#### Navigation conventions

- Use `useLocalePath()` for all route links:
  ```ts
  const localePath = useLocalePath()
  ```
  ```vue
  <UButton :to="localePath('/cart')" label="Go to cart" />

  <NuxtLink :to="localePath('/shop')">
  Shop
  </NuxtLink>
  ```

#### Tauri-only pages

If the page is Tauri-only:
```ts
definePageMeta({
  layout: 'blank', // typically use blank layout
  middleware: 'tauri-only',
})
```

Use the `useTauriAvailable()` composable for runtime checks. Dynamic-import Tauri APIs:
```ts
const isTauri = useTauriAvailable()

onMounted(async () => {
  if (!isTauri)
    return
  const { invoke } = await import('@tauri-apps/api/core')
  await invoke('some_command')
})
```

### 5. Update navigation (if needed)

If the page should appear in the bottom navigation, tell the user to update `apps/<brand>/app/app.config.ts`:

```ts
nav: {
  items: [
    // ... existing items
    { labelKey: 'nav.<page>', icon: 'lucide:<icon>', route: '/<page>' },
  ]
}
```

And add the nav label to global locale files:
- `packages/core/i18n/locales/en.json` → `nav.<page>: "Page Label"`
- `packages/core/i18n/locales/el.json` → `nav.<page>: "Ετικέτα σελίδας"`

### 6. Verify conventions

After writing, check:
- [ ] `definePageMeta` is set with correct layout
- [ ] No hardcoded hex colors in template
- [ ] No `any` types
- [ ] No manual imports of auto-imported items
- [ ] Nuxt UI components used where applicable
- [ ] i18n applied with both `en` and `el` translations
- [ ] Routes use `localePath()` for locale-aware navigation
- [ ] Responsive design with mobile-first approach
- [ ] Tauri-only middleware applied if needed

### 7. Print summary

Tell the user:
- The page was created at its full path
- The route it maps to (e.g., `/favorites`, `/shop/:id`)
- Which layout it uses
- Which components it includes
- If i18n locale files were updated, mention which keys were added
- If navigation config needs updating, provide the exact changes
- How to test: `bun run app <brand> dev` and navigate to the route
