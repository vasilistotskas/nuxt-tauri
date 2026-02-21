import { afterEach, describe, expect, test } from 'bun:test'

// Inline the middleware logic for unit testing (avoids Nuxt auto-import dependencies)
function tauriOnlyGuard(): string | null {
  if (!window.__TAURI_INTERNALS__)
    return '/'
  return null
}

describe('tauri-only middleware', () => {
  const originalTauri = globalThis.window?.__TAURI_INTERNALS__

  afterEach(() => {
    if (originalTauri !== undefined) {
      (globalThis as { window: Window }).window.__TAURI_INTERNALS__ = originalTauri
    }
    else {
      delete (globalThis as { window: Window }).window.__TAURI_INTERNALS__
    }
  })

  test('redirects to / when __TAURI_INTERNALS__ is absent', () => {
    ;(globalThis as { window: Window }).window = globalThis.window || {} as Window
    delete (globalThis as { window: Window }).window.__TAURI_INTERNALS__

    const result = tauriOnlyGuard()
    expect(result).toBe('/')
  })

  test('allows navigation when __TAURI_INTERNALS__ is present', () => {
    ;(globalThis as { window: Window }).window = globalThis.window || {} as Window
    ;(globalThis as { window: Window }).window.__TAURI_INTERNALS__ = { appName: 'test' }

    const result = tauriOnlyGuard()
    expect(result).toBeNull()
  })

  test('redirects when __TAURI_INTERNALS__ is undefined', () => {
    ;(globalThis as { window: Window }).window = globalThis.window || {} as Window
    ;(globalThis as { window: Window }).window.__TAURI_INTERNALS__ = undefined

    const result = tauriOnlyGuard()
    expect(result).toBe('/')
  })
})
