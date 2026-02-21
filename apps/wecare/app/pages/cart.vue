<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const { $i18n } = useNuxtApp()

const suggestedProducts = ref<Product[]>([
  {
    id: 1,
    brand: 'La Roche Posay',
    name: 'Effaclar Mat Sebum-regulating Anti-Oily....',
    price: 13.07,
    rating: 5,
    reviews: 1090,
    meta: { caresPoints: 254 },
    image: 'https://placehold.co/180x180/f2f2f2/333?text=LRP',
  },
  {
    id: 2,
    brand: 'La Roche Posay',
    name: 'Effaclar Mat Sebum-regulating Anti-Oily....',
    price: 13.07,
    rating: 5,
    reviews: 1090,
    meta: { caresPoints: 254 },
    image: 'https://placehold.co/180x180/f2f2f2/333?text=LRP+2',
  },
  {
    id: 3,
    brand: 'CeraVe',
    name: 'Hydrating Cleanser for Normal to Dry Skin',
    price: 15.99,
    rating: 5,
    reviews: 2340,
    meta: { caresPoints: 180 },
    image: 'https://placehold.co/180x180/f2f2f2/333?text=CeraVe',
  },
  {
    id: 4,
    brand: 'Vichy',
    name: 'Mineral 89 Hyaluronic Acid Face Serum',
    price: 24.50,
    rating: 5,
    reviews: 890,
    meta: { caresPoints: 320 },
    image: 'https://placehold.co/180x180/f2f2f2/333?text=Vichy',
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
        class="text-center text-2xl font-bold tracking-wide text-default"
      >
        {{ $i18n.t('cart.title') }}
      </h1>
      <USeparator class="mt-4" />
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
          mb-6 text-center text-lg font-bold tracking-wide text-default
          uppercase
          md:text-xl
        "
      >
        {{ $i18n.t('cart.youMightLike') }}
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
              bg-dimmed size-2.5 rounded-full
              data-[state=active]:bg-default
            `,
          }"
        >
          <WeCareProductCard :product="item" show-add-to-cart @add-to-cart="handleAddToCart(item)" />
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
        <WeCareProductCard
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
      <USeparator />
      <p
        class="
          py-4 text-[15px] tracking-wide text-default
          md:text-base
        "
      >
        <span class="font-bold">{{ t('freeShipping') }}</span> {{ t('freeShippingThreshold') }}
      </p>
      <USeparator />
      <p
        class="
          py-4 text-[15px] tracking-wide text-default
          md:text-base
        "
      >
        <span class="font-bold">{{ t('telephoneOrders') }}</span> 210 700 1375
      </p>
    </section>
  </div>
</template>

<i18n lang="yaml">
en:
  freeShipping: Free shipping
  freeShippingThreshold: for orders over 49.00€
  telephoneOrders: Telephone orders
el:
  freeShipping: Δωρεάν αποστολή
  freeShippingThreshold: για παραγγελίες άνω των 49.00€
  telephoneOrders: Τηλεφωνικές παραγγελίες
</i18n>
