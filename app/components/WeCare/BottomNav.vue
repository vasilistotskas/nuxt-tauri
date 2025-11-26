<template>
	<nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0d0d0d] border-t border-[#e2e2e2] dark:border-[#2a2a2a] z-50 safe-area-bottom">
		<div class="flex justify-around items-center py-2 px-2">
			<UButton
				v-for="item in navItems"
				:key="item.label"
				variant="ghost"
				color="neutral"
				class="flex flex-col items-center gap-0.5 min-w-[60px] py-1.5 h-auto"
				:class="item.active ? 'opacity-100' : 'opacity-50'"
				:ui="{
					base: 'flex-col gap-0.5 px-2',
					leadingIcon: 'size-6'
				}"
				@click="$emit('navigate', item.route)"
			>
				<UIcon :name="item.icon" class="size-6 text-black dark:text-white" />
				<span class="text-xs font-normal text-black dark:text-white">{{ item.label }}</span>
			</UButton>
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
