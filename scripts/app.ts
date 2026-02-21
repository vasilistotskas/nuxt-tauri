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

import { join } from 'node:path'

// ── Exported pure functions for testing ──────────────────

export function parseArgs(args: string[]): { appName: string, command: string } | null {
  if (args.length < 2)
    return null
  return { appName: args[0], command: args[1] }
}

export function resolveAppPath(cwd: string, appName: string): string {
  return join(cwd, 'apps', appName)
}

export async function getAvailableApps(appsDir: string): Promise<string[]> {
  const { readdir } = await import('node:fs/promises')

  try {
    const entries = await readdir(appsDir, { withFileTypes: true })
    const apps: string[] = []
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const pkgFile = Bun.file(join(appsDir, entry.name, 'package.json'))
        if (await pkgFile.exists()) {
          apps.push(entry.name)
        }
      }
    }
    return apps.sort()
  }
  catch {
    return []
  }
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
  web:dev                Start Nuxt dev server (SSR, web mode)
  web:build              Build for web production (SSR)
  web:preview            Preview web production build

Examples:
  bun run app wecare dev
  bun run app wecare tauri:build
  bun run app wecare tauri:android:dev
`)
    process.exit(1)
  }

  const { appName, command } = parsed
  const appPath = join(import.meta.dirname, '..', 'apps', appName)
  const packageName = `@apps/${appName}`

  // Verify app exists
  const packageJson = Bun.file(join(appPath, 'package.json'))
  if (!await packageJson.exists()) {
    console.error(`Error: App "${appName}" not found at ${appPath}`)
    console.error('\nAvailable apps:')

    const apps = await getAvailableApps(join(import.meta.dirname, '..', 'apps'))
    for (const app of apps) {
      console.error(`  - ${app}`)
    }
    process.exit(1)
  }

  // Run the command with inherited stdio for interactive stdin support
  console.log(`Running "${command}" for ${packageName}...`)
  const proc = Bun.spawn(['bun', 'run', command], {
    cwd: appPath,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  })
  const exitCode = await proc.exited
  process.exit(exitCode)
}
