import { describe, expect, test } from 'bun:test'
import { buildNavItems } from '../navigation'

interface NavItem {
  labelKey: string
  icon: string
  route: string
}

const mockT = (key: string) => key
const mockLocalePath = (route: string) => route

const sampleItems: NavItem[] = [
  { labelKey: 'nav.home', icon: 'lucide:house', route: '/' },
  { labelKey: 'nav.shop', icon: 'lucide:search', route: '/shop' },
  { labelKey: 'nav.cart', icon: 'lucide:shopping-cart', route: '/cart' },
]

describe('buildNavItems', () => {
  test('marks matching item as active', () => {
    const result = buildNavItems(sampleItems, '/shop', mockT, mockLocalePath)
    expect(result[1]!.active).toBe(true)
  })

  test('marks non-matching items as inactive', () => {
    const result = buildNavItems(sampleItems, '/shop', mockT, mockLocalePath)
    expect(result[0]!.active).toBe(false)
    expect(result[2]!.active).toBe(false)
  })

  test('handles root path', () => {
    const result = buildNavItems(sampleItems, '/', mockT, mockLocalePath)
    expect(result[0]!.active).toBe(true)
    expect(result[1]!.active).toBe(false)
    expect(result[2]!.active).toBe(false)
  })

  test('handles empty items array', () => {
    const result = buildNavItems([], '/shop', mockT, mockLocalePath)
    expect(result).toEqual([])
  })

  test('all items inactive when path matches none', () => {
    const result = buildNavItems(sampleItems, '/unknown', mockT, mockLocalePath)
    expect(result.every(item => item.active === false)).toBe(true)
  })

  test('uses exact path matching, not prefix', () => {
    const result = buildNavItems(sampleItems, '/shop/item/1', mockT, mockLocalePath)
    expect(result[1]!.active).toBe(false)
  })

  test('resolves labels via t function', () => {
    const result = buildNavItems(sampleItems, '/shop', mockT, mockLocalePath)
    expect(result[1]!.label).toBe('nav.shop')
    expect(result[1]!.labelKey).toBe('nav.shop')
    expect(result[1]!.icon).toBe('lucide:search')
    expect(result[1]!.route).toBe('/shop')
  })

  test('translates labels using provided t function', () => {
    const translations: Record<string, string> = {
      'nav.home': 'Home',
      'nav.shop': 'Shop',
      'nav.cart': 'Cart',
    }
    const t = (key: string) => translations[key] || key
    const result = buildNavItems(sampleItems, '/', t, mockLocalePath)
    expect(result[0]!.label).toBe('Home')
    expect(result[1]!.label).toBe('Shop')
    expect(result[2]!.label).toBe('Cart')
  })

  test('resolves routes via localePath function', () => {
    const localePath = (route: string) => `/el${route === '/' ? '' : route}`
    const result = buildNavItems(sampleItems, '/el/shop', mockT, localePath)
    expect(result[0]!.resolvedRoute).toBe('/el')
    expect(result[1]!.resolvedRoute).toBe('/el/shop')
    expect(result[1]!.active).toBe(true)
    expect(result[0]!.active).toBe(false)
  })
})
