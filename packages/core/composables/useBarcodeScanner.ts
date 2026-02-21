/**
 * Composable for barcode/QR code scanning.
 * Only functional in Tauri environment.
 */
export function useBarcodeScanner() {
  const isTauri = useTauriAvailable()

  async function scan(): Promise<string | null> {
    if (!isTauri)
      return null

    try {
      const { scan: scanBarcode } = await import('@tauri-apps/plugin-barcode-scanner')
      const result = await scanBarcode()
      return result.content
    }
    catch (e) {
      console.error('Barcode scan failed:', e)
      return null
    }
  }

  return {
    scan,
  }
}
