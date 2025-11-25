<template>
	<div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
		<button
			v-for="(tab, index) in tabs"
			:key="tab"
			class="px-4 py-2.5 rounded-full whitespace-nowrap text-base font-normal transition-colors"
			:class="index === activeIndex
				? 'bg-black dark:bg-white text-white dark:text-[#0d0d0d]'
				: 'bg-[#f2f2f2] dark:bg-[#1a1a1a] text-black dark:text-white border border-[#dddddd] dark:border-[#969696]'"
			@click="$emit('update:activeIndex', index)"
		>
			{{ tab }}
		</button>
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
