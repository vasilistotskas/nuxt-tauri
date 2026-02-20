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
  <div
    class="
      scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1
      md:mx-0 md:gap-3 md:px-0
    "
  >
    <UButton
      v-for="(tab, index) in tabs"
      :key="tab"
      color="neutral"
      :variant="index === activeIndex ? 'solid' : 'outline'"
      size="lg"
      class="
        h-11 shrink-0 rounded-full px-4 whitespace-nowrap transition-all
        md:h-12 md:px-6
      "
      :class="index === activeIndex
        ? `border-0`
        : `
          border border-default bg-transparent text-default
          hover:bg-muted
        `"
      :ui="{
        base: `
          text-base font-normal
          md:text-lg
        `,
      }"
      @click="$emit('update:activeIndex', index)"
    >
      {{ tab }}
    </UButton>
  </div>
</template>
