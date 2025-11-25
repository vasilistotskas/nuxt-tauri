<template>
	<header class="px-4 pt-7 mb-6 relative">
		<div class="flex items-center ">
			<!-- Logo -->
				<img
					src="/images/wecare-logo.png"
					alt="WeCare Online Pharmacy"
					class="h-full w-full object-contain object-left"
				>

			<!-- Theme toggle -->
			<ClientOnly>
				<UButton
					:icon="isDark ? 'lucide:moon' : 'lucide:sun'"
          class="absolute top-0 right-0"
					color="neutral"
					variant="ghost"
					size="lg"
					@click="isDark = !isDark"
				/>
				<template #fallback>
					<div class="size-10" />
				</template>
			</ClientOnly>
		</div>
	</header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set(_isDark) {
		colorMode.preference = _isDark ? "dark" : "light";
	}
});
</script>
