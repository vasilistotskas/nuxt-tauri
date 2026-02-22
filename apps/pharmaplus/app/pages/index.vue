<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="px-4 py-8 text-center md:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-default">
      {{ t('welcome') }}
    </h1>
  </div>
</template>

<i18n lang="yaml">
en:
  welcome: Welcome to PharmaPlus
el:
  welcome: Καλωσήρθατε στο PharmaPlus
</i18n>
