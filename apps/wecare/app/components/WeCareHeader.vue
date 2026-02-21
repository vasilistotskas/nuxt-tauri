<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <header
    class="
      relative px-4 pt-6 pb-4
      md:hidden
    "
  >
    <div class="flex items-center justify-between gap-2">
      <!-- Logo -->
      <img
        src="/images/wecare-logo.png"
        :alt="t('logoAlt')"
        class="max-w-[180px] min-w-0 shrink object-contain"
      >

      <!-- Mobile: Language + Theme toggle -->
      <div class="flex shrink-0 items-center gap-1">
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
el:
  logoAlt: WeCare Ηλεκτρονικό Φαρμακείο
</i18n>
