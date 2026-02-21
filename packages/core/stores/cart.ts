export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  const totalSavings = computed(() =>
    items.value.reduce((sum, item) => {
      if (item.product.saveAmount) {
        return sum + item.product.saveAmount * item.quantity
      }
      return sum
    }, 0),
  )

  function addItem(product: Product, quantity = 1) {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    }
    else {
      items.value.push({ product, quantity })
    }
  }

  function removeItem(productId: string | number) {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: string | number, quantity: number) {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      }
      else {
        item.quantity = quantity
      }
    }
  }

  function clear() {
    items.value = []
  }

  function isInCart(productId: string | number) {
    return items.value.some(item => item.product.id === productId)
  }

  return {
    items,
    totalItems,
    totalPrice,
    totalSavings,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    isInCart,
  }
})
