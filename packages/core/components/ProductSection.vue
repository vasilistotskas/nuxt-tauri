<script setup lang="ts">
defineProps<{
  title: string
  tabs?: string[]
  products: Product[]
}>()

const { t } = useI18n({ useScope: 'local' })

const activeTab = ref(0)
</script>

<template>
  <section
    class="
      space-y-3 px-4
      md:px-0
    "
  >
    <div class="flex items-center justify-between">
      <h2
        class="
          text-[22px] font-medium tracking-[0.5px] text-default
          md:text-2xl
          lg:text-3xl
        "
      >
        {{ title }}
      </h2>
      <!-- Desktop: View all link -->
      <UButton
        :label="t('viewAll')"
        variant="link"
        color="neutral"
        trailing-icon="lucide:arrow-right"
        class="
          hidden text-sm
          md:flex
          lg:text-base
        "
      />
    </div>

    <CategoryTabs
      v-if="tabs?.length"
      v-model:active-index="activeTab"
      :tabs="tabs"
    />

    <!-- Mobile: Carousel -->
    <UCarousel
      v-slot="{ item }"
      :items="products"
      :ui="{
        item: `
          basis-auto
          first:ps-4
        `,
      }"
      class="md:hidden"
    >
      <ProductCard :product="item" />
    </UCarousel>

    <!-- Tablet/Desktop: Grid -->
    <div
      class="
        hidden gap-4
        md:grid md:grid-cols-3
        lg:grid-cols-4 lg:gap-6
        xl:grid-cols-5
        2xl:grid-cols-6
      "
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="w-full"
      />
    </div>
  </section>
</template>

<i18n lang="yaml">
en:
  viewAll: View all
el:
  viewAll: Προβολή όλων
</i18n>
