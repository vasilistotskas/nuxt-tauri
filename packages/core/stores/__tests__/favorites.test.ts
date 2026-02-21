import { beforeEach, describe, expect, test } from 'bun:test'
import { createPinia, setActivePinia } from 'pinia'
import { useFavoritesStore } from '../favorites'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('starts with empty favorites', () => {
    const store = useFavoritesStore()
    expect(store.productIds).toEqual([])
    expect(store.count).toBe(0)
  })

  test('toggle adds product when not favorite', () => {
    const store = useFavoritesStore()
    store.toggle(1)
    expect(store.productIds).toEqual([1])
    expect(store.count).toBe(1)
  })

  test('toggle removes product when already favorite', () => {
    const store = useFavoritesStore()
    store.toggle(1)
    store.toggle(1)
    expect(store.productIds).toEqual([])
    expect(store.count).toBe(0)
  })

  test('toggle handles string/number comparison', () => {
    const store = useFavoritesStore()
    store.toggle(1)
    store.toggle('1')
    expect(store.productIds).toEqual([])
  })

  test('isFavorite returns true for added products', () => {
    const store = useFavoritesStore()
    store.toggle(1)
    expect(store.isFavorite(1)).toBe(true)
  })

  test('isFavorite returns false for non-favorited products', () => {
    const store = useFavoritesStore()
    expect(store.isFavorite(1)).toBe(false)
  })

  test('isFavorite handles string/number comparison', () => {
    const store = useFavoritesStore()
    store.toggle(1)
    expect(store.isFavorite('1')).toBe(true)
  })

  test('add adds a product', () => {
    const store = useFavoritesStore()
    store.add(1)
    expect(store.isFavorite(1)).toBe(true)
    expect(store.count).toBe(1)
  })

  test('add does not duplicate', () => {
    const store = useFavoritesStore()
    store.add(1)
    store.add(1)
    expect(store.count).toBe(1)
  })

  test('remove removes a product', () => {
    const store = useFavoritesStore()
    store.add(1)
    store.remove(1)
    expect(store.count).toBe(0)
    expect(store.isFavorite(1)).toBe(false)
  })

  test('remove handles string/number comparison', () => {
    const store = useFavoritesStore()
    store.add(1)
    store.remove('1')
    expect(store.count).toBe(0)
  })

  test('remove does nothing for non-existent id', () => {
    const store = useFavoritesStore()
    store.add(1)
    store.remove(999)
    expect(store.count).toBe(1)
  })

  test('clear empties all favorites', () => {
    const store = useFavoritesStore()
    store.add(1)
    store.add(2)
    store.add(3)
    store.clear()
    expect(store.productIds).toEqual([])
    expect(store.count).toBe(0)
  })

  test('count reflects current state', () => {
    const store = useFavoritesStore()
    expect(store.count).toBe(0)
    store.add(1)
    expect(store.count).toBe(1)
    store.add(2)
    expect(store.count).toBe(2)
    store.remove(1)
    expect(store.count).toBe(1)
  })

  test('productIds is JSON-serializable (SSR safe)', () => {
    const store = useFavoritesStore()
    store.add(1)
    store.add('abc')
    const serialized = JSON.parse(JSON.stringify(store.productIds))
    expect(serialized).toEqual([1, 'abc'])
  })
})
