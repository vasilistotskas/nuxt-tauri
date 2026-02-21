---
name: new-component
description: Scaffold a new Vue component following project conventions — core (unprefixed) or brand (prefixed), with Nuxt UI components, i18n, slots, and semantic CSS
disable-model-invocation: true
---

# New Component

Scaffold a new Vue component in the Nuxt 4 + Tauri 2 monorepo.

## Arguments

The user must provide:
- **component-name** — PascalCase name (e.g., `OfferBanner`, `WeCareRewardCard`)
- **location** — `core` or a brand name (e.g., `wecare`)

Optional:
- **description** — What the component does (used to infer props, slots, and content)

If any required argument is missing, ask the user before proceeding.

## Steps

### 1. Determine component type and path

**Core component** (location = `core`):
- Name MUST be unprefixed (e.g., `OfferBanner`, `ProductGrid`)
- Path: `packages/core/components/<ComponentName>.vue`
- Purpose: brand-agnostic, reusable across all brand apps

**Brand component** (location = brand name):
- Name MUST be prefixed with the brand's PascalCase name (e.g., `WeCareRewardCard`, `WeCareLoyaltyBanner`)
- Path: `apps/<brand>/app/components/<ComponentName>.vue`
- Purpose: brand-specific UI, may wrap core components via slots

If the user provides an unprefixed name for a brand component, add the brand prefix automatically and confirm.

Verify the file does NOT already exist before proceeding.

### 2. Determine if this wraps a core component

If the component is a **brand component** and the user's description suggests it extends a core component (e.g., "product card with loyalty points"):
- Identify the core component to wrap
- Read the core component to understand its available slots and props
- The brand component should wrap the core component and fill its slots with brand-specific content
- Forward all relevant props and emits

**Pattern — brand wrapper:**
```vue
<script setup lang="ts">
const props = defineProps<{
  product: Product
  showAddToCart?: boolean
}>()

const emit = defineEmits<{
  addToCart: []
}>()

const { t } = useI18n()
</script>

<template>
  <ProductCard
    :product="props.product"
    :show-add-to-cart="props.showAddToCart"
    @add-to-cart="emit('addToCart')"
  >
    <template #meta="{ product }">
      <!-- Brand-specific slot content -->
    </template>
  </ProductCard>
</template>
```

### 3. Design the component

Before writing code, plan:

**Props** — Use TypeScript interfaces. Import types from `packages/core/types/` when applicable (they are auto-imported). Use `defineProps<{...}>()` generic syntax.

**Emits** — Use `defineEmits<{...}>()` generic syntax.

**Slots** — Core components SHOULD expose slots for brand extensibility (especially a `#meta` or `#extra` slot). Brand components fill slots from core components.

**Nuxt UI components** — Always prefer Nuxt UI components over custom HTML. Key components:
- Layout: `UCard`, `UContainer`, `USeparator`
- Actions: `UButton` (with `color`, `variant`, `size` props)
- Data display: `UBadge`, `UIcon`, `UAvatar`, `UCarousel`
- Forms: `UForm`, `UFormField`, `UInput`, `USelect`, `UTextarea`, `USwitch`, `UCheckbox`
- Feedback: `UModal`, `UDrawer`, `UToast` (via `useToast()`), `UEmpty`
- Navigation: `UNavigationMenu`, `UTabs`, `UBreadcrumb`, `UPagination`
- Loading: `USkeleton`, `UProgress`

When unsure about a Nuxt UI component's API, use the `mcp__nuxt-ui-remote__get-component` tool to look up its props, slots, and usage before using it.

### 4. Write the component

Follow these conventions strictly:

#### Template rules
- **No hardcoded hex colors** — Use Nuxt UI semantic classes:
  - Text: `text-default`, `text-muted`, `text-dimmed`, `text-highlighted`, `text-inverted`
  - Background: `bg-default`, `bg-muted`, `bg-elevated`, `bg-accented`, `bg-inverted`
  - Border: `border-default`, `border-muted`, `border-accented`, `border-inverted`
  - Semantic: `text-primary`, `text-secondary`, `text-success`, `text-warning`, `text-error` (+ `bg-*`, `border-*`)
  - Brand: `text-brand`, `bg-brand`, `text-brand-dark`, `bg-brand-dark`
- **Icons** — Use Lucide icons via `UIcon` or Nuxt UI component `icon` props: `icon="lucide:icon-name"`
- **Responsive** — Mobile-first with `md:`, `lg:`, `xl:` breakpoints. Pattern: `px-4 md:px-6 lg:px-8`
- **Nuxt UI `:ui` prop** — For component slot customization, use `:ui="{ root: '...', body: '...' }"` syntax

#### Script rules
- **No `any`** — Use proper TypeScript types
- **No `ts-ignore` or `eslint-disable`**
- **Auto-imports** — Vue, Nuxt, VueUse composables, and types from `packages/core/types/` are auto-imported. Do NOT manually import `ref`, `computed`, `useRoute`, `useI18n`, `Product`, `NavItem`, etc.
- **Zod** — `z` and `zInfer` type are auto-imported when needed for validation

#### i18n rules
Apply the project's i18n decision rule:

**Component-level** (strings used only in this component) — Use `<i18n lang="yaml">` SFC block:
```vue
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <span>{{ t('label') }}</span>
</template>

<i18n lang="yaml">
en:
  label: My Label
el:
  label: Η ετικέτα μου
</i18n>
```

**Global-level** (strings shared across components or domain keys) — Use `$i18n.t()`:
```vue
<script setup lang="ts">
const { $i18n } = useNuxtApp()
</script>

<template>
  <span>{{ $i18n.t('cart.title') }}</span>
</template>
```

For new global keys, add them to the appropriate locale files:
- Core keys → `packages/core/i18n/locales/{en,el}.json`
- Brand keys → `apps/<brand>/i18n/locales/{en,el}.json`

**Always provide both `en` and `el` translations.** If unsure about Greek translations, add a reasonable placeholder and note it for the user.

#### Locale-aware navigation
- Use `useLocalePath()` for route links: `localePath('/cart')`
- Use `NuxtLink` or `UButton` with `:to="localePath('/path')"`

### 5. Verify conventions

After writing, check:
- [ ] No hardcoded hex colors in template
- [ ] No `any` types
- [ ] No manual imports of auto-imported items
- [ ] Nuxt UI components used where applicable (not raw `<button>`, `<input>`, etc.)
- [ ] i18n applied with both `en` and `el` translations
- [ ] Props use `defineProps<{...}>()` generic syntax
- [ ] Emits use `defineEmits<{...}>()` generic syntax
- [ ] Responsive design with mobile-first approach
- [ ] Brand components are prefixed, core components are not
- [ ] Slots exposed in core components for brand extensibility

### 6. Print summary

Tell the user:
- The component was created at its full path
- List the props, emits, and slots it exposes
- If i18n locale files were updated, mention which keys were added
- If it wraps a core component, explain the slot integration
- Suggest where the component could be used (which pages/layouts)
