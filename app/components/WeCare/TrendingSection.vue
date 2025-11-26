<template>
	<section class="px-4 space-y-3">
		<h2 class="font-medium text-[22px] text-black dark:text-white tracking-[0.5px]">
			Trending now
		</h2>

		<UCarousel
			v-slot="{ item }"
			:items="items"
			:ui="{
				item: 'basis-auto first:ps-4'
			}"
		>
			<div class="relative w-[148px] h-[353px] overflow-hidden rounded-xl bg-[#d9d9d9] dark:bg-[#333333]">
				<img
					v-if="item.image"
					:src="item.image"
					:alt="item.title || 'Trending'"
					class="w-full h-full object-cover rounded-xl"
				>
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="size-[58px] rounded-full bg-white/90 dark:bg-white/90 shadow-lg flex items-center justify-center">
						<UIcon name="lucide:play" class="size-6 text-black fill-black ms-1" />
					</div>
				</div>
			</div>
		</UCarousel>
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
