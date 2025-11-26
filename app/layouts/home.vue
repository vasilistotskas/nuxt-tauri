<template>
  <div>
    <SiteNavbar
      class="
        fixed top-[24px] z-50 w-full
        sm:top-0
      "
    />

    <div
      class="
        relative overflow-hidden px-6 pt-16
        lg:px-8
      "
    >
      <DesignTopBlob />
      <DesignBottomBlob />

      <slot />
    </div>
  </div>
</template>
