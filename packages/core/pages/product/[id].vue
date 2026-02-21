<script setup lang="ts">
import type { TabsItem } from '#ui/types'

const route = useRoute()
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()

const productId = computed(() => route.params.id as string)
const { data: product } = useProduct(productId)

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const activeImageIndex = ref(0)

const productImages = computed(() => {
  if (!product.value)
    return []
  return product.value.images?.length
    ? product.value.images
    : product.value.image
      ? [product.value.image]
      : []
})

const breadcrumbItems = computed(() => [
  { label: $i18n.t('nav.home'), to: localePath({ path: '/' }) },
  { label: $i18n.t('nav.shop'), to: localePath({ path: '/shop' }) },
  { label: product.value?.name || '...' },
])

const tabItems = computed<TabsItem[]>(() => [
  {
    label: $i18n.t('product.description'),
    value: 'description',
    slot: 'description' as const,
  },
  {
    label: $i18n.t('product.reviewsTab'),
    value: 'reviews',
    slot: 'reviews' as const,
  },
])

function handleAddToCart() {
  if (product.value) {
    cartStore.addItem(product.value)
  }
}
</script>

<template>
  <div
    class="
      md:px-6
      lg:px-8
    "
  >
    <!-- Mobile: Back button -->
    <div
      class="
        px-4 pt-4
        md:hidden
      "
    >
      <UButton
        icon="lucide:arrow-left"
        variant="ghost"
        color="neutral"
        size="md"
        :to="localePath({ path: '/shop' })"
      />
    </div>

    <!-- Desktop: Breadcrumb -->
    <div
      class="
        hidden pt-4
        md:block
      "
    >
      <UBreadcrumb :items="breadcrumbItems" />
    </div>

    <div v-if="product" class="md:flex md:gap-8 md:pt-6">
      <!-- Image Gallery -->
      <div
        class="
          md:w-1/2
          lg:w-2/5
        "
      >
        <div
          class="
            relative aspect-square bg-neutral-100
            md:overflow-hidden md:rounded-xl
            dark:bg-neutral-800
          "
        >
          <img
            v-if="productImages[activeImageIndex]"
            :src="productImages[activeImageIndex]"
            :alt="product.name"
            class="size-full object-cover"
          >
          <!-- Favorite Button -->
          <UButton
            icon="lucide:heart"
            color="neutral"
            variant="ghost"
            size="lg"
            square
            class="absolute top-3 right-3"
            :ui="{
              base: favoritesStore.isFavorite(product.id) ? 'text-error' : `
                text-muted
              `,
              leadingIcon: 'size-6',
            }"
            @click="favoritesStore.toggle(product.id)"
          />
          <!-- Badges -->
          <div
            v-if="product.badges?.length" class="
              absolute bottom-3 left-3 flex flex-col gap-1
            "
          >
            <UBadge
              v-for="badge in product.badges"
              :key="badge.label"
              :color="badge.color"
              variant="solid"
              size="sm"
              class="px-2 py-1 text-center text-xs whitespace-pre-line"
            >
              {{ badge.label }}
            </UBadge>
          </div>
        </div>

        <!-- Thumbnails -->
        <div
          v-if="productImages.length > 1"
          class="
            flex gap-2 p-4
            md:gap-3 md:pt-4
          "
        >
          <button
            v-for="(img, i) in productImages"
            :key="i"
            class="
              size-16 overflow-hidden rounded-lg border-2 transition-colors
              md:size-20
            "
            :class="activeImageIndex === i ? 'border-primary' : `
              border-transparent
            `"
            @click="activeImageIndex = i"
          >
            <img
              :src="img"
              :alt="`${product.name} ${i + 1}`"
              class="size-full object-cover"
            >
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div
        class="
          flex-1 space-y-4 px-4 pt-4
          md:space-y-5 md:px-0 md:pt-0
        "
      >
        <div>
          <p
            class="
              text-sm font-semibold tracking-wider text-muted uppercase
              md:text-base
            "
          >
            {{ product.brand }}
          </p>
          <h1
            class="
              mt-1 text-xl font-bold text-default
              md:text-2xl
              lg:text-3xl
            "
          >
            {{ product.name }}
          </h1>
        </div>

        <!-- Rating -->
        <div v-if="product.rating" class="flex items-center gap-2">
          <div class="flex items-center gap-0.5">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="lucide:star"
              class="
                size-4 fill-yellow-400 text-yellow-400
                md:size-5
              "
            />
          </div>
          <span
            class="
              text-sm text-dimmed
              md:text-base
            "
          >
            {{ product.reviews }} {{ $i18n.t('product.reviews') }}
          </span>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-3">
          <span
            class="
              text-2xl font-bold text-default
              md:text-3xl
            "
          >
            {{ product.price }}€
          </span>
          <span
            v-if="product.originalPrice"
            class="
              text-lg text-dimmed line-through
              md:text-xl
            "
          >
            {{ product.originalPrice }}€
          </span>
          <UBadge
            v-if="product.saveAmount"
            color="warning"
            variant="solid"
            size="sm"
            class="rounded-full px-2.5 py-1 text-xs font-medium"
          >
            {{ $i18n.t('product.save') }}: -{{ product.saveAmount }}€
          </UBadge>
        </div>

        <p
          class="
            flex items-center gap-1.5 text-sm text-success
            md:text-base
          "
        >
          <UIcon
            name="lucide:check-circle" class="
              size-4
              md:size-5
            "
          />
          {{ $i18n.t('product.inStock') }}
        </p>

        <!-- Add to Cart -->
        <UButton
          block
          size="xl"
          color="primary"
          class="
            h-[52px] text-lg font-semibold
            md:max-w-sm
          "
          @click="handleAddToCart"
        >
          {{ $i18n.t('product.addToCart') }}
        </UButton>

        <!-- Mobile: Simple description -->
        <div
          v-if="product.description"
          class="
            pt-4
            md:hidden
          "
        >
          <h2 class="mb-2 text-lg font-semibold text-default">
            {{ $i18n.t('product.description') }}
          </h2>
          <p class="text-sm/relaxed text-muted">
            {{ product.description }}
          </p>
        </div>

        <!-- Desktop: Tabbed description / reviews -->
        <div
          class="
            hidden pt-4
            md:block
          "
        >
          <UTabs :items="tabItems" variant="link" color="neutral">
            <template #description>
              <div class="py-4">
                <p
                  v-if="product.description" class="
                    text-base/relaxed text-muted
                  "
                >
                  {{ product.description }}
                </p>
                <p v-else class="text-base text-dimmed">
                  {{ $i18n.t('shop.noResultsDesc') }}
                </p>
              </div>
            </template>
            <template #reviews>
              <div class="flex flex-col items-center gap-4 py-8 text-center">
                <UIcon name="lucide:message-square" class="size-12 text-dimmed" />
                <p class="text-base text-muted">
                  {{ product.reviews }} {{ $i18n.t('product.reviews') }}
                </p>
              </div>
            </template>
          </UTabs>
        </div>
      </div>
    </div>

    <!-- Loading / Not Found -->
    <div
      v-else
      class="
        flex flex-col items-center gap-4 py-16 text-center
        md:py-24
      "
    >
      <UIcon name="lucide:package-x" class="size-16 text-dimmed" />
      <h2 class="text-lg font-semibold text-default">
        {{ $i18n.t('errors.pageNotFound') }}
      </h2>
      <UButton
        :to="localePath({ path: '/shop' })"
        variant="outline"
        size="lg"
      >
        {{ $i18n.t('nav.shop') }}
      </UButton>
    </div>
  </div>
</template>
