import { z } from 'zod'

export const ApiProductSchema = z.object({
  id: z.union([z.string(), z.number()]),
  brand: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  originalPrice: z.number().optional(),
  saveAmount: z.number().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  category: z.string().optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  badges: z.array(z.object({
    label: z.string(),
    color: z.enum(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']),
  })).optional(),
})

export const ApiCategorySchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  icon: z.string().optional(),
  slug: z.string(),
  productCount: z.number().optional(),
})

export const ApiProductListResponseSchema = z.object({
  products: z.array(ApiProductSchema),
  total: z.number(),
})

export const ApiCategoryListResponseSchema = z.object({
  categories: z.array(ApiCategorySchema),
})

export type ApiProductListResponse = z.infer<typeof ApiProductListResponseSchema>
export type ApiCategoryListResponse = z.infer<typeof ApiCategoryListResponseSchema>
