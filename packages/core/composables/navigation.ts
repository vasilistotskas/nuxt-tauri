/**
 * Pure function to build nav items with active state, translated labels,
 * and locale-aware routes.
 * Extracted for testability outside Nuxt context.
 */
export function buildNavItems(
  items: NavItem[],
  currentPath: string,
  t: (key: string) => string,
  localePath: (route: string) => string,
): (NavItem & { label: string, resolvedRoute: string, active: boolean })[] {
  return items.map((item) => {
    const resolvedRoute = localePath(item.route)
    return {
      ...item,
      label: t(item.labelKey),
      resolvedRoute,
      active: currentPath === resolvedRoute,
    }
  })
}

export function useNavigation(items?: NavItem[]) {
  const route = useRoute()
  const appConfig = useAppConfig()
  const { $i18n } = useNuxtApp()
  const localePath = useLocalePath()

  const navItems = computed(() => {
    const source = items || (appConfig.nav as { items?: NavItem[] })?.items || []
    return buildNavItems(
      source,
      route.path,
      $i18n.t,
      path => localePath({ path }),
    )
  })

  return { navItems }
}
