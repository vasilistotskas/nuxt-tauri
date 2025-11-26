<script setup lang="ts">
definePageMeta({
  layout: 'mobile',
})

const banners = ref([
  { image: 'https://www.figma.com/api/mcp/asset/72ad5c66-3833-474e-8aa2-2e8f024df1e7', title: 'Hair Edition' },
  { image: 'https://www.figma.com/api/mcp/asset/1180ced4-37f8-4d51-a0aa-061666119d48', title: 'Makeup' },
])

const trendingItems = ref([
  { image: 'https://www.figma.com/api/mcp/asset/e5e41121-b262-402f-9a0a-4b1e2680934b' },
  { image: 'https://www.figma.com/api/mcp/asset/3a29910f-08a0-4064-a1fd-6f216f1dfea7' },
  { image: 'https://www.figma.com/api/mcp/asset/bafc3050-ce29-4eb5-9215-c9295e2c2dbf' },
])

const giftTabs = ['Vichy', 'Eva Belle', 'Cerave', 'Korres']
const giftProducts = ref([
  { id: 1, brand: 'Vichy Mineral 89ml', name: 'With every purchase of the Vichy Mineral 89 series a Vichy mineral 89 ml gift.', price: 0, image: 'https://www.figma.com/api/mcp/asset/83084ca3-9a14-4253-ba86-dbf905dd518d' },
  { id: 2, brand: 'CeraVe Hydrating', name: 'With every purchase Cerave products, rec Hydrating Cleanser 20ml', price: 0, image: 'https://www.figma.com/api/mcp/asset/d58e31a1-d366-4414-b59f-01418789b969' },
])

const bestsellerTabs = ['New in', 'Bestsellers', 'Picked for you']
const bestsellerProducts = ref([
  { id: 3, brand: 'La Roche Posay', name: 'Effaclar Mat Sebum-regulating Anti-Oily....', price: 44.08, originalPrice: 74.83, saveAmount: 30.75, rating: 5, reviews: 1090, caresPoints: 254, image: 'https://www.figma.com/api/mcp/asset/7d5ec84e-1249-468e-9e6a-66d0a53b5c2b', badges: [{ label: 'PROMO\nPACK', color: 'secondary' as const }, { label: 'OFFER', color: 'success' as const }, { label: 'GIFT', color: 'neutral' as const }] },
  { id: 4, brand: 'La Roche Posay', name: 'Lipikar Surgras Liquide', price: 11.72, rating: 5, reviews: 1090, caresPoints: 254, image: 'https://www.figma.com/api/mcp/asset/f842af68-18f8-49d1-ab1b-4da0ccfc08ee' },
])

const brandTabs = ['Korres', 'La Roche Posay', 'Frazyderm']
const brandProducts = ref([
  { id: 5, brand: 'Korres Jasmine', name: 'Shower Gel 400ml', price: 13.07, rating: 5, reviews: 1090, caresPoints: 254, image: 'https://www.figma.com/api/mcp/asset/924bf127-3d78-4296-9b3f-e37191eaeed0' },
  { id: 6, brand: 'Korres Black Pin', name: 'Youth Activating Serum for Wrinkle Smoothing Radiance 30ml', price: 13.07, rating: 5, reviews: 1090, caresPoints: 254, image: 'https://www.figma.com/api/mcp/asset/a2ece69c-d75c-4dfa-9679-48faf308094c' },
])

const needTabs = ['Skincare', 'Baby care', 'Vitamins']
const needProducts = ref([
  { id: 7, brand: 'Bio-Oil', name: 'Skincare Oil Natural 60ml', price: 13.07, rating: 5, reviews: 1090, caresPoints: 254, image: 'https://www.figma.com/api/mcp/asset/1634be51-67b6-4a10-932a-1393bb8661fd' },
  { id: 8, brand: 'L\'Oreal Paris', name: 'Revitalift Anti-Wrinkle Cream 50ml', price: 13.07, rating: 5, reviews: 1090, caresPoints: 254, image: 'https://www.figma.com/api/mcp/asset/afa6dbfa-76c5-4c7c-bd6e-32bf121fc507' },
])
</script>

<template>
  <div>
    <WeCareHeader />
    <SearchBar class="mb-4" />
    <WeCareCTACard class="mb-5" />
    <BannerCarousel :banners="banners" class="mb-5" />
    <TrendingSection :items="trendingItems" class="mb-5" />
    <ProductSection
      title="Extra gifts" :tabs="giftTabs" :products="giftProducts" class="mb-5"
    />
    <ProductSection
      title="Discover the bestsellers" :tabs="bestsellerTabs" :products="bestsellerProducts" class="
        mb-5
      "
    />
    <ProductSection
      title="Discover the most desired brands" :tabs="brandTabs" :products="brandProducts" class="
        mb-5
      "
    />
    <ProductSection
      title="Shop by need" :tabs="needTabs" :products="needProducts" class="
        mb-5
      "
    />
  </div>
</template>
