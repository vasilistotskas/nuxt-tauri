import { describe, expect, test } from 'bun:test'
import {
  deriveLibName,
  generateAppConfig,
  generateCargoToml,
  generateNuxtConfig,
  generatePackageJson,
  generateTauriConf,
} from '../new-brand'

describe('deriveLibName', () => {
  test('converts kebab-case to snake_case with _lib suffix', () => {
    expect(deriveLibName('my-brand')).toBe('my_brand_lib')
  })

  test('handles simple name without hyphens', () => {
    expect(deriveLibName('simple')).toBe('simple_lib')
  })

  test('handles multiple hyphens', () => {
    expect(deriveLibName('my-cool-brand')).toBe('my_cool_brand_lib')
  })
})

describe('generateCargoToml', () => {
  test('contains correct package name', () => {
    const result = generateCargoToml('pharmaplus', 'pharmaplus_lib')
    expect(result).toContain('name = "pharmaplus-app"')
  })

  test('contains correct lib name', () => {
    const result = generateCargoToml('pharmaplus', 'pharmaplus_lib')
    expect(result).toContain('name = "pharmaplus_lib"')
  })

  test('has tauri-core dependency with correct path', () => {
    const result = generateCargoToml('pharmaplus', 'pharmaplus_lib')
    expect(result).toContain('tauri-core = { path = "../../../packages/tauri-core" }')
  })

  test('includes all required plugin crates', () => {
    const result = generateCargoToml('pharmaplus', 'pharmaplus_lib')
    expect(result).toContain('tauri-plugin-shell')
    expect(result).toContain('tauri-plugin-notification')
    expect(result).toContain('tauri-plugin-os')
    expect(result).toContain('tauri-plugin-fs')
    expect(result).toContain('tauri-plugin-store')
    expect(result).toContain('tauri-plugin-mcp-bridge')
  })
})

describe('generateTauriConf', () => {
  const conf = generateTauriConf('PharmaPlus', 'com.pharmaplus.app') as Record<string, any>

  test('sets correct productName', () => {
    expect(conf.productName).toBe('PharmaPlus')
  })

  test('sets correct identifier', () => {
    expect(conf.identifier).toBe('com.pharmaplus.app')
  })

  test('has main and splashscreen windows', () => {
    const windows = conf.app.windows
    expect(windows).toHaveLength(2)
    expect(windows[0].label).toBe('main')
    expect(windows[1].label).toBe('splashscreen')
  })

  test('main window starts hidden', () => {
    expect(conf.app.windows[0].visible).toBe(false)
  })

  test('bundle shortDescription includes product name', () => {
    expect(conf.bundle.shortDescription).toBe('PharmaPlus App')
  })

  test('sets version to 1.0.0', () => {
    expect(conf.version).toBe('1.0.0')
  })
})

describe('generatePackageJson', () => {
  const pkg = generatePackageJson('pharmaplus') as Record<string, any>

  test('sets correct package name with @apps/ prefix', () => {
    expect(pkg.name).toBe('@apps/pharmaplus')
  })

  test('is private', () => {
    expect(pkg.private).toBe(true)
  })

  test('has @packages/core dependency', () => {
    expect(pkg.dependencies['@packages/core']).toBe('workspace:*')
  })

  test('has tauri CLI in devDependencies', () => {
    expect(pkg.devDependencies['@tauri-apps/cli']).toBeDefined()
  })

  test('has all expected scripts', () => {
    expect(pkg.scripts.dev).toBe('nuxt dev')
    expect(pkg.scripts.build).toBe('nuxt build')
    expect(pkg.scripts['tauri:dev']).toBe('tauri dev')
    expect(pkg.scripts['tauri:android:build']).toBe('tauri android build')
  })

  test('has web deployment scripts', () => {
    expect(pkg.scripts['web:dev']).toBe('NUXT_TARGET=web nuxt dev')
    expect(pkg.scripts['web:build']).toBe('NUXT_TARGET=web nuxt build')
    expect(pkg.scripts['web:preview']).toBe('NUXT_TARGET=web nuxt preview')
  })
})

describe('generateNuxtConfig', () => {
  const config = generateNuxtConfig('PharmaPlus')

  test('includes product name in title', () => {
    expect(config).toContain('title: \'PharmaPlus\'')
  })

  test('extends @packages/core', () => {
    expect(config).toContain('extends: [\'@packages/core\']')
  })

  test('includes core and brand CSS paths', () => {
    expect(config).toContain('@packages/core/assets/css/main.css')
    expect(config).toContain('./app/assets/css/brand.css')
  })

  test('uses isTauri conditional for SSR', () => {
    expect(config).toContain('process.env.NUXT_TARGET !== \'web\'')
    expect(config).toContain('ssr: !isTauri')
  })
})

describe('generateAppConfig', () => {
  const config = generateAppConfig('pharmaplus', 'PharmaPlus')

  test('includes brand name', () => {
    expect(config).toContain('name: \'PharmaPlus\'')
  })

  test('includes brand logo path', () => {
    expect(config).toContain('/images/pharmaplus-logo.png')
  })

  test('includes default nav items', () => {
    expect(config).toContain('label: \'Home\'')
    expect(config).toContain('label: \'Shop\'')
    expect(config).toContain('label: \'Cart\'')
    expect(config).toContain('label: \'Favorites\'')
    expect(config).toContain('label: \'Account\'')
  })

  test('includes default color config', () => {
    expect(config).toContain('primary: \'cyan\'')
  })
})
