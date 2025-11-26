<template>
  <section class="space-y-3 px-4">
    <h2
      class="
        text-[22px] font-medium tracking-[0.5px] text-black
        dark:text-white
      "
    >
      {{ title }}
    </h2>

    <WeCareCategoryTabs
      v-if="tabs?.length"
      v-model:active-index="activeTab"
      :tabs="tabs"
    />

    <UCarousel
      v-slot="{ item }"
      :items="products"
      :ui="{
        item: `
          basis-auto
          first:ps-4
        `,
      }"
    >
      <WeCareProductCard :product="item" />
    </UCarousel>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tabs?: string[]
  products: Product[]
}>()

const activeTab = ref(0)
</script>
