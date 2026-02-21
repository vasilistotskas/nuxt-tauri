/**
 * Type declarations for Tauri plugins that are installed in brand apps, not in core.
 * These modules are only dynamically imported at runtime behind useTauriAvailable() guards.
 */

declare module '@tauri-apps/plugin-biometric' {
  export function authenticate(reason: string): Promise<void>
  export function checkStatus(): Promise<{ isAvailable: boolean }>
}

declare module '@tauri-apps/plugin-barcode-scanner' {
  export function scan(): Promise<{ content: string }>
}

declare module '@tauri-apps/plugin-geolocation' {
  export function getCurrentPosition(): Promise<{
    coords: {
      latitude: number
      longitude: number
      accuracy: number
    }
  }>
  export function requestPermissions(): Promise<{
    location: 'granted' | 'denied' | 'prompt'
  }>
}
