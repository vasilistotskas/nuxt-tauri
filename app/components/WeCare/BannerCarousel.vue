<template>
  <section class="space-y-3 px-4">
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
      class="w-full"
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
  </section>
</template>

<script setup lang="ts">
interface Banner {
  image?: string
  title?: string
  link?: string
}

defineProps<{
  banners: Banner[]
}>()
</script>
