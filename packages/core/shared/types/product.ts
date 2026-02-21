export type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

export interface ProductBadge {
  label: string
  color: BadgeColor
}

export interface Product<TMeta extends Record<string, unknown> = Record<string, unknown>> {
  id: string | number
  brand: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  saveAmount?: number
  image?: string
  images?: string[]
  rating?: number
  reviews?: number
  category?: string
  meta?: TMeta
  badges?: ProductBadge[]
}

export interface Category {
  id: string | number
  name: string
  icon?: string
  slug: string
  productCount?: number
}
