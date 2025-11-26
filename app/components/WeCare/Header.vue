<template>
  <header class="relative px-4 pt-6 pb-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <img
        src="/images/wecare-logo.png"
        alt="WeCare Online Pharmacy"
        class="w-auto object-contain"
      >

      <!-- Theme toggle -->
      <UColorModeButton class="absolute top-10 -right-1.5 z-50">
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
    </div>
  </header>
</template>
