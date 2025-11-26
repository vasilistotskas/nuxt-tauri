<script setup lang="ts">
import type { BadgeProps } from '#ui/types'
import type { Product, ProductBadge } from '../types/product'

defineProps<{
  product: Product
  showAddToCart?: boolean
}>()

defineEmits<{
  addToCart: []
}>()

function getBadgeClass(badge: ProductBadge): string {
  const classMap: Record<NonNullable<BadgeProps['color']>, string> = {
    success: '!bg-[#3a833c] dark:!bg-[#429545] !text-white',
    secondary: '!bg-[#995bb9] dark:!bg-[#a56dc1] !text-white',
    neutral: '!bg-black dark:!bg-black !text-white',
    primary: '!bg-black !text-white',
    warning: '!bg-[#ffd700] !text-black',
    error: '!bg-red-500 !text-white',
    info: '!bg-blue-500 !text-white',
  }
  return classMap[badge.color] || ''
}
</script>

<template>
  <UCard
    class="flex w-[180px] md:w-full flex-col overflow-hidden transition-shadow hover:shadow-lg"
    :ui="{
      root: `
        rounded-[10px] border border-[#d7d7d7] bg-white
        dark:border-[#353535] dark:bg-[#0d0d0d]
      `,
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
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="h-full w-full rounded-t-xl object-cover"
      >
      <!-- Favorite Button -->
      <UButton
        icon="lucide:heart"
        color="neutral"
        variant="ghost"
        size="md"
        square
        class="absolute top-1.5 right-1.5"
        :ui="{
          base: `
            text-[#686868]
            dark:text-[#969696]
          `,
          leadingIcon: 'size-5',
        }"
        aria-label="Add to favorites"
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
          :class="getBadgeClass(badge)"
        >
          {{ badge.label }}
        </UBadge>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col space-y-1 p-2.5">
      <p
        class="
          line-clamp-1 text-base font-semibold text-black
          dark:text-white
        "
      >
        {{ product.brand }}
      </p>
      <p
        class="
          line-clamp-2 text-xs leading-tight text-[#686868]
          dark:text-[#969696]
        "
      >
        {{ product.name }}
      </p>

      <!-- Save badge -->
      <div v-if="product.saveAmount" class="pt-0.5">
        <UBadge
          color="warning"
          variant="solid"
          size="sm"
          class="
            rounded-full bg-[#ffd700] px-2.5 py-1 text-xs font-medium text-black
            dark:bg-[#ffdd1a]
          "
        >
          Save: -{{ product.saveAmount }}€
        </UBadge>
      </div>

      <!-- Price -->
      <div v-if="product.price > 0" class="flex items-baseline gap-1.5 pt-0.5">
        <span
          class="
            text-lg font-bold text-black
            dark:text-white
          "
        >{{ product.price }}€</span>
        <span
          v-if="product.originalPrice" class="
            text-sm text-[#929292] line-through
            dark:text-[#969696]
          "
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
        <span
          class="
            block text-xs text-[#929292]
            dark:text-[#969696]
          "
        >
          {{ product.reviews }} reviews
        </span>
      </div>

      <!-- Cares points -->
      <p
        v-if="product.caresPoints" class="
          text-xs text-[#929292]
          dark:text-[#969696]
        "
      >
        <span class="font-bold text-[#1887aa]">{{ product.caresPoints }}</span>
        <span class="font-medium"> Cares</span>
      </p>

      <!-- Add to Cart Button -->
      <div v-if="showAddToCart" class="mt-auto pt-2">
        <UButton
          block
          color="neutral"
          variant="solid"
          size="lg"
          class="
            h-[41px] rounded-lg bg-white text-[#0d0d0d] font-normal
            hover:bg-gray-100
            dark:bg-white dark:text-[#0d0d0d] dark:hover:bg-gray-100
          "
          :ui="{
            base: 'justify-center',
          }"
          @click="$emit('addToCart')"
        >
          Add to Cart
        </UButton>
      </div>
    </div>
  </UCard>
</template>
