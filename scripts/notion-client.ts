import { existsSync } from 'node:fs'
// CommonJS package: named ESM exports aren't detected, so go through the default.
import notionSdk from '@notionhq/client'

const { Client } = notionSdk

// Local runs read .env.local; in CI the variables come from GitHub Secrets.
if (existsSync('.env.local')) process.loadEnvFile('.env.local')

export function fail(message: string): never {
  console.error(`✖ ${message}`)
  process.exit(1)
}

export function getNotion() {
  const token = process.env.NOTION_TOKEN
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID
  if (!token) fail('NOTION_TOKEN is not set (add it to .env.local or GitHub Secrets).')
  if (!dataSourceId) fail('NOTION_DATA_SOURCE_ID is not set (add it to .env.local or GitHub Secrets).')
  return { notion: new Client({ auth: token }), dataSourceId }
}

/** Property IDs may come URL-encoded ("%3AUPp") or not; compare decoded. */
export function sameId(a: string, b: string) {
  const decode = (s: string) => {
    try { return decodeURIComponent(s) } catch { return s }
  }
  return decode(a) === decode(b)
}
