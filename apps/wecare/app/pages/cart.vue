<script setup lang="ts">
import type { Product } from '@packages/core/types/product'

definePageMeta({
  layout: 'mobile',
})

const suggestedProducts = ref<Product[]>([
  {
    id: 1,
    brand: 'La Roche Posay',
    name: 'Effaclar Mat Sebum-regulating Anti-Oily....',
    price: 13.07,
    rating: 5,
    reviews: 1090,
    caresPoints: 254,
    image: 'https://www.figma.com/api/mcp/asset/588f7280-6127-4cc7-9114-9c2c6478fdff',
  },
  {
    id: 2,
    brand: 'La Roche Posay',
    name: 'Effaclar Mat Sebum-regulating Anti-Oily....',
    price: 13.07,
    rating: 5,
    reviews: 1090,
    caresPoints: 254,
    image: 'https://www.figma.com/api/mcp/asset/da70462c-2821-4fcb-bcbf-2af28a4a6acb',
  },
  {
    id: 3,
    brand: 'CeraVe',
    name: 'Hydrating Cleanser for Normal to Dry Skin',
    price: 15.99,
    rating: 5,
    reviews: 2340,
    caresPoints: 180,
    image: 'https://www.figma.com/api/mcp/asset/588f7280-6127-4cc7-9114-9c2c6478fdff',
  },
])

function handleAddToCart(product: Product) {
  // TODO: Implement cart functionality
  console.log('Added to cart:', product)
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="px-4 pt-14 pb-4">
      <h1 class="text-center text-2xl font-bold tracking-wide text-default">
        Cart
      </h1>
      <USeparator class="mt-4" />
    </header>

    <!-- Empty Cart State -->
    <EmptyCartIllustration />

    <!-- You Might Like Section -->
    <section class="mt-8 px-4">
      <h2 class="mb-6 text-center text-lg font-bold tracking-wide text-default">
        YOU MIGHT LIKE
      </h2>
      <UCarousel
        v-slot="{ item }"
        :items="suggestedProducts"
        dots
        :ui="{
          item: 'shrink-0 basis-[180px]',
          dots: 'relative bottom-0 mt-4',
          dot: `
            size-2.5 bg-muted
            data-[state=active]:bg-inverted
          `,
        }"
      >
        <ProductCard :product="item" show-add-to-cart @add-to-cart="handleAddToCart(item)" />
      </UCarousel>
    </section>

    <!-- Info Section -->
    <section class="mt-8 space-y-4 px-4">
      <USeparator />
      <p class="text-[15px] tracking-wide text-default">
        <span class="font-bold">Free shipping</span> for orders over 49.00€
      </p>
      <USeparator />
      <p class="text-[15px] tracking-wide text-default">
        <span class="font-bold">Telephone orders</span> 210 700 1375
      </p>
    </section>
  </div>
</template>
