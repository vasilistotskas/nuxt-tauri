import { describe, expect, test } from 'bun:test'
import { mockCategories } from '../data/mock/categories'
import { mockProducts } from '../data/mock/products'
import {
  ApiCategoryListResponseSchema,
  ApiCategorySchema,
  ApiProductListResponseSchema,
  ApiProductSchema,
} from '../types/api'

describe('ApiProductSchema', () => {
  test('validates a minimal product', () => {
    const result = ApiProductSchema.safeParse({
      id: 1,
      brand: 'Test',
      name: 'Product',
      price: 9.99,
    })
    expect(result.success).toBe(true)
  })

  test('validates a full product with all optional fields', () => {
    const result = ApiProductSchema.safeParse({
      id: 'abc',
      brand: 'Brand',
      name: 'Full Product',
      description: 'A description',
      price: 24.50,
      originalPrice: 30.00,
      saveAmount: 5.50,
      image: 'https://example.com/img.jpg',
      images: ['https://example.com/1.jpg', 'https://example.com/2.jpg'],
      rating: 4.5,
      reviews: 100,
      category: 'skincare',
      meta: { caresPoints: 200 },
      badges: [{ label: 'SALE', color: 'warning' }],
    })
    expect(result.success).toBe(true)
  })

  test('rejects product missing required fields', () => {
    const result = ApiProductSchema.safeParse({ id: 1 })
    expect(result.success).toBe(false)
  })

  test('rejects product with invalid badge color', () => {
    const result = ApiProductSchema.safeParse({
      id: 1,
      brand: 'Test',
      name: 'Product',
      price: 9.99,
      badges: [{ label: 'SALE', color: 'invalid-color' }],
    })
    expect(result.success).toBe(false)
  })

  test('accepts string id', () => {
    const result = ApiProductSchema.safeParse({
      id: 'string-id',
      brand: 'Test',
      name: 'Product',
      price: 9.99,
    })
    expect(result.success).toBe(true)
  })

  test('accepts number id', () => {
    const result = ApiProductSchema.safeParse({
      id: 42,
      brand: 'Test',
      name: 'Product',
      price: 9.99,
    })
    expect(result.success).toBe(true)
  })

  test('validates all badge colors', () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    for (const color of colors) {
      const result = ApiProductSchema.safeParse({
        id: 1,
        brand: 'Test',
        name: 'Product',
        price: 9.99,
        badges: [{ label: 'Test', color }],
      })
      expect(result.success).toBe(true)
    }
  })
})

describe('ApiCategorySchema', () => {
  test('validates a minimal category', () => {
    const result = ApiCategorySchema.safeParse({
      id: 1,
      name: 'Skincare',
      slug: 'skincare',
    })
    expect(result.success).toBe(true)
  })

  test('validates a full category', () => {
    const result = ApiCategorySchema.safeParse({
      id: 'cat-1',
      name: 'Skincare',
      icon: 'lucide:sparkles',
      slug: 'skincare',
      productCount: 42,
    })
    expect(result.success).toBe(true)
  })

  test('rejects category missing slug', () => {
    const result = ApiCategorySchema.safeParse({
      id: 1,
      name: 'Skincare',
    })
    expect(result.success).toBe(false)
  })
})

describe('ApiProductListResponseSchema', () => {
  test('validates a product list response', () => {
    const result = ApiProductListResponseSchema.safeParse({
      products: [{ id: 1, brand: 'Test', name: 'Product', price: 9.99 }],
      total: 1,
    })
    expect(result.success).toBe(true)
  })

  test('validates empty product list', () => {
    const result = ApiProductListResponseSchema.safeParse({
      products: [],
      total: 0,
    })
    expect(result.success).toBe(true)
  })
})

describe('ApiCategoryListResponseSchema', () => {
  test('validates a category list response', () => {
    const result = ApiCategoryListResponseSchema.safeParse({
      categories: [{ id: 1, name: 'Skincare', slug: 'skincare' }],
    })
    expect(result.success).toBe(true)
  })
})

describe('mock data validation', () => {
  test('all mock products pass schema validation', () => {
    for (const product of mockProducts) {
      const result = ApiProductSchema.safeParse(product)
      expect(result.success).toBe(true)
    }
  })

  test('all mock categories pass schema validation', () => {
    for (const category of mockCategories) {
      const result = ApiCategorySchema.safeParse(category)
      expect(result.success).toBe(true)
    }
  })

  test('mock products wrapped in list response pass validation', () => {
    const result = ApiProductListResponseSchema.safeParse({
      products: mockProducts,
      total: mockProducts.length,
    })
    expect(result.success).toBe(true)
  })

  test('mock categories wrapped in list response pass validation', () => {
    const result = ApiCategoryListResponseSchema.safeParse({
      categories: mockCategories,
    })
    expect(result.success).toBe(true)
  })

  test('mock products have unique ids', () => {
    const ids = mockProducts.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('mock categories have unique slugs', () => {
    const slugs = mockCategories.map(c => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  test('mock products have positive prices', () => {
    for (const product of mockProducts) {
      expect(product.price).toBeGreaterThan(0)
    }
  })
})
