<script setup lang="ts">
import type { FooterColumn } from '#ui/types'

const appConfig = useAppConfig()
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()

const columns = computed<FooterColumn[]>(() => [
  {
    label: $i18n.t('nav.shop'),
    children: [
      { label: $i18n.t('nav.shop'), to: localePath({ path: '/shop' }) },
      { label: $i18n.t('nav.favorites'), to: localePath({ path: '/favorites' }) },
      { label: $i18n.t('nav.cart'), to: localePath({ path: '/cart' }) },
    ],
  },
  {
    label: $i18n.t('nav.account'),
    children: [
      { label: $i18n.t('nav.account'), to: localePath({ path: '/account' }) },
      { label: $i18n.t('account.myOrders'), to: localePath({ path: '/orders' }) },
      { label: $i18n.t('account.accountSettings'), to: localePath({ path: '/settings' }) },
    ],
  },
  {
    label: $i18n.t('account.help'),
    children: [
      { label: $i18n.t('account.shippingTerms'), to: localePath({ path: '/shipping-terms' }) },
      { label: $i18n.t('account.returnPolicy'), to: localePath({ path: '/return-policy' }) },
      { label: $i18n.t('account.termsOfUse'), to: localePath({ path: '/terms' }) },
      { label: $i18n.t('account.privacyPolicy'), to: localePath({ path: '/privacy' }) },
    ],
  },
])
</script>

<template>
  <UFooter
    class="
      mt-10 hidden
      md:block
    "
    :ui="{
      root: 'border-t border-muted',
      container: `
        max-w-3xl
        lg:max-w-5xl
        xl:max-w-7xl
        2xl:max-w-[1400px]
      `,
    }"
  >
    <template #top>
      <UContainer
        :ui="{
          root: `
            max-w-3xl
            lg:max-w-5xl
            xl:max-w-7xl
            2xl:max-w-[1400px]
          `,
        }"
      >
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <div class="flex items-center gap-3">
        <img
          :src="appConfig.brand.logo"
          :alt="appConfig.brand.name"
          class="h-5 w-auto object-contain"
        >
        <p class="text-sm text-muted">
          &copy; {{ new Date().getFullYear() }} {{ appConfig.brand.name }}. {{ $i18n.t('footer.allRightsReserved') }}
        </p>
      </div>
    </template>
  </UFooter>
</template>
