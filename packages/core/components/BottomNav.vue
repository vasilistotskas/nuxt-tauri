<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '#ui/types'

const appConfig = useAppConfig()
const { navItems } = useNavigation()
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
const favoritesStore = useFavoritesStore()

const headerNavItems = computed<NavigationMenuItem[]>(() => {
  return navItems.value
    .filter(item => item.route !== '/account')
    .map(item => ({
      label: item.label,
      icon: item.icon,
      to: item.resolvedRoute,
      active: item.active,
    }))
})

const headerNavItemsVertical = computed<NavigationMenuItem[]>(() => {
  return navItems.value.map(item => ({
    label: item.label,
    icon: item.icon,
    to: item.resolvedRoute,
    active: item.active,
  }))
})

const defaultMenuItems = [
  { labelKey: 'account.myOrders', icon: 'lucide:package', route: '/orders' },
  { labelKey: 'account.purchasedProducts', icon: 'lucide:shopping-bag', route: '/purchased' },
  { labelKey: 'account.accountSettings', icon: 'lucide:settings', route: '/settings' },
  { labelKey: 'account.help', icon: 'lucide:help-circle', route: '/help' },
]

const configMenuItems = computed(() =>
  (appConfig.account?.menuItems?.length ? appConfig.account.menuItems : defaultMenuItems) as { labelKey: string, icon: string, route: string }[],
)

const accountMenuItems = computed<DropdownMenuItem[][]>(() => [
  configMenuItems.value.map(item => ({
    label: $i18n.t(item.labelKey),
    icon: item.icon,
    onSelect: () => navigateTo(localePath({ path: item.route })),
  })),
  [
    {
      label: $i18n.t('account.logIn'),
      icon: 'lucide:log-in',
      onSelect: () => navigateTo(localePath({ path: '/account' })),
    },
  ],
])
</script>

<template>
  <!-- Mobile: Bottom navigation -->
  <nav
    class="
      safe-area-bottom fixed inset-x-0 bottom-0 z-50 border-t border-muted
      bg-default
      md:hidden
    "
  >
    <div class="flex items-center justify-around p-2">
      <UButton
        v-for="item in navItems"
        :key="item.route"
        :to="item.resolvedRoute"
        variant="ghost"
        color="neutral"
        class="flex h-auto min-w-15 flex-col items-center gap-0.5 py-1.5"
        :class="item.active ? 'opacity-100' : 'opacity-50'"
        :ui="{
          base: 'flex-col gap-0.5 px-2',
          leadingIcon: 'size-6',
        }"
      >
        <UIcon :name="item.icon" class="size-6 text-default" />
        <span class="text-xs font-normal text-default">{{ item.label }}</span>
      </UButton>
    </div>
  </nav>

  <!-- Desktop: UHeader with UNavigationMenu -->
  <UHeader
    title=""
    :to="localePath({ path: '/' })"
    class="
      hidden
      md:block
    "
    :ui="{
      root: `
        hidden
        md:block
      `,
      container: `
        max-w-3xl
        lg:max-w-5xl
        xl:max-w-7xl
        2xl:max-w-[1400px]
      `,
    }"
  >
    <template #left>
      <NuxtLink :to="localePath({ path: '/' })" class="shrink-0">
        <img
          :src="appConfig.brand.logo"
          :alt="appConfig.brand.name"
          class="
            h-8 w-auto object-contain
            lg:h-10
          "
        >
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="headerNavItems"
      highlight
      highlight-color="primary"
    />

    <template #right>
      <!-- Search -->
      <UTooltip :text="$i18n.t('nav.shop')">
        <UButton
          icon="lucide:search"
          color="neutral"
          variant="ghost"
          :to="localePath({ path: '/shop' })"
          :aria-label="$i18n.t('nav.shop')"
        />
      </UTooltip>

      <!-- Wishlist with count chip -->
      <UChip
        :text="favoritesStore.count"
        :show="favoritesStore.count > 0"
        size="2xs"
        color="error"
      >
        <UTooltip :text="$i18n.t('nav.favorites')">
          <UButton
            icon="lucide:heart"
            color="neutral"
            variant="ghost"
            :to="localePath({ path: '/favorites' })"
            :aria-label="$i18n.t('nav.favorites')"
          />
        </UTooltip>
      </UChip>

      <!-- Account dropdown -->
      <UDropdownMenu :items="accountMenuItems">
        <UButton
          icon="lucide:user"
          color="neutral"
          variant="ghost"
          :aria-label="$i18n.t('nav.account')"
        />
      </UDropdownMenu>

      <LanguageSwitcher />

      <UColorModeButton>
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="headerNavItemsVertical"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
