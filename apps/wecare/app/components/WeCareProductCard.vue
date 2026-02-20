<script setup lang="ts">
defineProps<{
  product: Product
  showAddToCart?: boolean
}>()

defineEmits<{
  addToCart: []
}>()
</script>

<template>
  <ProductCard
    :product="product"
    :show-add-to-cart="showAddToCart"
    @add-to-cart="$emit('addToCart')"
  >
    <template #meta="{ product: p }">
      <p
        v-if="p.meta?.caresPoints"
        class="text-xs text-dimmed"
      >
        <span class="font-bold text-brand">{{ p.meta.caresPoints }}</span>
        <span class="font-medium"> Cares</span>
      </p>
    </template>
  </ProductCard>
</template>
