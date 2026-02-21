<script setup lang="ts">
const { navItems } = useNavigation()
</script>

<template>
  <!-- Mobile: Bottom navigation -->
  <nav
    class="
      safe-area-bottom fixed inset-x-0 bottom-0 z-50 border-t border-muted
      bg-default
      md:hidden
    "
  >
    <div class="flex items-center justify-around p-2">
      <UButton
        v-for="item in navItems"
        :key="item.route"
        :to="item.resolvedRoute"
        variant="ghost"
        color="neutral"
        class="flex h-auto min-w-15 flex-col items-center gap-0.5 py-1.5"
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
      fixed inset-x-0 top-0 z-50 hidden border-b border-muted bg-default/95
      backdrop-blur-sm
      md:block
    "
  >
    <div
      class="
        mx-auto flex max-w-3xl items-center justify-between px-6 py-3
        md:justify-center
        lg:max-w-5xl lg:px-8
        xl:max-w-7xl
        2xl:max-w-350
      "
    >
      <div
        class="
          flex items-center gap-6
          lg:gap-10
        "
      >
        <UButton
          v-for="item in navItems"
          :key="item.route"
          :to="item.resolvedRoute"
          variant="ghost"
          color="neutral"
          class="flex items-center gap-2 transition-opacity"
          :class="item.active ? 'opacity-100' : `
            opacity-60
            hover:opacity-100
          `"
        >
          <UIcon
            :name="item.icon" class="
              size-5 text-default
              lg:size-6
            "
          />
          <span
            class="
              text-sm font-medium text-default
              lg:text-base
            "
          >{{ item.label }}</span>
        </UButton>
      </div>
    </div>
  </nav>
</template>
