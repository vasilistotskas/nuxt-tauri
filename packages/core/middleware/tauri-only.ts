export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server || !window.__TAURI_INTERNALS__)
    return navigateTo('/', { replace: true })
})
