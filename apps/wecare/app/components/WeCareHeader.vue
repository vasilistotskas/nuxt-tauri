<template>
  <header class="relative px-4 pt-6 pb-4 md:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <img
        src="/images/wecare-logo.png"
        alt="WeCare Online Pharmacy"
        class="w-auto md:rounded max-w-[360px] object-contain"
      >

      <!-- Desktop: Additional header actions -->
      <div class="hidden md:flex items-center gap-4">
        <UButton
          icon="lucide:heart"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Wishlist"
        />
        <UButton
          icon="lucide:user"
          color="neutral"
          variant="ghost"
          size="lg"
          aria-label="Account"
        />
        <UColorModeButton>
          <template #fallback>
            <UButton loading variant="ghost" color="neutral" />
          </template>
        </UColorModeButton>
      </div>

      <!-- Mobile: Theme toggle only -->
      <UColorModeButton class="md:hidden">
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
    </div>
  </header>
</template>
