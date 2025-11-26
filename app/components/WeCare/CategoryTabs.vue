<template>
  <div class="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
    <UButton
      v-for="(tab, index) in tabs"
      :key="tab"
      :color="index === activeIndex ? 'neutral' : 'neutral'"
      :variant="index === activeIndex ? 'solid' : 'outline'"
      size="lg"
      class="h-11 shrink-0 rounded-full px-4 whitespace-nowrap"
      :class="index === activeIndex
        ? `
          border-0 bg-black text-white
          dark:bg-white dark:text-[#0d0d0d]
        `
        : `
          border border-[#d7d7d7] bg-transparent text-black
          dark:border-[#969696] dark:bg-[#1a1a1a] dark:text-white
        `"
      :ui="{
        base: 'text-base font-normal',
      }"
      @click="$emit('update:activeIndex', index)"
    >
      {{ tab }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: string[]
  activeIndex: number
}>()

defineEmits<{
  'update:activeIndex': [index: number]
}>()
</script>
