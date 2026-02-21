<script setup lang="ts">
const { $i18n } = useNuxtApp()

const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()
const { data: allProducts } = useProducts({ key: 'favorites-products' })

const favoriteProducts = computed(() => {
  if (!allProducts.value)
    return []
  return allProducts.value.filter(p => favoritesStore.isFavorite(p.id))
})
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
        {{ $i18n.t('favorites.title') }}
      </h1>
      <USeparator class="mt-4" />
    </header>

    <!-- Favorites Grid -->
    <div
      v-if="favoriteProducts.length"
      class="
        px-4
        md:px-0
      "
    >
      <!-- Mobile: List -->
      <div
        class="
          space-y-4
          md:hidden
        "
      >
        <WeCareProductCard
          v-for="product in favoriteProducts"
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
        <WeCareProductCard
          v-for="product in favoriteProducts"
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
      <UIcon name="lucide:heart" class="size-16 text-dimmed" />
      <h2 class="text-lg font-semibold text-default">
        {{ $i18n.t('favorites.empty') }}
      </h2>
      <p class="text-sm text-muted">
        {{ $i18n.t('favorites.emptyDesc') }}
      </p>
    </div>
  </div>
</template>
