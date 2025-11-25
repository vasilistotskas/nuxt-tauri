<template>
	<div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-4">
		<div
			v-for="(banner, index) in banners"
			:key="index"
			class="relative flex-shrink-0 w-48 h-64 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700"
		>
			<img
				v-if="banner.image"
				:src="banner.image"
				:alt="banner.title || 'Banner'"
				class="w-full h-full object-cover"
			>
			<div v-if="banner.title" class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
				<p class="text-white text-sm font-medium">{{ banner.title }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Banner {
	image?: string
	title?: string
	link?: string
}

defineProps<{
	banners: Banner[]
}>();
</script>
