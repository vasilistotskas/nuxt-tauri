/**
 * Composable for geolocation (nearby store locator, delivery tracking).
 * Only functional in Tauri environment.
 */
export function useTauriGeolocation() {
  const isTauri = useTauriAvailable()

  interface Position {
    latitude: number
    longitude: number
    accuracy: number
  }

  async function getCurrentPosition(): Promise<Position | null> {
    if (!isTauri)
      return null

    try {
      const { getCurrentPosition: getPos } = await import('@tauri-apps/plugin-geolocation')
      const pos = await getPos()
      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      }
    }
    catch (e) {
      console.error('Geolocation failed:', e)
      return null
    }
  }

  async function requestPermissions(): Promise<boolean> {
    if (!isTauri)
      return false

    try {
      const { requestPermissions: reqPerm } = await import('@tauri-apps/plugin-geolocation')
      const result = await reqPerm()
      return result.location === 'granted'
    }
    catch {
      return false
    }
  }

  return {
    getCurrentPosition,
    requestPermissions,
  }
}
