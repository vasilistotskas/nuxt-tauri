<template>
	<header class="px-4 pt-6 pb-4 relative">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<img
				src="/images/wecare-logo.png"
				alt="WeCare Online Pharmacy"
				class="w-auto object-contain"
			>

			<!-- Theme toggle -->
			<UColorModeButton class="absolute top-0 right-0 z-10">
				<template #fallback>
					<UButton loading variant="ghost" color="neutral" />
				</template>
			</UColorModeButton>
		</div>
	</header>
</template>
