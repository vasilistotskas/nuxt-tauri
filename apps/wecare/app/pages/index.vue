<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

const banners = ref([
  { image: 'https://placehold.co/600x300/1887AA/white?text=Hair+Edition', title: 'Hair Edition' },
  { image: 'https://placehold.co/600x300/a56dc1/white?text=Makeup', title: 'Makeup' },
])

const trendingItems = ref([
  { image: 'https://placehold.co/148x353/d9d9d9/333?text=Trending+1' },
  { image: 'https://placehold.co/148x353/d9d9d9/333?text=Trending+2' },
  { image: 'https://placehold.co/148x353/d9d9d9/333?text=Trending+3' },
])

const giftTabs = computed(() => ['Vichy', 'Eva Belle', 'Cerave', 'Korres'])
const giftProducts = ref([
  { id: 1, brand: 'Vichy Mineral 89ml', name: 'With every purchase of the Vichy Mineral 89 series a Vichy mineral 89 ml gift.', price: 0, image: 'https://placehold.co/180x180/f2f2f2/333?text=Vichy' },
  { id: 2, brand: 'CeraVe Hydrating', name: 'With every purchase Cerave products, rec Hydrating Cleanser 20ml', price: 0, image: 'https://placehold.co/180x180/f2f2f2/333?text=CeraVe' },
])

const bestsellerTabs = computed(() => [t('tabNewIn'), t('tabBestsellers'), t('tabPickedForYou')])
const bestsellerProducts = ref([
  { id: 3, brand: 'La Roche Posay', name: 'Effaclar Mat Sebum-regulating Anti-Oily....', price: 44.08, originalPrice: 74.83, saveAmount: 30.75, rating: 5, reviews: 1090, meta: { caresPoints: 254 }, image: 'https://placehold.co/180x180/f2f2f2/333?text=LRP', badges: [{ label: 'PROMO\nPACK', color: 'secondary' as const }, { label: 'OFFER', color: 'success' as const }, { label: 'GIFT', color: 'neutral' as const }] },
  { id: 4, brand: 'La Roche Posay', name: 'Lipikar Surgras Liquide', price: 11.72, rating: 5, reviews: 1090, meta: { caresPoints: 254 }, image: 'https://placehold.co/180x180/f2f2f2/333?text=LRP+2' },
])

const brandTabs = computed(() => ['Korres', 'La Roche Posay', 'Frazyderm'])
const brandProducts = ref([
  { id: 5, brand: 'Korres Jasmine', name: 'Shower Gel 400ml', price: 13.07, rating: 5, reviews: 1090, meta: { caresPoints: 254 }, image: 'https://placehold.co/180x180/f2f2f2/333?text=Korres' },
  { id: 6, brand: 'Korres Black Pin', name: 'Youth Activating Serum for Wrinkle Smoothing Radiance 30ml', price: 13.07, rating: 5, reviews: 1090, meta: { caresPoints: 254 }, image: 'https://placehold.co/180x180/f2f2f2/333?text=Korres+2' },
])

const needTabs = computed(() => [t('tabSkincare'), t('tabBabyCare'), t('tabVitamins')])
const needProducts = ref([
  { id: 7, brand: 'Bio-Oil', name: 'Skincare Oil Natural 60ml', price: 13.07, rating: 5, reviews: 1090, meta: { caresPoints: 254 }, image: 'https://placehold.co/180x180/f2f2f2/333?text=Bio-Oil' },
  { id: 8, brand: 'L\'Oreal Paris', name: 'Revitalift Anti-Wrinkle Cream 50ml', price: 13.07, rating: 5, reviews: 1090, meta: { caresPoints: 254 }, image: 'https://placehold.co/180x180/f2f2f2/333?text=LOreal' },
])
</script>

<template>
  <div
    class="
      md:px-6
      lg:px-8
    "
  >
    <WeCareHeader />
    <SearchBar
      class="
        mb-4
        md:mx-auto md:mb-6 md:max-w-2xl
      "
    />
    <WeCareCTACard
      class="
        mb-5
        md:mb-8
      "
    />
    <BannerCarousel
      :banners="banners" class="
        mb-5
        md:mb-10
      "
    />
    <TrendingSection
      :items="trendingItems" class="
        mb-5
        md:mb-10
      "
    />
    <ProductSection
      :title="t('extraGifts')" :tabs="giftTabs" :products="giftProducts" class="
        mb-5
        md:mb-10
      "
    />
    <ProductSection
      :title="t('discoverBestsellers')" :tabs="bestsellerTabs" :products="bestsellerProducts" class="
        mb-5
        md:mb-10
      "
    />
    <ProductSection
      :title="t('discoverBrands')" :tabs="brandTabs" :products="brandProducts" class="
        mb-5
        md:mb-10
      "
    />
    <ProductSection
      :title="t('shopByNeed')" :tabs="needTabs" :products="needProducts" class="
        mb-5
        md:mb-10
      "
    />
  </div>
</template>

<i18n lang="yaml">
en:
  extraGifts: Extra gifts
  discoverBestsellers: Discover the bestsellers
  discoverBrands: Discover the most desired brands
  shopByNeed: Shop by need
  tabNewIn: New in
  tabBestsellers: Bestsellers
  tabPickedForYou: Picked for you
  tabSkincare: Skincare
  tabBabyCare: Baby care
  tabVitamins: Vitamins
el:
  extraGifts: Επιπλέον δώρα
  discoverBestsellers: Ανακαλύψτε τα bestsellers
  discoverBrands: Ανακαλύψτε τις πιο επιθυμητές μάρκες
  shopByNeed: Αγορά ανά ανάγκη
  tabNewIn: Νέες αφίξεις
  tabBestsellers: Bestsellers
  tabPickedForYou: Επιλεγμένα για εσάς
  tabSkincare: Περιποίηση δέρματος
  tabBabyCare: Βρεφική φροντίδα
  tabVitamins: Βιταμίνες
</i18n>
