import { mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { getAvailableApps, parseArgs, resolveAppPath } from '../app'

describe('parseArgs', () => {
  test('returns null for empty args', () => {
    expect(parseArgs([])).toBeNull()
  })

  test('returns null for single arg', () => {
    expect(parseArgs(['wecare'])).toBeNull()
  })

  test('parses valid args correctly', () => {
    const result = parseArgs(['wecare', 'dev'])
    expect(result).toEqual({ appName: 'wecare', command: 'dev' })
  })

  test('parses tauri command correctly', () => {
    const result = parseArgs(['wecare', 'tauri:android:build'])
    expect(result).toEqual({ appName: 'wecare', command: 'tauri:android:build' })
  })

  test('ignores extra args beyond the first two', () => {
    const result = parseArgs(['wecare', 'dev', 'extra'])
    expect(result).toEqual({ appName: 'wecare', command: 'dev' })
  })
})

describe('resolveAppPath', () => {
  test('joins cwd with apps directory and app name', () => {
    const result = resolveAppPath('/project', 'wecare')
    expect(result).toBe(join('/project', 'apps', 'wecare'))
  })

  test('works with different cwd values', () => {
    const result = resolveAppPath('/other/path', 'pharmaplus')
    expect(result).toBe(join('/other/path', 'apps', 'pharmaplus'))
  })
})

describe('getAvailableApps', () => {
  let tempDir: string

  beforeEach(() => {
    tempDir = join(tmpdir(), `test-apps-${Date.now()}`)
    mkdirSync(tempDir, { recursive: true })
  })

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  test('returns empty array for non-existent directory', () => {
    expect(getAvailableApps('/non/existent/path')).toEqual([])
  })

  test('returns empty array for empty directory', () => {
    expect(getAvailableApps(tempDir)).toEqual([])
  })

  test('returns directory names', () => {
    mkdirSync(join(tempDir, 'wecare'))
    mkdirSync(join(tempDir, 'pharmaplus'))
    const apps = getAvailableApps(tempDir)
    expect(apps).toContain('wecare')
    expect(apps).toContain('pharmaplus')
    expect(apps).toHaveLength(2)
  })
})
