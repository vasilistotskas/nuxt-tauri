<template>
  <div
    class="
      min-h-screen bg-default pb-24
      md:pt-(--ui-header-height) md:pb-8
    "
  >
    <!-- Centered container for larger screens -->
    <div
      class="
        mx-auto max-w-md
        sm:max-w-lg
        md:max-w-3xl
        lg:max-w-5xl
        xl:max-w-7xl
        2xl:max-w-[1400px]
      "
    >
      <slot />
    </div>
    <BottomNav />
  </div>
</template>
