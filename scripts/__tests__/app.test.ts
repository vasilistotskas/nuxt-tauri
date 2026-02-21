import { rmSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
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

  beforeEach(async () => {
    tempDir = join(tmpdir(), `test-apps-${Date.now()}`)
    await mkdir(tempDir, { recursive: true })
  })

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  test('returns empty array for non-existent directory', async () => {
    expect(await getAvailableApps('/non/existent/path')).toEqual([])
  })

  test('returns empty array for empty directory', async () => {
    expect(await getAvailableApps(tempDir)).toEqual([])
  })

  test('returns directory names that have package.json', async () => {
    await mkdir(join(tempDir, 'wecare'), { recursive: true })
    await writeFile(join(tempDir, 'wecare', 'package.json'), '{}')
    await mkdir(join(tempDir, 'pharmaplus'), { recursive: true })
    await writeFile(join(tempDir, 'pharmaplus', 'package.json'), '{}')
    const apps = await getAvailableApps(tempDir)
    expect(apps).toContain('wecare')
    expect(apps).toContain('pharmaplus')
    expect(apps).toHaveLength(2)
  })

  test('ignores directories without package.json', async () => {
    await mkdir(join(tempDir, 'valid'), { recursive: true })
    await writeFile(join(tempDir, 'valid', 'package.json'), '{}')
    await mkdir(join(tempDir, 'invalid'), { recursive: true })
    const apps = await getAvailableApps(tempDir)
    expect(apps).toEqual(['valid'])
  })
})
