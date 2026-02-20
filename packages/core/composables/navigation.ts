/**
 * Pure function to resolve nav items with active state.
 * Extracted for testability outside Nuxt context.
 */
export function resolveNavItems(items: NavItem[], currentPath: string): (NavItem & { active: boolean })[] {
  return items.map(item => ({
    ...item,
    active: currentPath === item.route,
  }))
}

export function useNavigation(items?: NavItem[]) {
  const route = useRoute()
  const appConfig = useAppConfig()

  const resolvedItems = computed(() => {
    const source = items || (appConfig.nav as { items?: NavItem[] })?.items || []
    return resolveNavItems(source, route.path)
  })

  return {
    navItems: resolvedItems,
  }
}
