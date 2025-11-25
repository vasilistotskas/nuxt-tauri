<template>
	<div class="flex gap-3 px-4">
		<div class="flex-1 relative">
			<div class="flex items-center h-11 bg-[#f2f2f2] dark:bg-[#242424] rounded-full px-4 gap-3">
				<UIcon name="lucide:search" class="size-5 text-muted shrink-0" />
				<input
					type="text"
					placeholder="Search products..."
					class="flex-1 bg-transparent border-none outline-none text-black dark:text-white placeholder:text-muted"
				>
			</div>
		</div>
		<button
			class="size-11 rounded-full bg-[#f2f2f2] dark:bg-[#242424] flex items-center justify-center shrink-0"
			aria-label="Search by photo"
		>
			<UIcon name="lucide:focus" class="size-6 text-black dark:text-white" />
		</button>
	</div>
</template>
