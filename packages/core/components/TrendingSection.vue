<script setup lang="ts">
withDefaults(defineProps<{
  items: TrendingItem[]
  title?: string
}>(), {
  title: undefined,
})

const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <section
    class="
      space-y-3 px-4
      md:px-0
    "
  >
    <h2
      class="
        text-[22px] font-medium tracking-[0.5px] text-default
        md:text-2xl
        lg:text-3xl
      "
    >
      {{ title || t('trendingNow') }}
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
        class="relative h-[353px] w-[148px] overflow-hidden rounded-xl bg-muted"
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || t('trendingNow')"
          class="size-full rounded-xl object-cover"
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
    <div
      class="
        hidden gap-4
        md:grid md:grid-cols-3
        lg:grid-cols-4 lg:gap-6
        xl:grid-cols-5
      "
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="
          relative h-[353px] cursor-pointer overflow-hidden rounded-xl bg-muted
          transition-transform
          hover:scale-[1.02]
          md:h-[380px]
          lg:h-[420px]
        "
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || t('trendingNow')"
          class="size-full rounded-xl object-cover"
        >
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="
              flex size-[58px] items-center justify-center rounded-full
              bg-white/90 shadow-lg transition-transform
              hover:scale-110
              md:size-[68px]
              lg:size-[76px]
              dark:bg-white/90
            "
          >
            <UIcon
              name="lucide:play" class="
                ms-1 size-6 fill-black text-black
                md:size-7
                lg:size-8
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<i18n lang="yaml">
en:
  trendingNow: Trending now
el:
  trendingNow: Τάσεις τώρα
</i18n>
