<template>
  <nav
    class="
      safe-area-bottom fixed right-0 bottom-0 left-0 z-50 border-t
      border-[#e2e2e2] bg-white
      dark:border-[#2a2a2a] dark:bg-[#0d0d0d]
    "
  >
    <div class="flex items-center justify-around px-2 py-2">
      <UButton
        v-for="item in navItems"
        :key="item.label"
        variant="ghost"
        color="neutral"
        class="flex h-auto min-w-[60px] flex-col items-center gap-0.5 py-1.5"
        :class="item.active ? 'opacity-100' : 'opacity-50'"
        :ui="{
          base: 'flex-col gap-0.5 px-2',
          leadingIcon: 'size-6',
        }"
        @click="$emit('navigate', item.route)"
      >
        <UIcon
          :name="item.icon" class="
            size-6 text-black
            dark:text-white
          "
        />
        <span
          class="
            text-xs font-normal text-black
            dark:text-white
          "
        >{{ item.label }}</span>
      </UButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavItem {
  label: string
  icon: string
  route: string
  active?: boolean
}

defineProps<{
  navItems: NavItem[]
}>()

defineEmits<{
  navigate: [route: string]
}>()
</script>
