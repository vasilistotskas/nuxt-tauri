<script setup lang="ts">
import type { Banner } from '../types/content'

defineProps<{
  banners: Banner[]
}>()
</script>

<template>
  <section class="space-y-3 px-4 md:px-0">
    <!-- Mobile: Carousel -->
    <UCarousel
      v-slot="{ item }"
      :items="banners"
      :ui="{
        item: `
          basis-auto
          first:ps-4
        `,
        container: 'gap-1',
      }"
      class="w-full md:hidden"
    >
      <div
        class="
          relative h-[273px] w-[200px] overflow-hidden rounded-xl bg-neutral-200
          dark:bg-neutral-700
        "
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || 'Banner'"
          class="h-full w-full rounded-xl object-cover"
        >
      </div>
    </UCarousel>

    <!-- Tablet/Desktop: Grid -->
    <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      <div
        v-for="(item, index) in banners"
        :key="index"
        class="
          relative h-[273px] md:h-[300px] lg:h-[340px] xl:h-[380px] overflow-hidden rounded-xl bg-neutral-200
          dark:bg-neutral-700 transition-transform hover:scale-[1.02] cursor-pointer
        "
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || 'Banner'"
          class="h-full w-full rounded-xl object-cover"
        >
      </div>
    </div>
  </section>
</template>
