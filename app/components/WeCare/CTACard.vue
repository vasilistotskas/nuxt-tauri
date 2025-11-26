<template>
	<UCard
		class="mx-4"
		variant="soft"
		:ui="{
			root: 'bg-[#d7d7d7] dark:bg-[#242424] rounded-2xl overflow-hidden',
			body: 'p-4 flex items-center gap-4'
		}"
	>
		<div class="size-16 flex items-center justify-center shrink-0 relative">
			<!-- Sign-in illustration with user icon and decorative elements -->
			<div class="relative">
				<UIcon name="lucide:user-round" class="size-12 text-[#0d0d0d] dark:text-white" />
				<div class="absolute -top-1 -right-1 size-3.5 rounded-full bg-[#a56dc1]" />
				<div class="absolute -bottom-1 -left-1 size-2.5 rounded-full bg-[#1887aa]" />
			</div>
		</div>
		<div class="flex-1">
			<h3 class="font-semibold text-base text-[#0d0d0d] dark:text-white leading-tight mb-1">
				Personalize your APP
			</h3>
			<p class="text-sm text-[#0d0d0d] dark:text-white leading-snug">
				Sign in or create an account for a faster, easier experience and collect care points.
			</p>
		</div>
	</UCard>
</template>
