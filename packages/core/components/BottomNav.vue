<script setup lang="ts">
const { navItems } = useNavigation()
</script>

<template>
  <nav
    class="
      safe-area-bottom fixed right-0 bottom-0 left-0 z-50 border-t border-muted
      bg-default
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
</template>
