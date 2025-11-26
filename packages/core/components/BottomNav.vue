<script setup lang="ts">
const { navItems } = useNavigation()
</script>

<template>
  <!-- Mobile: Bottom navigation -->
  <nav
    class="
      safe-area-bottom fixed right-0 bottom-0 left-0 z-50 border-t border-muted
      bg-default md:hidden
    "
  >
    <div class="flex items-center justify-around px-2 py-2">
      <UButton
        v-for="item in navItems"
        :key="item.label"
        :to="item.route"
        variant="ghost"
        color="neutral"
        class="flex h-auto min-w-[60px] flex-col items-center gap-0.5 py-1.5"
        :class="item.active ? 'opacity-100' : 'opacity-50'"
        :ui="{
          base: 'flex-col gap-0.5 px-2',
          leadingIcon: 'size-6',
        }"
      >
        <UIcon :name="item.icon" class="size-6 text-default" />
        <span class="text-xs font-normal text-default">{{ item.label }}</span>
      </UButton>
    </div>
  </nav>

  <!-- Desktop: Top navigation bar (sticky) -->
  <nav
    class="
      hidden md:block fixed top-0 left-0 right-0 z-50 border-b border-muted
      bg-default/95 backdrop-blur-sm
    "
  >
    <div class="mx-auto max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1400px] flex items-center justify-between px-6 lg:px-8 py-3">
      <div class="flex items-center gap-6 lg:gap-10">
        <UButton
          v-for="item in navItems"
          :key="item.label"
          :to="item.route"
          variant="ghost"
          color="neutral"
          class="flex items-center gap-2 transition-opacity"
          :class="item.active ? 'opacity-100' : 'opacity-60 hover:opacity-100'"
        >
          <UIcon :name="item.icon" class="size-5 lg:size-6 text-default" />
          <span class="text-sm lg:text-base font-medium text-default">{{ item.label }}</span>
        </UButton>
      </div>
    </div>
  </nav>
</template>
