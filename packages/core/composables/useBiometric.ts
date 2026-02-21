/**
 * Composable for biometric authentication (fingerprint / Face ID).
 * Only functional in Tauri environment.
 */
export function useBiometric() {
  const isTauri = useTauriAvailable()

  async function authenticate(reason: string): Promise<boolean> {
    if (!isTauri)
      return false

    try {
      const { authenticate: bioAuth } = await import('@tauri-apps/plugin-biometric')
      await bioAuth(reason)
      return true
    }
    catch (e) {
      console.error('Biometric authentication failed:', e)
      return false
    }
  }

  async function checkAvailability(): Promise<boolean> {
    if (!isTauri)
      return false

    try {
      const { checkStatus } = await import('@tauri-apps/plugin-biometric')
      const status = await checkStatus()
      return status.isAvailable
    }
    catch {
      return false
    }
  }

  return {
    authenticate,
    checkAvailability,
  }
}
