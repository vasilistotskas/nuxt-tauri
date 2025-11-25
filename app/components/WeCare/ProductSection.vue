<template>
	<section class="px-4 space-y-4">
		<h2 class="font-medium text-xl text-black dark:text-white">{{ title }}</h2>

		<WeCareCategoryTabs
			v-if="tabs?.length"
			:tabs="tabs"
			v-model:active-index="activeTab"
		/>

		<div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
			<WeCareProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>
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
	badges?: { label: string; color: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary' | 'secondary' }[]
}

defineProps<{
	title: string
	tabs?: string[]
	products: Product[]
}>();

const activeTab = ref(0);
</script>
