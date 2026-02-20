#!/usr/bin/env bun
/**
 * Runs `nuxt typecheck` for all Nuxt layers and apps in the monorepo.
 */

import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'

const rootDir = join(import.meta.dirname, '..')

const dirs = ['packages', 'apps']
let failed = false

for (const dir of dirs) {
  const parentDir = join(rootDir, dir)
  if (!existsSync(parentDir))
    continue

  const entries = readdirSync(parentDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .filter(d => existsSync(join(parentDir, d.name, 'nuxt.config.ts')))

  for (const entry of entries) {
    const entryDir = join(parentDir, entry.name)
    console.log(`Typechecking ${dir}/${entry.name}...`)
    await $`nuxt typecheck`.cwd(entryDir).catch(() => {
      failed = true
    })
  }
}

if (failed) {
  process.exit(1)
}
