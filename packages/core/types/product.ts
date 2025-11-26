import type { BadgeProps } from '#ui/types'

export interface ProductBadge {
  label: string
  color: NonNullable<BadgeProps['color']>
}

export interface Product {
  id: string | number
  brand: string
  name: string
  price: number
  originalPrice?: number
  saveAmount?: number
  image?: string
  rating?: number
  reviews?: number
  caresPoints?: number
  badges?: ProductBadge[]
}
