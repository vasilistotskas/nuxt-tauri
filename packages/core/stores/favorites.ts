export const useFavoritesStore = defineStore('favorites', () => {
  const productIds = ref<(string | number)[]>([])

  const count = computed(() => productIds.value.length)

  function toggle(productId: string | number) {
    const index = productIds.value.findIndex(id => String(id) === String(productId))
    if (index !== -1) {
      productIds.value.splice(index, 1)
    }
    else {
      productIds.value.push(productId)
    }
  }

  function isFavorite(productId: string | number) {
    return productIds.value.some(id => String(id) === String(productId))
  }

  function add(productId: string | number) {
    if (!isFavorite(productId)) {
      productIds.value.push(productId)
    }
  }

  function remove(productId: string | number) {
    const index = productIds.value.findIndex(id => String(id) === String(productId))
    if (index !== -1) {
      productIds.value.splice(index, 1)
    }
  }

  function clear() {
    productIds.value = []
  }

  return {
    productIds,
    count,
    toggle,
    isFavorite,
    add,
    remove,
    clear,
  }
})
