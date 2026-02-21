<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

const searchQuery = ref('')
</script>

<template>
  <div
    class="
      flex gap-2.5 px-4
      md:px-0
    "
  >
    <UInput
      v-model="searchQuery"
      :placeholder="t('placeholder')"
      icon="lucide:search"
      size="xl"
      variant="soft"
      class="flex-1"
      :ui="{
        root: `
          h-12
          md:h-14
        `,
        base: `
          h-12 rounded-full bg-muted ps-14 text-sm
          placeholder:text-muted
          md:h-14 md:text-base
        `,
        leadingIcon: `
          ms-3.5 size-5 text-default
          md:size-6
        `,
      }"
    />
    <UButton
      icon="lucide:scan"
      color="neutral"
      variant="soft"
      size="xl"
      square
      class="
        flex size-12 items-center justify-center rounded-full bg-muted
        text-default
        md:size-14
      "
      :ui="{
        leadingIcon: 'size-6',
      }"
      :aria-label="t('searchByPhoto')"
    />
  </div>
</template>

<i18n lang="yaml">
en:
  placeholder: Search products...
  searchByPhoto: Search by photo
el:
  placeholder: Αναζήτηση προϊόντων...
  searchByPhoto: Αναζήτηση με φωτογραφία
</i18n>
