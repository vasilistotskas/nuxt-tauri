#!/usr/bin/env bun
/**
 * Runs `nuxt prepare` for all Nuxt layers and apps in the monorepo.
 * Used as postinstall hook to generate .nuxt types for IDE support.
 */

import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { $ } from 'bun'

const rootDir = join(import.meta.dirname, '..')

const dirs = ['packages', 'apps']

for (const dir of dirs) {
  const parentDir = join(rootDir, dir)
  if (!existsSync(parentDir))
    continue

  const entries = readdirSync(parentDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .filter(d => existsSync(join(parentDir, d.name, 'nuxt.config.ts')))

  for (const entry of entries) {
    const entryDir = join(parentDir, entry.name)
    console.log(`Preparing ${dir}/${entry.name}...`)
    await $`nuxt prepare`.cwd(entryDir).catch((err) => {
      console.error(`Failed to prepare ${dir}/${entry.name}:`, err.message)
    })
  }
}
