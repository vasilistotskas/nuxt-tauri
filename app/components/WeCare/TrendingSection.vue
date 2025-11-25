<template>
	<section class="px-4 space-y-4">
		<h2 class="font-medium text-xl text-black dark:text-white">Trending now</h2>

		<div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
			<div
				v-for="(item, index) in items"
				:key="index"
				class="relative flex-shrink-0 w-36 h-80 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700"
			>
				<img
					v-if="item.image"
					:src="item.image"
					:alt="item.title || 'Trending'"
					class="w-full h-full object-cover"
				>
				<div class="absolute inset-0 flex items-center justify-center">
					<UButton
						icon="lucide:play"
						color="neutral"
						variant="solid"
						size="xl"
						class="rounded-full bg-white/80 dark:bg-black/80"
						aria-label="Play video"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
interface TrendingItem {
	image?: string
	title?: string
	videoUrl?: string
}

defineProps<{
	items: TrendingItem[]
}>();
</script>
