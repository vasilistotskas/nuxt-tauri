<script setup lang="ts">
import type { TrendingItem } from '../types/content'

defineProps<{
  items: TrendingItem[]
}>()
</script>

<template>
  <section class="space-y-3 px-4">
    <h2
      class="
        text-[22px] font-medium tracking-[0.5px] text-black
        dark:text-white
      "
    >
      Trending now
    </h2>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{
        item: `
          basis-auto
          first:ps-4
        `,
      }"
    >
      <div
        class="
          relative h-[353px] w-[148px] overflow-hidden rounded-xl bg-[#d9d9d9]
          dark:bg-[#333333]
        "
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || 'Trending'"
          class="h-full w-full rounded-xl object-cover"
        >
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="
              flex size-[58px] items-center justify-center rounded-full
              bg-white/90 shadow-lg
              dark:bg-white/90
            "
          >
            <UIcon name="lucide:play" class="ms-1 size-6 fill-black text-black" />
          </div>
        </div>
      </div>
    </UCarousel>
  </section>
</template>
