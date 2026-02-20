/**
 * Check if running inside Tauri environment
 */
export function useTauriAvailable() {
  if (import.meta.server)
    return false
  return !!window.__TAURI_INTERNALS__
}
