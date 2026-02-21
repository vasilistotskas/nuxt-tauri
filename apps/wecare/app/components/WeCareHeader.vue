<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <header
    class="
      relative px-4 pt-6 pb-4
      md:px-6
      lg:px-8
    "
  >
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <img
        src="/images/wecare-logo.png"
        :alt="t('logoAlt')"
        class="
          w-auto max-w-[360px] object-contain
          md:rounded-sm
        "
      >

      <!-- Desktop: Additional header actions -->
      <div
        class="
          hidden items-center gap-4
          md:flex
        "
      >
        <LanguageSwitcher />
        <UButton
          icon="lucide:heart"
          color="neutral"
          variant="ghost"
          size="lg"
          :aria-label="t('wishlist')"
        />
        <UButton
          icon="lucide:user"
          color="neutral"
          variant="ghost"
          size="lg"
          :aria-label="t('account')"
        />
        <UColorModeButton>
          <template #fallback>
            <UButton loading variant="ghost" color="neutral" />
          </template>
        </UColorModeButton>
      </div>

      <!-- Mobile: Language + Theme toggle -->
      <div
        class="
          flex items-center gap-2
          md:hidden
        "
      >
        <LanguageSwitcher />
        <UColorModeButton>
          <template #fallback>
            <UButton loading variant="ghost" color="neutral" />
          </template>
        </UColorModeButton>
      </div>
    </div>
  </header>
</template>

<i18n lang="yaml">
en:
  logoAlt: WeCare Online Pharmacy
  wishlist: Wishlist
  account: Account
el:
  logoAlt: WeCare Ηλεκτρονικό Φαρμακείο
  wishlist: Αγαπημένα
  account: Λογαριασμός
</i18n>
