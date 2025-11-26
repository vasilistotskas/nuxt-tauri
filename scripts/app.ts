#!/usr/bin/env bun
/**
 * Dynamic app runner for the monorepo
 * Usage: bun run app <app-name> <command>
 *
 * Examples:
 *   bun run app wecare dev
 *   bun run app wecare build
 *   bun run app wecare tauri:dev
 *   bun run app wecare tauri:android:build
 */

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'

const args = process.argv.slice(2)

if (args.length < 2) {
  console.error(`
Usage: bun run app <app-name> <command>

Available commands:
  dev                    Start Nuxt dev server
  build                  Build for production
  generate               Generate static site
  preview                Preview production build
  tauri:dev              Start Tauri dev mode
  tauri:build            Build Tauri app
  tauri:build:debug      Build Tauri app (debug)
  tauri:android:init     Initialize Android project
  tauri:android:dev      Start Android development
  tauri:android:build    Build Android APK/AAB

Examples:
  bun run app wecare dev
  bun run app wecare tauri:build
  bun run app wecare tauri:android:dev
`)
  process.exit(1)
}

const [appName, command] = args
const appPath = join(process.cwd(), 'apps', appName)
const packageName = `@apps/${appName}`

// Verify app exists
if (!existsSync(appPath)) {
  console.error(`Error: App "${appName}" not found at ${appPath}`)
  console.error('\nAvailable apps:')

  const appsDir = join(process.cwd(), 'apps')
  if (existsSync(appsDir)) {
    const { readdirSync } = await import('node:fs')
    const apps = readdirSync(appsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => `  - ${d.name}`)
    console.error(apps.join('\n'))
  }
  process.exit(1)
}

// Run the command using bun's filter
console.log(`Running "${command}" for ${packageName}...`)
await $`bun --filter ${packageName} ${command}`.catch(() => process.exit(1))
