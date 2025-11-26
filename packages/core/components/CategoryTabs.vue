<script setup lang="ts">
defineProps<{
  tabs: string[]
  activeIndex: number
}>()

defineEmits<{
  'update:activeIndex': [index: number]
}>()
</script>

<template>
  <div class="scrollbar-hide -mx-4 md:mx-0 flex gap-2 md:gap-3 overflow-x-auto px-4 md:px-0 pb-1">
    <UButton
      v-for="(tab, index) in tabs"
      :key="tab"
      :color="index === activeIndex ? 'neutral' : 'neutral'"
      :variant="index === activeIndex ? 'solid' : 'outline'"
      size="lg"
      class="h-11 md:h-12 shrink-0 rounded-full px-4 md:px-6 whitespace-nowrap transition-all"
      :class="index === activeIndex
        ? `
          border-0 bg-black text-white
          dark:bg-white dark:text-[#0d0d0d]
        `
        : `
          border border-[#d7d7d7] bg-transparent text-black hover:bg-[#f2f2f2]
          dark:border-[#969696] dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#2a2a2a]
        `"
      :ui="{
        base: 'text-base md:text-lg font-normal',
      }"
      @click="$emit('update:activeIndex', index)"
    >
      {{ tab }}
    </UButton>
  </div>
</template>
