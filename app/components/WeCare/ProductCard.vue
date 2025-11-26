<template>
	<UCard
		class="w-[200px] flex flex-col overflow-hidden"
		:ui="{
			root: 'bg-white dark:bg-[#0d0d0d] border border-[#d7d7d7] dark:border-[#353535] rounded-[10px]',
			body: 'p-0'
		}"
	>
		<!-- Image -->
		<div class="relative aspect-square bg-neutral-100 dark:bg-neutral-800">
			<img
				v-if="product.image"
				:src="product.image"
				:alt="product.name"
				class="w-full h-full object-cover rounded-t-xl"
			>
			<!-- Favorite Button -->
			<UButton
				icon="lucide:heart"
				color="neutral"
				variant="ghost"
				size="md"
				square
				class="absolute top-1.5 right-1.5"
				:ui="{
					base: 'text-[#686868] dark:text-[#969696]',
					leadingIcon: 'size-5'
				}"
				aria-label="Add to favorites"
			/>
			<!-- Badges -->
			<div v-if="product.badges?.length" class="absolute bottom-1.5 left-1.5 flex flex-col gap-0.5">
				<UBadge
					v-for="badge in product.badges"
					:key="badge.label"
					:color="badge.color"
					variant="solid"
					size="xs"
					class="whitespace-pre-line leading-tight text-center text-[10px] px-1.5 py-0.5"
					:class="getBadgeClass(badge)"
				>
					{{ badge.label }}
				</UBadge>
			</div>
		</div>

		<!-- Content -->
		<div class="p-2.5 space-y-1 flex-1 flex flex-col">
			<p class="font-semibold text-base text-black dark:text-white line-clamp-1">
				{{ product.brand }}
			</p>
			<p class="text-xs text-[#686868] dark:text-[#969696] line-clamp-2 leading-tight">
				{{ product.name }}
			</p>

			<!-- Save badge -->
			<div v-if="product.saveAmount" class="pt-0.5">
				<UBadge
					color="warning"
					variant="solid"
					size="sm"
					class="bg-[#ffd700] dark:bg-[#ffdd1a] text-black rounded-full px-2.5 py-1 text-xs font-medium"
				>
					Save: -{{ product.saveAmount }}€
				</UBadge>
			</div>

			<!-- Price -->
			<div v-if="product.price > 0" class="flex items-baseline gap-1.5 pt-0.5">
				<span class="font-bold text-lg text-black dark:text-white">{{ product.price }}€</span>
				<span v-if="product.originalPrice" class="text-sm text-[#929292] dark:text-[#969696] line-through">
					{{ product.originalPrice }}€
				</span>
			</div>

			<!-- Rating -->
			<div v-if="product.rating" class="space-y-0.5 pt-0.5">
				<div class="flex items-center gap-0.5">
					<UIcon
						v-for="i in 5"
						:key="i"
						name="lucide:star"
						class="size-2.5 text-yellow-400 fill-yellow-400"
					/>
				</div>
				<span class="text-xs text-[#929292] dark:text-[#969696] block">
					{{ product.reviews }} reviews
				</span>
			</div>

			<!-- Cares points -->
			<p v-if="product.caresPoints" class="text-xs text-[#929292] dark:text-[#969696]">
				<span class="font-bold text-[#1887aa]">{{ product.caresPoints }}</span>
				<span class="font-medium"> Cares</span>
			</p>

			<!-- Add to Cart Button -->
			<div v-if="showAddToCart" class="mt-auto pt-2">
				<UButton
					block
					color="neutral"
					variant="solid"
					class="bg-black dark:bg-white text-white dark:text-[#0d0d0d]"
					@click="$emit('addToCart')"
				>
					Add to Cart
				</UButton>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
	type BadgeColor = "success" | "error" | "warning" | "info" | "neutral" | "primary" | "secondary";

	interface ProductBadge {
		label: string
		color: BadgeColor
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
		showAddToCart?: boolean
	}>();

	defineEmits<{
		addToCart: []
	}>();

	function getBadgeClass(badge: ProductBadge): string {
		const classMap: Record<BadgeColor, string> = {
			success: "!bg-[#3a833c] dark:!bg-[#429545] !text-white",
			secondary: "!bg-[#995bb9] dark:!bg-[#a56dc1] !text-white",
			neutral: "!bg-black dark:!bg-black !text-white",
			primary: "!bg-black !text-white",
			warning: "!bg-[#ffd700] !text-black",
			error: "!bg-red-500 !text-white",
			info: "!bg-blue-500 !text-white"
		};
		return classMap[badge.color] || "";
	}
</script>
