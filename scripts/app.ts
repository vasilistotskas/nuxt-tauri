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

import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'

// ── Exported pure functions for testing ──────────────────

export function parseArgs(args: string[]): { appName: string, command: string } | null {
  if (args.length < 2)
    return null
  return { appName: args[0], command: args[1] }
}

export function resolveAppPath(cwd: string, appName: string): string {
  return join(cwd, 'apps', appName)
}

export function getAvailableApps(appsDir: string): string[] {
  if (!existsSync(appsDir))
    return []
  return readdirSync(appsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
}

// ── Main script execution ────────────────────────────────

if (import.meta.main) {
  const args = process.argv.slice(2)
  const parsed = parseArgs(args)

  if (!parsed) {
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

  const { appName, command } = parsed
  const appPath = resolveAppPath(process.cwd(), appName)
  const packageName = `@apps/${appName}`

  // Verify app exists
  if (!existsSync(appPath)) {
    console.error(`Error: App "${appName}" not found at ${appPath}`)
    console.error('\nAvailable apps:')

    const apps = getAvailableApps(join(process.cwd(), 'apps'))
    for (const app of apps) {
      console.error(`  - ${app}`)
    }
    process.exit(1)
  }

  // Run the command using bun's filter
  console.log(`Running "${command}" for ${packageName}...`)
  await $`bun --filter ${packageName} ${command}`.catch(() => process.exit(1))
}
