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
    image: 'https://www.figma.com/api/mcp/asset/be2f572c-23cc-441e-bbad-b870267440f0',
  },
  {
    id: 2,
    brand: 'La Roche Posay',
    name: 'Effaclar Mat Sebum-regulating Anti-Oily....',
    price: 13.07,
    rating: 5,
    reviews: 1090,
    caresPoints: 254,
    image: 'https://www.figma.com/api/mcp/asset/4b05fa62-ef5b-4071-a2d7-ab3e6e72d8c1',
  },
  {
    id: 3,
    brand: 'CeraVe',
    name: 'Hydrating Cleanser for Normal to Dry Skin',
    price: 15.99,
    rating: 5,
    reviews: 2340,
    caresPoints: 180,
    image: 'https://www.figma.com/api/mcp/asset/be2f572c-23cc-441e-bbad-b870267440f0',
  },
  {
    id: 4,
    brand: 'Vichy',
    name: 'Mineral 89 Hyaluronic Acid Face Serum',
    price: 24.50,
    rating: 5,
    reviews: 890,
    caresPoints: 320,
    image: 'https://www.figma.com/api/mcp/asset/4b05fa62-ef5b-4071-a2d7-ab3e6e72d8c1',
  },
])

function handleAddToCart(product: Product) {
  // TODO: Implement cart functionality
  console.log('Added to cart:', product)
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
      <h1
        class="
          text-center text-2xl font-bold tracking-wide text-black
          dark:text-white
        "
      >
        Cart
      </h1>
      <USeparator
        class="mt-4"
        :ui="{
          root: 'bg-[#282828]',
        }"
      />
    </header>

    <!-- Empty Cart State -->
    <EmptyCartIllustration
      class="
        py-6
        md:py-10
      "
    />

    <!-- You Might Like Section -->
    <section
      class="
        mt-6 px-4
        md:mt-10 md:px-0
      "
    >
      <h2
        class="
          mb-6 text-center text-lg font-bold tracking-wide text-black uppercase
          md:text-xl
          dark:text-white
        "
      >
        You might like
      </h2>

      <!-- Mobile: Carousel -->
      <div class="md:hidden">
        <UCarousel
          v-slot="{ item }"
          :items="suggestedProducts"
          dots
          :ui="{
            item: `
              shrink-0 basis-[180px]
              first:ps-4
            `,
            container: 'gap-4',
            dots: 'relative bottom-0 mt-6 justify-center',
            dot: `
              size-2.5 rounded-full bg-[#4a4a4a]
              data-[state=active]:bg-white
            `,
          }"
        >
          <ProductCard :product="item" show-add-to-cart @add-to-cart="handleAddToCart(item)" />
        </UCarousel>
      </div>

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
          v-for="product in suggestedProducts"
          :key="product.id"
          :product="product"
          show-add-to-cart
          class="w-full"
          @add-to-cart="handleAddToCart(product)"
        />
      </div>
    </section>

    <!-- Info Section -->
    <section
      class="
        mt-10 space-y-0 px-4 pb-8
        md:mt-14 md:px-0
      "
    >
      <USeparator
        :ui="{
          root: 'bg-[#353535]',
        }"
      />
      <p
        class="
          py-4 text-[15px] tracking-wide text-black
          md:text-base
          dark:text-white
        "
      >
        <span class="font-bold">Free shipping</span> for orders over 49.00€
      </p>
      <USeparator
        :ui="{
          root: 'bg-[#353535]',
        }"
      />
      <p
        class="
          py-4 text-[15px] tracking-wide text-black
          md:text-base
          dark:text-white
        "
      >
        <span class="font-bold">Telephone orders</span> 210 700 1375
      </p>
    </section>
  </div>
</template>
