import type { NavItem } from '../types/navigation'

export function useNavigation() {
  const route = useRoute()

  const navItems: NavItem[] = [
    { label: 'Home', icon: 'lucide:house', route: '/' },
    { label: 'Shop', icon: 'lucide:search', route: '/shop' },
    { label: 'Cart', icon: 'lucide:shopping-cart', route: '/cart' },
    { label: 'Favorites', icon: 'lucide:heart', route: '/favorites' },
    { label: 'Account', icon: 'lucide:user', route: '/account' },
  ]

  const navItemsWithActive = computed(() =>
    navItems.map(item => ({
      ...item,
      active: route.path === item.route,
    })),
  )

  return {
    navItems: navItemsWithActive,
  }
}
