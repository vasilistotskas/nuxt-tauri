<template>
	<UHeader
		:menu="{
			title: 'Navigation',
			ui: {
				header: 'pt-6 sm:pt-0',
				container: 'pt-6 sm:pt-4'
			}
		}"
	>
		<template #title>
			<NuxtLink to="/" class="group/logo">
				<SvgoLogo :font-controlled="false" class="opacity-70 group-hover/logo:opacity-100 transition-opacity size-6" />
			</NuxtLink>
		</template>
		<UNavigationMenu
			:items="pages"
			variant="link"
			class="hidden lg:flex"
			:ui="{
				viewportWrapper: 'w-2xl absolute-center-h',
				list: 'gap-x-3'
			}"
		/>
		<template #body>
			<UNavigationMenu
				:items="pages"
				orientation="vertical"
				variant="link"
				class="-mx-2.5"
			/>
		</template>
		<template #right>
			<UBadge variant="subtle" class="hidden sm:flex">
				Tauri v{{ tauriVersion }}
			</UBadge>
		</template>
	</UHeader>
</template>

<script lang="ts" setup>
	const { pages } = usePages();
	const tauriVersion = ref("");

	onMounted(async () => {
		if (useTauriAvailable()) {
			tauriVersion.value = await useTauriAppGetTauriVersion();
		}
	});
</script>
