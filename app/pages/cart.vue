<template>
  <div
    class="
      min-h-screen bg-white pb-24
      dark:bg-[#0d0d0d]
    "
  >
    <!-- Header -->
    <header class="px-4 pt-14 pb-4">
      <h1
        class="
          text-center text-2xl font-bold tracking-wide text-black
          dark:text-white
        "
      >
        Cart
      </h1>
      <USeparator
        class="mt-4" :ui="{ border: `
          border-[#e4e4e4]
          dark:border-[#282828]
        ` }"
      />
    </header>

    <!-- Empty Cart State -->
    <WeCareEmptyCartIllustration />

    <!-- You Might Like Section -->
    <section class="mt-8 px-4">
      <h2
        class="
          mb-6 text-center text-lg font-bold tracking-wide text-black
          dark:text-white
        "
      >
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
            size-2.5 bg-[#d7d7d7]
            data-[state=active]:bg-black
            dark:bg-[#353535] dark:data-[state=active]:bg-white
          `,
        }"
      >
        <WeCareProductCard :product="item" show-add-to-cart @add-to-cart="handleAddToCart(item)" />
      </UCarousel>
    </section>

    <!-- Info Section -->
    <section class="mt-8 space-y-4 px-4">
      <USeparator
        :ui="{ border: `
          border-[#d7d7d7]
          dark:border-[#353535]
        ` }"
      />
      <p
        class="
          text-[15px] tracking-wide text-black
          dark:text-white
        "
      >
        <span class="font-bold">Free shipping</span> for orders over 49.00€
      </p>
      <USeparator
        :ui="{ border: `
          border-[#d7d7d7]
          dark:border-[#353535]
        ` }"
      />
      <p
        class="
          text-[15px] tracking-wide text-black
          dark:text-white
        "
      >
        <span class="font-bold">Telephone orders</span> 210 700 1375
      </p>
    </section>

    <!-- Bottom Navigation -->
    <WeCareBottomNav :nav-items="navItems" @navigate="handleNavigate" />
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  brand: string
  name: string
  price: number
  rating: number
  reviews: number
  caresPoints: number
  image: string
}

definePageMeta({
  layout: false,
})

const router = useRouter()

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

const navItems = ref([
  { label: 'Home', icon: 'lucide:house', route: '/', active: false },
  { label: 'Shop', icon: 'lucide:search', route: '/shop', active: false },
  { label: 'Cart', icon: 'lucide:shopping-cart', route: '/cart', active: true },
  { label: 'Favorites', icon: 'lucide:heart', route: '/favorites', active: false },
  { label: 'Account', icon: 'lucide:user', route: '/account', active: false },
])

function handleNavigate(route: string) {
  router.push(route)
}

function handleAddToCart(product: Product) {
  console.log('Added to cart:', product)
}
</script>
