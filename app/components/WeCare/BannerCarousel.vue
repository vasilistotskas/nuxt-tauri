<template>
	<section class="px-4 space-y-3">
		<UCarousel
			v-slot="{ item }"
			:items="banners"
			:ui="{
				item: 'basis-auto first:ps-4',
				container: 'gap-1'
			}"
			class="w-full"
		>
			<div class="relative w-[200px] h-[273px] overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-700">
				<img
					v-if="item.image"
					:src="item.image"
					:alt="item.title || 'Banner'"
					class="w-full h-full object-cover rounded-xl"
				>
			</div>
		</UCarousel>
	</section>
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
