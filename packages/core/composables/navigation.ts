export function useNavigation(items?: NavItem[]) {
  const route = useRoute()
  const appConfig = useAppConfig()

  const resolvedItems = computed(() => {
    const source = items || (appConfig.nav as { items?: NavItem[] })?.items || []
    return source.map(item => ({
      ...item,
      active: route.path === item.route,
    }))
  })

  return {
    navItems: resolvedItems,
  }
}
