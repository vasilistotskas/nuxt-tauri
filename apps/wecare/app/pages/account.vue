<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

const menuItems = computed(() => [
  { label: $i18n.t('account.myOrders'), route: localePath({ path: '/orders' }) },
  { label: $i18n.t('account.purchasedProducts'), route: localePath({ path: '/purchased' }) },
  { label: $i18n.t('wecare.carePointsAndDiscounts'), route: localePath({ path: '/points' }) },
  { label: $i18n.t('account.accountSettings'), route: localePath({ path: '/settings' }) },
  { label: $i18n.t('account.help'), route: localePath({ path: '/help' }) },
])

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
    <!-- Header -->
    <div class="relative px-4 pt-8 pb-4">
      <h1 class="text-center text-2xl font-bold tracking-wide text-default">
        {{ $i18n.t('account.title') }}
      </h1>
      <!-- Theme toggle -->
      <ClientOnly>
        <UButton
          :icon="isDark ? 'lucide:moon' : 'lucide:sun'"
          class="absolute top-6 right-4"
          color="neutral"
          variant="ghost"
          size="lg"
          @click="isDark = !isDark"
        />
      </ClientOnly>
    </div>

    <USeparator class="mx-4" />

    <!-- Subheader -->
    <div class="py-6 text-center">
      <p class="mb-2 text-base font-semibold text-muted">
        {{ t('greeting') }}
      </p>
      <ULink class="text-lg font-semibold text-default underline">
        {{ t('registerOrLogIn') }}
      </ULink>
    </div>

    <!-- Menu Items -->
    <div class="space-y-0 px-4">
      <WeCareAccountMenuItem
        v-for="item in menuItems"
        :key="item.route"
        :label="item.label"
        @click="handleMenuClick(item.route)"
      />
    </div>

    <!-- Language Switcher -->
    <div class="mt-4 flex items-center justify-between px-4">
      <span class="text-lg tracking-wide text-default">{{ $i18n.t('account.language') }}</span>
      <LanguageSwitcher />
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 space-y-4 px-4">
      <UButton
        block
        size="xl"
        color="neutral"
        variant="solid"
        class="h-[52px] text-lg font-semibold"
        @click="handleLogin"
      >
        {{ $i18n.t('account.logIn') }}
      </UButton>

      <UButton
        block
        size="xl"
        color="neutral"
        variant="outline"
        class="h-[52px] text-lg font-semibold"
        @click="handleChangePassword"
      >
        {{ $i18n.t('account.changePassword') }}
      </UButton>
    </div>

    <!-- Footer Links -->
    <div class="mt-8 px-4">
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
