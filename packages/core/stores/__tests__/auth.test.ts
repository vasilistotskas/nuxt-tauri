import { beforeEach, describe, expect, test } from 'bun:test'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('starts unauthenticated', () => {
    const auth = useAuthStore()
    expect(auth.user).toBeNull()
    expect(auth.token).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
  })

  test('setAuth sets user and token', () => {
    const auth = useAuthStore()
    auth.setAuth({ id: '1', email: 'test@test.com', name: 'Test' }, 'token-123')
    expect(auth.user).toEqual({ id: '1', email: 'test@test.com', name: 'Test' })
    expect(auth.token).toBe('token-123')
  })

  test('isAuthenticated is true after setAuth', () => {
    const auth = useAuthStore()
    auth.setAuth({ id: '1', email: 'test@test.com', name: 'Test' }, 'token-123')
    expect(auth.isAuthenticated).toBe(true)
  })

  test('logout clears user and token', () => {
    const auth = useAuthStore()
    auth.setAuth({ id: '1', email: 'test@test.com', name: 'Test' }, 'token-123')
    auth.logout()
    expect(auth.user).toBeNull()
    expect(auth.token).toBeNull()
    expect(auth.isAuthenticated).toBe(false)
  })

  test('isAuthenticated is false with token but no user', () => {
    const auth = useAuthStore()
    auth.setAuth({ id: '1', email: 'test@test.com', name: 'Test' }, 'token-123')
    auth.logout()
    // Manually set only token (edge case)
    auth.token = 'some-token'
    expect(auth.isAuthenticated).toBe(false)
  })

  test('state is JSON-serializable (SSR safe)', () => {
    const auth = useAuthStore()
    auth.setAuth({ id: '1', email: 'test@test.com', name: 'Test' }, 'token-123')
    const serialized = JSON.parse(JSON.stringify({ user: auth.user, token: auth.token }))
    expect(serialized.user.email).toBe('test@test.com')
    expect(serialized.token).toBe('token-123')
  })
})
