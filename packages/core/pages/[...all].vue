<script lang="ts" setup>
definePageMeta({
  layout: false,
})

const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
</script>

<template>
  <div
    class="
      grid place-items-center py-12
      md:py-24
    "
  >
    <div
      class="
        flex flex-col items-center gap-y-4
        md:gap-y-8
      "
    >
      <p class="font-semibold text-error">
        404
      </p>
      <div class="space-y-3 text-center">
        <h1 class="text-3xl font-bold tracking-tight">
          {{ $i18n.t('errors.pageNotFound') }}
        </h1>
        <p class="text-base/7 text-muted">
          {{ $i18n.t('errors.pageNotFoundDesc') }}
        </p>
      </div>
      <UButton
        :to="localePath({ path: '/' })" variant="outline" size="lg" :ui="{ base: `
          px-5
        ` }"
      >
        {{ $i18n.t('errors.goHome') }}
      </UButton>
    </div>
  </div>
</template>
