<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/types'

const { t } = useI18n({ useScope: 'local' })
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
const colorMode = useColorMode()
const appConfig = useAppConfig()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
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

const menuItems = computed(() =>
  configMenuItems.value.map(item => ({
    label: $i18n.t(item.labelKey),
    route: localePath({ path: item.route }),
    icon: item.icon,
  })),
)

const sidebarNavItems = computed<NavigationMenuItem[]>(() =>
  menuItems.value.map(item => ({
    label: item.label,
    icon: item.icon,
    to: item.route,
  })),
)

function handleMenuClick(route: string) {
  navigateTo(route)
}

function handleLogin() {
  // Handle login action
}

function handleChangePassword() {
  // Handle change password action
}
</script>

<template>
  <div class="max-w-full overflow-x-hidden">
    <!-- Mobile Header -->
    <div
      class="
        relative px-4 pt-8 pb-4
        md:px-6 md:pt-6
        lg:px-8
      "
    >
      <h1
        class="
          text-center text-2xl font-bold tracking-wide text-default
          md:text-left md:text-3xl
        "
      >
        {{ $i18n.t('account.title') }}
      </h1>
      <!-- Theme toggle (mobile only) -->
      <ClientOnly>
        <UButton
          :icon="isDark ? 'lucide:moon' : 'lucide:sun'"
          class="
            absolute top-6 right-4
            md:hidden
          "
          color="neutral"
          variant="ghost"
          size="lg"
          @click="isDark = !isDark"
        />
      </ClientOnly>
    </div>

    <USeparator
      class="
        mx-4
        md:mx-6
        lg:mx-8
      "
    />

    <!-- Desktop: Two-column layout -->
    <div
      class="
        md:flex md:gap-8 md:px-6 md:pt-6
        lg:gap-12 lg:px-8
      "
    >
      <!-- Desktop Sidebar -->
      <aside
        class="
          hidden shrink-0
          md:block md:w-56
          lg:w-64
        "
      >
        <UNavigationMenu
          :items="sidebarNavItems"
          orientation="vertical"
          highlight
          highlight-color="primary"
          color="neutral"
          class="w-full"
        />

        <USeparator class="my-4" />

        <div class="flex items-center justify-between gap-2">
          <LanguageSwitcher />
          <ClientOnly>
            <UButton
              :icon="isDark ? 'lucide:moon' : 'lucide:sun'"
              color="neutral"
              variant="ghost"
              size="md"
              @click="isDark = !isDark"
            />
          </ClientOnly>
        </div>
      </aside>

      <!-- Content Area -->
      <div class="flex-1">
        <!-- Subheader -->
        <div
          class="
            py-6 text-center
            md:pt-0 md:pb-6 md:text-left
          "
        >
          <p class="mb-2 text-base font-semibold text-muted">
            {{ t('greeting') }}
          </p>
          <ULink class="text-lg font-semibold text-default underline">
            {{ t('registerOrLogIn') }}
          </ULink>
        </div>

        <!-- Mobile Menu Items -->
        <div
          class="
            space-y-0 px-4
            md:hidden
          "
        >
          <AccountMenuItem
            v-for="item in menuItems"
            :key="item.route"
            :label="item.label"
            @click="handleMenuClick(item.route)"
          />
        </div>

        <!-- Mobile Language Switcher -->
        <div
          class="
            mt-4 flex items-center justify-between px-4
            md:hidden
          "
        >
          <span class="text-lg tracking-wide text-default">{{ $i18n.t('account.language') }}</span>
          <LanguageSwitcher />
        </div>

        <!-- Action Buttons -->
        <div
          class="
            mt-8 space-y-4 px-4
            md:mt-0 md:flex md:gap-4 md:space-y-0 md:px-0
          "
        >
          <UButton
            size="xl"
            color="neutral"
            variant="solid"
            class="
              h-[52px] w-full text-lg font-semibold
              md:w-auto md:min-w-48
            "
            @click="handleLogin"
          >
            {{ $i18n.t('account.logIn') }}
          </UButton>

          <UButton
            size="xl"
            color="neutral"
            variant="outline"
            class="
              h-[52px] w-full text-lg font-semibold
              md:w-auto md:min-w-48
            "
            @click="handleChangePassword"
          >
            {{ $i18n.t('account.changePassword') }}
          </UButton>
        </div>

        <!-- Footer Links -->
        <div
          class="
            mt-8 px-4
            md:mt-10 md:px-0
          "
        >
          <!-- Mobile: Two rows -->
          <div class="md:hidden">
            <div class="mb-4 flex justify-between">
              <ULink class="text-[15px] text-default underline">
                {{ $i18n.t('account.shippingTerms') }}
              </ULink>
              <ULink class="text-[15px] text-default underline">
                {{ $i18n.t('account.returnPolicy') }}
              </ULink>
              <ULink class="text-[15px] text-default underline">
                {{ $i18n.t('account.termsOfUse') }}
              </ULink>
            </div>
            <div class="flex justify-center gap-12">
              <ULink class="text-[15px] text-default underline">
                {{ $i18n.t('account.privacyPolicy') }}
              </ULink>
              <ULink class="text-[15px] text-default underline">
                {{ $i18n.t('account.cookies') }}
              </ULink>
            </div>
          </div>
          <!-- Desktop: Single row -->
          <div
            class="
              hidden flex-wrap gap-6
              md:flex
            "
          >
            <ULink class="text-[15px] text-default underline">
              {{ $i18n.t('account.shippingTerms') }}
            </ULink>
            <ULink class="text-[15px] text-default underline">
              {{ $i18n.t('account.returnPolicy') }}
            </ULink>
            <ULink class="text-[15px] text-default underline">
              {{ $i18n.t('account.termsOfUse') }}
            </ULink>
            <ULink class="text-[15px] text-default underline">
              {{ $i18n.t('account.privacyPolicy') }}
            </ULink>
            <ULink class="text-[15px] text-default underline">
              {{ $i18n.t('account.cookies') }}
            </ULink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  greeting: Good morning
  registerOrLogIn: Register or log in
el:
  greeting: Καλημέρα
  registerOrLogIn: Εγγραφή ή σύνδεση
</i18n>
