import { afterEach, describe, expect, test } from 'bun:test'

describe('useTauriAvailable', () => {
  const originalTauri = globalThis.window?.__TAURI_INTERNALS__

  afterEach(() => {
    if (originalTauri !== undefined) {
      (globalThis as { window: Window }).window.__TAURI_INTERNALS__ = originalTauri
    }
    else {
      delete (globalThis as { window: Window }).window.__TAURI_INTERNALS__
    }
  })

  test('returns true when __TAURI_INTERNALS__ is present', () => {
    ;(globalThis as { window: Window }).window = globalThis.window || {} as Window
    ;(globalThis as { window: Window }).window.__TAURI_INTERNALS__ = { appName: 'test' }

    const result = !!globalThis.window.__TAURI_INTERNALS__
    expect(result).toBe(true)
  })

  test('returns false when __TAURI_INTERNALS__ is undefined', () => {
    ;(globalThis as { window: Window }).window = globalThis.window || {} as Window
    delete (globalThis as { window: Window }).window.__TAURI_INTERNALS__

    const result = !!globalThis.window.__TAURI_INTERNALS__
    expect(result).toBe(false)
  })

  test('returns false when window.__TAURI_INTERNALS__ is falsy', () => {
    ;(globalThis as { window: Window }).window = globalThis.window || {} as Window
    ;(globalThis as { window: Window }).window.__TAURI_INTERNALS__ = undefined

    const result = !!globalThis.window.__TAURI_INTERNALS__
    expect(result).toBe(false)
  })
})
