<script setup lang="ts">
const { $i18n } = useNuxtApp()

const searchQuery = ref('')
const selectedCategory = ref<string | undefined>(undefined)

const { data: categories } = useCategories()
const { data: products } = useProducts({
  category: selectedCategory,
  search: computed(() => searchQuery.value || undefined),
  key: 'shop-products',
})

const cartStore = useCartStore()

const categoryOptions = computed(() => {
  const all = [{ label: $i18n.t('shop.allCategories'), value: '' }]
  if (categories.value) {
    return [
      ...all,
      ...categories.value.map(c => ({ label: c.name, value: c.slug })),
    ]
  }
  return all
})

const productCount = computed(() => products.value?.length ?? 0)

function selectCategory(slug: string) {
  selectedCategory.value = slug || undefined
}
</script>

<template>
  <div
    class="
      md:px-6
      lg:px-8
    "
  >
    <!-- Header -->
    <header
      class="
        px-4 pt-8 pb-4
        md:px-0 md:pt-6
      "
    >
      <h1 class="text-center text-2xl font-bold tracking-wide text-default">
        {{ $i18n.t('shop.title') }}
      </h1>
    </header>

    <!-- Search -->
    <div
      class="
        mb-4 px-4
        md:mx-auto md:max-w-xl md:px-0
        lg:max-w-2xl
      "
    >
      <UInput
        v-model="searchQuery"
        icon="lucide:search"
        size="xl"
        variant="soft"
        :placeholder="`${$i18n.t('nav.shop')}...`"
        class="w-full"
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
    </div>

    <!-- Category Filters + Product Count -->
    <div
      class="
        mb-2 px-4
        md:px-0
      "
    >
      <div
        class="
          scrollbar-hide flex gap-2 overflow-x-auto
          md:flex-wrap md:gap-3
        "
      >
        <UButton
          v-for="cat in categoryOptions"
          :key="cat.value"
          :label="cat.label"
          :variant="(selectedCategory ?? '') === cat.value ? 'solid' : 'soft'"
          :color="(selectedCategory ?? '') === cat.value ? 'primary' : 'neutral'"
          size="sm"
          class="shrink-0 rounded-full"
          @click="selectCategory(cat.value)"
        />
      </div>
    </div>

    <!-- Product Count -->
    <div
      v-if="products?.length"
      class="
        mb-4 px-4
        md:px-0
      "
    >
      <p
        class="
          text-sm text-muted
          md:text-base
        "
      >
        {{ $i18n.t('shop.productCount', productCount) }}
      </p>
    </div>

    <!-- Products Grid -->
    <div
      v-if="products?.length"
      class="
        px-4
        md:px-0
      "
    >
      <!-- Mobile: Carousel rows -->
      <div
        class="
          space-y-4
          md:hidden
        "
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          show-add-to-cart
          class="w-full"
          @add-to-cart="cartStore.addItem(product)"
        />
      </div>

      <!-- Desktop: Grid -->
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
          show-add-to-cart
          class="w-full"
          @add-to-cart="cartStore.addItem(product)"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="
        flex flex-col items-center gap-4 py-16 text-center
        md:py-24
      "
    >
      <UIcon name="lucide:search-x" class="size-16 text-dimmed" />
      <h2 class="text-lg font-semibold text-default">
        {{ $i18n.t('shop.noResults') }}
      </h2>
      <p class="text-sm text-muted">
        {{ $i18n.t('shop.noResultsDesc') }}
      </p>
    </div>
  </div>
</template>
