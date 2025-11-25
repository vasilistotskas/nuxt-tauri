<template>
	<nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0d0d0d] border-t-2 border-[#e2e2e2] dark:border-[#2a2a2a] z-50">
		<div class="flex justify-around items-center py-3 px-4">
			<button
				v-for="item in navItems"
				:key="item.label"
				class="flex flex-col items-center gap-1 min-w-[60px]"
				:class="item.active ? 'text-black dark:text-white' : 'text-black dark:text-white opacity-60'"
				@click="$emit('navigate', item.route)"
			>
				<UIcon :name="item.icon" class="size-9" />
				<span class="text-sm font-medium tracking-wide">{{ item.label }}</span>
			</button>
		</div>
	</nav>
</template>

<script setup lang="ts">
interface NavItem {
	label: string
	icon: string
	route: string
	active?: boolean
}

defineProps<{
	navItems: NavItem[]
}>();

defineEmits<{
	navigate: [route: string]
}>();
</script>
