<template>
	<div>
		<button
			class="w-full flex items-center justify-between py-4 text-left"
			@click="$emit('click')"
		>
			<span class="text-lg text-black dark:text-white tracking-wide">
				{{ label }}
			</span>
			<UIcon
				name="lucide:chevron-right"
				class="size-6 text-black dark:text-white"
			/>
		</button>
		<USeparator />
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		label: string
	}>();

	defineEmits<{
		click: []
	}>();
</script>
