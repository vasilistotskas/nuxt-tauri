<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { $i18n } = useNuxtApp()
const localePath = useLocalePath()

const is404 = computed(() => props.error.statusCode === 404)

function handleResolve() {
  clearError({ redirect: localePath({ path: '/' }) })
}
</script>

<template>
  <div
    class="
      grid min-h-screen place-items-center bg-default py-12
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
        {{ error.statusCode }}
      </p>
      <div class="space-y-3 text-center">
        <h1 class="text-3xl font-bold tracking-tight text-default">
          {{ is404 ? $i18n.t('errors.pageNotFound') : error.statusMessage }}
        </h1>
        <p class="text-base/7 text-muted">
          {{ is404 ? $i18n.t('errors.pageNotFoundDesc') : error.message }}
        </p>
      </div>
      <UButton
        variant="outline"
        size="lg"
        :ui="{ base: 'px-5' }"
        @click="handleResolve"
      >
        {{ $i18n.t('errors.goHome') }}
      </UButton>
    </div>
  </div>
</template>
