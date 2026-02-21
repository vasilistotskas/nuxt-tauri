/**
 * Base API client composable.
 * Reads `runtimeConfig.public.apiBase` to determine mode:
 * - Empty string (default): mock mode — no HTTP calls
 * - Real URL: live mode — fetches from external API
 */
export function useApiClient() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string

  const isMockMode = !apiBase

  async function get<T>(path: string): Promise<T> {
    return $fetch<T>(`${apiBase}${path}`) as Promise<T>
  }

  return {
    isMockMode,
    apiBase,
    get,
  }
}
