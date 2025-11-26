// WeCare shared types
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

export interface NavItem {
  label: string
  icon: string
  route: string
  active?: boolean
}

export interface Banner {
  image?: string
  title?: string
  link?: string
}

export interface TrendingItem {
  image?: string
  title?: string
  videoUrl?: string
}

export interface MenuItem {
  label: string
  route: string
}
