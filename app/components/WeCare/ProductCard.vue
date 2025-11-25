<template>
	<div class="bg-white dark:bg-[#0d0d0d] border border-[#d7d7d7] dark:border-[#353535] rounded-xl overflow-hidden min-w-[180px] max-w-[200px]">
		<!-- Image -->
		<div class="relative aspect-square bg-neutral-100 dark:bg-neutral-800">
			<img
				v-if="product.image"
				:src="product.image"
				:alt="product.name"
				class="w-full h-full object-cover rounded-t-xl"
			>
			<!-- Favorite Button -->
			<button
				class="absolute top-2 right-2 size-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#1a1a1a]/90 shadow-sm hover:bg-white dark:hover:bg-[#2a2a2a] transition-colors"
				aria-label="Add to favorites"
			>
				<UIcon name="lucide:heart" class="size-5 text-[#686868] dark:text-[#969696]" />
			</button>
			<!-- Badges -->
			<div v-if="product.badges?.length" class="absolute top-2 left-2 flex flex-col gap-1">
				<span
					v-for="badge in product.badges"
					:key="badge.label"
					class="px-2 py-1 rounded text-xs font-medium text-center whitespace-pre-line leading-tight"
					:class="getBadgeClass(badge)"
				>
					{{ badge.label }}
				</span>
			</div>
		</div>

		<!-- Content -->
		<div class="p-3 space-y-1.5">
			<h4 class="font-medium text-[17px] text-black dark:text-white line-clamp-1">{{ product.brand }}</h4>
			<p class="text-sm text-[#686868] dark:text-[#969696] line-clamp-2 leading-tight">{{ product.name }}</p>

			<!-- Save badge -->
			<div v-if="product.saveAmount" class="pt-1">
				<span class="inline-block bg-[#ffd700] dark:bg-[#ffdd1a] text-black px-3 py-1.5 rounded-full text-base font-medium">
					Save: -{{ product.saveAmount }}€
				</span>
			</div>

			<!-- Price -->
			<div v-if="product.price > 0" class="flex items-center gap-2 pt-1">
				<span class="font-medium text-xl text-black dark:text-white">{{ product.price }}€</span>
				<span v-if="product.originalPrice" class="text-lg text-[#929292] dark:text-[#969696] line-through">{{ product.originalPrice }}€</span>
			</div>

			<!-- Rating -->
			<div v-if="product.rating" class="space-y-0.5">
				<div class="flex items-center gap-0.5">
					<svg
						v-for="i in 5"
						:key="i"
						class="size-3"
						:class="i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300 fill-neutral-300'"
						viewBox="0 0 24 24"
					>
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
				</div>
				<span class="text-sm text-[#929292] dark:text-[#969696] block">{{ product.reviews }} reviews</span>
			</div>

			<!-- Cares points -->
			<p v-if="product.caresPoints" class="text-sm text-[#929292] dark:text-[#969696]">
				<span class="font-bold text-wecare dark:text-wecare-dark">{{ product.caresPoints }}</span> Cares
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface ProductBadge {
	label: string
	color: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary' | 'secondary'
}

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
	badges?: ProductBadge[]
}

defineProps<{
	product: Product
}>();

function getBadgeClass(badge: ProductBadge): string {
	const colorMap: Record<ProductBadge["color"], string> = {
		success: "bg-[#3a833c] dark:bg-[#429545] text-white dark:text-[#0d0d0d]",
		secondary: "bg-[#995bb9] dark:bg-[#a56dc1] text-white dark:text-[#0d0d0d]",
		neutral: "bg-black dark:bg-black text-white",
		primary: "bg-black text-white",
		warning: "bg-[#ffd700] text-black",
		error: "bg-red-500 text-white",
		info: "bg-blue-500 text-white"
	};
	return colorMap[badge.color];
}
</script>
