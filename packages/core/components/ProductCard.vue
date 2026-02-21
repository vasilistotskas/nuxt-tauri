<script setup lang="ts">
defineProps<{
  product: Product
  showAddToCart?: boolean
}>()

defineEmits<{
  addToCart: []
}>()

const { t } = useI18n({ useScope: 'local' })

const favoritesStore = useFavoritesStore()
const localePath = useLocalePath()
</script>

<template>
  <UCard
    class="
      flex w-[180px] flex-col overflow-hidden transition-shadow
      hover:shadow-lg
      md:w-full
    "
    :ui="{
      root: `rounded-[10px] border border-default bg-default`,
      body: 'p-0',
    }"
  >
    <!-- Image -->
    <div
      class="
        relative aspect-square bg-neutral-100
        dark:bg-neutral-800
      "
    >
      <NuxtLink :to="localePath({ path: `/product/${product.id}` })">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="size-full rounded-t-xl object-cover"
        >
      </NuxtLink>
      <!-- Favorite Button -->
      <UButton
        icon="lucide:heart"
        color="neutral"
        variant="ghost"
        size="md"
        square
        class="absolute top-1.5 right-1.5"
        :ui="{
          base: favoritesStore.isFavorite(product.id) ? 'text-error' : `
            text-muted
          `,
          leadingIcon: 'size-5',
        }"
        :aria-label="t('addToFavorites')"
        @click.prevent="favoritesStore.toggle(product.id)"
      />
      <!-- Badges -->
      <div
        v-if="product.badges?.length" class="
          absolute bottom-1.5 left-1.5 flex flex-col gap-0.5
        "
      >
        <UBadge
          v-for="badge in product.badges"
          :key="badge.label"
          :color="badge.color"
          variant="solid"
          size="xs"
          class="
            px-1.5 py-0.5 text-center text-[10px] leading-tight
            whitespace-pre-line
          "
        >
          {{ badge.label }}
        </UBadge>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col space-y-1 p-2.5">
      <NuxtLink :to="localePath({ path: `/product/${product.id}` })">
        <p class="line-clamp-1 text-base font-semibold text-default">
          {{ product.brand }}
        </p>
        <p class="line-clamp-2 text-xs/tight text-muted">
          {{ product.name }}
        </p>
      </NuxtLink>

      <!-- Save badge -->
      <div v-if="product.saveAmount" class="pt-0.5">
        <UBadge
          color="warning"
          variant="solid"
          size="sm"
          class="rounded-full px-2.5 py-1 text-xs font-medium"
        >
          {{ t('save') }}: -{{ product.saveAmount }}€
        </UBadge>
      </div>

      <!-- Price -->
      <div v-if="product.price > 0" class="flex items-baseline gap-1.5 pt-0.5">
        <span class="text-lg font-bold text-default">{{ product.price }}€</span>
        <span
          v-if="product.originalPrice"
          class="text-sm text-dimmed line-through"
        >
          {{ product.originalPrice }}€
        </span>
      </div>

      <!-- Rating -->
      <div v-if="product.rating" class="space-y-0.5 pt-0.5">
        <div class="flex items-center gap-0.5">
          <UIcon
            v-for="i in 5"
            :key="i"
            name="lucide:star"
            class="size-2.5 fill-yellow-400 text-yellow-400"
          />
        </div>
        <span class="block text-xs text-dimmed">
          {{ product.reviews }} {{ t('reviews') }}
        </span>
      </div>

      <!-- Brand-specific meta slot -->
      <slot name="meta" :product="product" />

      <!-- Add to Cart Button -->
      <div v-if="showAddToCart" class="mt-auto pt-2">
        <UButton
          block
          color="neutral"
          variant="solid"
          size="lg"
          class="
            h-[41px] rounded-lg bg-inverted font-normal text-inverted
            hover:bg-inverted/90
          "
          :ui="{
            base: 'justify-center',
          }"
          @click="$emit('addToCart')"
        >
          {{ t('addToCart') }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<i18n lang="yaml">
en:
  addToFavorites: Add to favorites
  save: Save
  reviews: reviews
  addToCart: Add to Cart
el:
  addToFavorites: Προσθήκη στα αγαπημένα
  save: Έκπτωση
  reviews: κριτικές
  addToCart: Προσθήκη στο καλάθι
</i18n>
