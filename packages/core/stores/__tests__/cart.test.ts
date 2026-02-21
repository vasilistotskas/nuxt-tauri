import { beforeEach, describe, expect, test } from 'bun:test'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../cart'

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    brand: 'TestBrand',
    name: 'Test Product',
    price: 10,
    ...overrides,
  }
}

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('starts with empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toEqual([])
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
    expect(cart.totalSavings).toBe(0)
  })

  test('addItem adds a new product', () => {
    const cart = useCartStore()
    const product = makeProduct()
    cart.addItem(product)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.product.id).toBe(1)
    expect(cart.items[0]!.quantity).toBe(1)
  })

  test('addItem increments quantity for existing product', () => {
    const cart = useCartStore()
    const product = makeProduct()
    cart.addItem(product)
    cart.addItem(product)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.quantity).toBe(2)
  })

  test('addItem respects custom quantity', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct(), 5)
    expect(cart.items[0]!.quantity).toBe(5)
  })

  test('addItem adds custom quantity to existing item', () => {
    const cart = useCartStore()
    const product = makeProduct()
    cart.addItem(product, 2)
    cart.addItem(product, 3)
    expect(cart.items[0]!.quantity).toBe(5)
  })

  test('removeItem removes product by id', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }))
    cart.addItem(makeProduct({ id: 2, name: 'Other' }))
    cart.removeItem(1)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.product.id).toBe(2)
  })

  test('removeItem does nothing for non-existent id', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    cart.removeItem(999)
    expect(cart.items).toHaveLength(1)
  })

  test('updateQuantity changes item quantity', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }))
    cart.updateQuantity(1, 10)
    expect(cart.items[0]!.quantity).toBe(10)
  })

  test('updateQuantity removes item when quantity <= 0', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }))
    cart.updateQuantity(1, 0)
    expect(cart.items).toHaveLength(0)
  })

  test('updateQuantity removes item for negative quantity', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }))
    cart.updateQuantity(1, -1)
    expect(cart.items).toHaveLength(0)
  })

  test('updateQuantity does nothing for non-existent id', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    cart.updateQuantity(999, 5)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]!.quantity).toBe(1)
  })

  test('clear empties the cart', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }))
    cart.addItem(makeProduct({ id: 2, name: 'Other' }))
    cart.clear()
    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
  })

  test('isInCart returns true for items in cart', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }))
    expect(cart.isInCart(1)).toBe(true)
  })

  test('isInCart returns false for items not in cart', () => {
    const cart = useCartStore()
    expect(cart.isInCart(1)).toBe(false)
  })

  test('totalItems sums all quantities', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }), 3)
    cart.addItem(makeProduct({ id: 2, name: 'Other' }), 2)
    expect(cart.totalItems).toBe(5)
  })

  test('totalPrice computes price * quantity', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1, price: 10 }), 2)
    cart.addItem(makeProduct({ id: 2, name: 'Other', price: 5.50 }), 1)
    expect(cart.totalPrice).toBeCloseTo(25.50)
  })

  test('totalSavings computes saveAmount * quantity', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1, saveAmount: 3 }), 2)
    cart.addItem(makeProduct({ id: 2, name: 'Other' }), 1)
    expect(cart.totalSavings).toBeCloseTo(6)
  })

  test('totalSavings is 0 when no items have saveAmount', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 1 }), 3)
    expect(cart.totalSavings).toBe(0)
  })
})
