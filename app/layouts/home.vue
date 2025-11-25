<template>
	<div>
		<SiteNavbar class="fixed w-full top-[24px] sm:top-0 z-50" />

		<div class="relative overflow-hidden px-6 lg:px-8 pt-16">
			<DesignTopBlob />
			<DesignBottomBlob />

			<slot />
		</div>
	</div>
</template>
