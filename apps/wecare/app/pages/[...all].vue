<script lang="ts" setup>
definePageMeta({
  layout: false,
})
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
          Page not found
        </h1>
        <p class="text-base/7 text-muted">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      <UButton to="/" variant="outline" size="lg" :ui="{ base: 'px-5' }">
        Go home
      </UButton>
    </div>
  </div>
</template>
