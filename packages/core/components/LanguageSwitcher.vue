<script setup lang="ts">
import { el, en } from '@nuxt/ui/locale'

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function onLocaleChange(code: string) {
  navigateTo(switchLocalePath(code as typeof locale.value))
}
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="[en, el]"
    :search-input="false"
    color="neutral"
    variant="outline"
    class="
      w-28
      md:w-32
    "
    @update:model-value="onLocaleChange"
  />
</template>
