<template>
	<div class="flex gap-2.5 px-4">
		<UInput
			v-model="searchQuery"
			placeholder="Search products..."
			icon="lucide:search"
			size="xl"
			variant="soft"
			class="flex-1"
			:ui="{
				root: 'h-12',
				base: 'rounded-full h-12 bg-[#f2f2f2] dark:bg-[#242424] ps-11 text-sm placeholder:text-[#686868] dark:placeholder:text-[#969696]',
				leadingIcon: 'text-black dark:text-white size-5 ms-3.5'
			}"
		/>
		<UButton
			icon="lucide:scan"
			color="neutral"
			variant="soft"
			size="xl"
			square
			class="flex items-center justify-center rounded-full size-12 bg-[#f2f2f2] dark:bg-[#242424] text-black dark:text-white"
			:ui="{
				leadingIcon: 'size-6'
			}"
			aria-label="Search by photo"
		/>
	</div>
</template>

<script setup lang="ts">
	const searchQuery = ref("");
</script>
