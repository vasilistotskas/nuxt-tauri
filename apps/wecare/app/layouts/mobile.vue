<template>
  <div
    class="
      min-h-screen bg-white pb-24 md:pb-8 md:pt-20
      dark:bg-[#0d0d0d]
    "
  >
    <!-- Centered container for larger screens -->
    <div class="mx-auto max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1400px]">
      <slot />
    </div>
    <BottomNav />
  </div>
</template>
