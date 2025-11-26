<script setup lang="ts">
definePageMeta({
  layout: 'mobile',
})

const router = useRouter()
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

const menuItems = ref([
  { label: 'My Orders', route: '/orders' },
  { label: 'Purchased products', route: '/purchased' },
  { label: 'Care points & Discounts', route: '/points' },
  { label: 'Account settings', route: '/settings' },
  { label: 'Language', route: '/language' },
  { label: 'Help', route: '/help' },
])

function handleMenuClick(route: string) {
  router.push(route)
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
        My account
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
        Good morning
      </p>
      <ULink class="text-lg font-semibold text-default underline">
        Register or log in
      </ULink>
    </div>

    <!-- Menu Items -->
    <div class="space-y-0 px-4">
      <WeCareAccountMenuItem
        v-for="item in menuItems"
        :key="item.label"
        :label="item.label"
        @click="handleMenuClick(item.route)"
      />
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
        Log in
      </UButton>

      <UButton
        block
        size="xl"
        color="neutral"
        variant="outline"
        class="h-[52px] text-lg font-semibold"
        @click="handleChangePassword"
      >
        Change password
      </UButton>
    </div>

    <!-- Footer Links -->
    <div class="mt-8 px-4">
      <div class="mb-4 flex justify-between">
        <ULink class="text-[15px] text-default underline">
          Shipping terms
        </ULink>
        <ULink class="text-[15px] text-default underline">
          Return policy
        </ULink>
        <ULink class="text-[15px] text-default underline">
          Terms of Use
        </ULink>
      </div>
      <div class="flex justify-center gap-12">
        <ULink class="text-[15px] text-default underline">
          Privacy Policy
        </ULink>
        <ULink class="text-[15px] text-default underline">
          Cookies
        </ULink>
      </div>
    </div>
  </div>
</template>
