<template>
	<section class="px-4 space-y-3">
		<h2 class="font-medium text-[22px] text-black dark:text-white tracking-[0.5px]">
			{{ title }}
		</h2>

		<WeCareCategoryTabs
			v-if="tabs?.length"
			v-model:active-index="activeTab"
			:tabs="tabs"
		/>

		<UCarousel
			v-slot="{ item }"
			:items="products"
			:ui="{
				item: 'basis-auto first:ps-4'
			}"
		>
			<WeCareProductCard :product="item" />
		</UCarousel>
	</section>
</template>

<script setup lang="ts">
	interface Product {
		id: string | number
		brand: string
		name: string
		price: number
		originalPrice?: number
		saveAmount?: number
		image?: string
		rating?: number
		reviews?: number
		caresPoints?: number
		badges?: { label: string, color: "success" | "error" | "warning" | "info" | "neutral" | "primary" | "secondary" }[]
	}

	defineProps<{
		title: string
		tabs?: string[]
		products: Product[]
	}>();

	const activeTab = ref(0);
</script>
