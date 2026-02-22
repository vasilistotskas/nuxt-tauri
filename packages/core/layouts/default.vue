<template>
  <div
    class="
      min-h-screen bg-default pb-24
      md:pb-0
    "
  >
    <AppNavigation />

    <!-- Centered container for larger screens -->
    <div
      class="
        mx-auto max-w-lg
        sm:max-w-xl
        md:max-w-3xl md:pt-4
        lg:max-w-5xl
        xl:max-w-7xl
        2xl:max-w-350
      "
    >
      <slot />
    </div>

    <AppFooter />
  </div>
</template>
