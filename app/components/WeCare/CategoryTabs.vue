<template>
	<div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
		<UButton
			v-for="(tab, index) in tabs"
			:key="tab"
			:color="index === activeIndex ? 'neutral' : 'neutral'"
			:variant="index === activeIndex ? 'solid' : 'outline'"
			size="lg"
			class="rounded-full whitespace-nowrap shrink-0 h-11 px-4"
			:class="index === activeIndex
				? 'bg-black dark:bg-white text-white dark:text-[#0d0d0d] border-0'
				: 'bg-transparent dark:bg-[#1a1a1a] text-black dark:text-white border border-[#d7d7d7] dark:border-[#969696]'"
			:ui="{
				base: 'font-normal text-base'
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
	}>();

	defineEmits<{
		"update:activeIndex": [index: number]
	}>();
</script>
