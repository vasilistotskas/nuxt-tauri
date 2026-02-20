<script setup lang="ts">
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
      placeholder="Search products..."
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
          h-12 rounded-full bg-[#f2f2f2] ps-14 text-sm
          placeholder:text-[#686868]
          md:h-14 md:text-base
          dark:bg-[#242424]
          dark:placeholder:text-[#969696]
        `,
        leadingIcon: `
          ms-3.5 size-5 text-black
          md:size-6
          dark:text-white
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
        flex size-12 items-center justify-center rounded-full bg-[#f2f2f2]
        text-black
        md:size-14
        dark:bg-[#242424] dark:text-white
      "
      :ui="{
        leadingIcon: 'size-6',
      }"
      aria-label="Search by photo"
    />
  </div>
</template>
