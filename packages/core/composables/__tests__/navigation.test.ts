import { describe, expect, test } from 'bun:test'
import { resolveNavItems } from '../navigation'

interface NavItem {
  label: string
  icon: string
  route: string
  active?: boolean
}

const sampleItems: NavItem[] = [
  { label: 'Home', icon: 'lucide:house', route: '/' },
  { label: 'Shop', icon: 'lucide:search', route: '/shop' },
  { label: 'Cart', icon: 'lucide:shopping-cart', route: '/cart' },
]

describe('resolveNavItems', () => {
  test('marks matching item as active', () => {
    const result = resolveNavItems(sampleItems, '/shop')
    expect(result[1]!.active).toBe(true)
  })

  test('marks non-matching items as inactive', () => {
    const result = resolveNavItems(sampleItems, '/shop')
    expect(result[0]!.active).toBe(false)
    expect(result[2]!.active).toBe(false)
  })

  test('handles root path', () => {
    const result = resolveNavItems(sampleItems, '/')
    expect(result[0]!.active).toBe(true)
    expect(result[1]!.active).toBe(false)
    expect(result[2]!.active).toBe(false)
  })

  test('handles empty items array', () => {
    const result = resolveNavItems([], '/shop')
    expect(result).toEqual([])
  })

  test('all items inactive when path matches none', () => {
    const result = resolveNavItems(sampleItems, '/unknown')
    expect(result.every(item => item.active === false)).toBe(true)
  })

  test('uses exact path matching, not prefix', () => {
    const result = resolveNavItems(sampleItems, '/shop/item/1')
    expect(result[1]!.active).toBe(false)
  })

  test('preserves original item properties', () => {
    const result = resolveNavItems(sampleItems, '/shop')
    expect(result[1]!.label).toBe('Shop')
    expect(result[1]!.icon).toBe('lucide:search')
    expect(result[1]!.route).toBe('/shop')
  })
})
