<script setup lang="ts">
import type { Banner } from '../types/content'

defineProps<{
  banners: Banner[]
}>()
</script>

<template>
  <section
    class="
      space-y-3 px-4
      md:px-0
    "
  >
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
      class="
        w-full
        md:hidden
      "
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
          class="size-full rounded-xl object-cover"
        >
      </div>
    </UCarousel>

    <!-- Tablet/Desktop: Grid -->
    <div
      class="
        hidden gap-4
        md:grid md:grid-cols-2
        lg:grid-cols-3 lg:gap-6
        xl:grid-cols-4
      "
    >
      <div
        v-for="(item, index) in banners"
        :key="index"
        class="
          relative h-[273px] cursor-pointer overflow-hidden rounded-xl
          bg-neutral-200 transition-transform
          hover:scale-[1.02]
          md:h-[300px]
          lg:h-[340px]
          xl:h-[380px]
          dark:bg-neutral-700
        "
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || 'Banner'"
          class="size-full rounded-xl object-cover"
        >
      </div>
    </div>
  </section>
</template>
