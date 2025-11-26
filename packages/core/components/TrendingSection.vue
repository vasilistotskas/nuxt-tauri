<script setup lang="ts">
import type { TrendingItem } from '../types/content'

defineProps<{
  items: TrendingItem[]
}>()
</script>

<template>
  <section class="space-y-3 px-4 md:px-0">
    <h2
      class="
        text-[22px] md:text-2xl lg:text-3xl font-medium tracking-[0.5px] text-black
        dark:text-white
      "
    >
      Trending now
    </h2>

    <!-- Mobile: Carousel -->
    <UCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{
        item: `
          basis-auto
          first:ps-4
        `,
      }"
      class="md:hidden"
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

    <!-- Tablet/Desktop: Grid -->
    <div class="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="
          relative h-[353px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-xl bg-[#d9d9d9]
          dark:bg-[#333333] transition-transform hover:scale-[1.02] cursor-pointer
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
              flex size-[58px] md:size-[68px] lg:size-[76px] items-center justify-center rounded-full
              bg-white/90 shadow-lg transition-transform hover:scale-110
              dark:bg-white/90
            "
          >
            <UIcon name="lucide:play" class="ms-1 size-6 md:size-7 lg:size-8 fill-black text-black" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
