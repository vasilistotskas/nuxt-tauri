<script setup lang="ts">
defineProps<{
  label: string
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div>
    <button
      class="flex w-full items-center justify-between py-4 text-left"
      @click="$emit('click')"
    >
      <span
        class="
          text-lg tracking-wide text-black
          dark:text-white
        "
      >
        {{ label }}
      </span>
      <UIcon
        name="lucide:chevron-right"
        class="
          size-6 text-black
          dark:text-white
        "
      />
    </button>
    <USeparator />
  </div>
</template>
