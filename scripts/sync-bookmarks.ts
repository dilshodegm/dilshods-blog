import { mkdirSync, renameSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import notionSdk from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client'
import { getDomain } from '../src/lib/getDomain.ts'
import type { Bookmark, BookmarksData, TaxonomyItem } from '../src/types/bookmarks.ts'
import { OUTPUT_FILE, PROPERTY_IDS } from './notion.config.ts'
import { fail, getNotion, sameId } from './notion-client.ts'

const { isFullPage } = notionSdk

type PageProperty = PageObjectResponse['properties'][string]

export const slugify = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '-')
const toTaxonomy = (name: string): TaxonomyItem => ({ slug: slugify(name), label: name.trim().toLowerCase() })

function prop(page: PageObjectResponse, id: string): PageProperty | undefined {
  return Object.values(page.properties).find((p) => sameId(p.id, id))
}

function isHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false
  try {
    const { protocol } = new URL(value)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

/** Key used for duplicate detection: host without www, no hash, no trailing slash. */
function urlKey(url: string): string {
  const u = new URL(url)
  const host = u.hostname.toLowerCase().replace(/^www\./, '')
  const path = u.pathname.replace(/\/+$/, '')
  return `${host}${u.port ? `:${u.port}` : ''}${path}${u.search}`
}

async function main() {
  const { notion, dataSourceId } = getNotion()

  // 1. Schema: option order in Notion = filter order on the site.
  const ds = await notion.dataSources.retrieve({ data_source_id: dataSourceId })
  if (!('properties' in ds)) fail('Data source has no properties (does the integration have access?).')
  const schema = Object.values(ds.properties)
  const topicProp = schema.find((p) => sameId(p.id, PROPERTY_IDS.topic))
  const typeProp = schema.find((p) => sameId(p.id, PROPERTY_IDS.type))
  if (topicProp?.type !== 'multi_select') fail(`Topic property ${PROPERTY_IDS.topic} not found or not multi_select. Run npm run bookmarks:inspect.`)
  if (typeProp?.type !== 'select') fail(`Type property ${PROPERTY_IDS.type} not found or not select. Run npm run bookmarks:inspect.`)
  const topicOptions = topicProp.multi_select.options.map((o) => toTaxonomy(o.name))
  const typeOptions = typeProp.select.options.map((o) => toTaxonomy(o.name))
  const topicOrder = new Map(topicOptions.map((t, i) => [t.slug, i]))

  // 2. Published pages, newest first, all pages of results.
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: PROPERTY_IDS.onSite, checkbox: { equals: true } },
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      page_size: 100,
      start_cursor: cursor,
    })
    for (const r of res.results) if (r.object === 'page' && isFullPage(r)) pages.push(r)
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)

  // 3–5. Map, validate, dedupe (first seen = newest).
  const bookmarks: Bookmark[] = []
  const seen = new Set<string>()
  for (const page of pages) {
    const nameProp = prop(page, PROPERTY_IDS.name)
    const urlProp = prop(page, PROPERTY_IDS.url)
    const topicsProp = prop(page, PROPERTY_IDS.topic)
    const typeValue = prop(page, PROPERTY_IDS.type)

    const title = nameProp?.type === 'title' ? nameProp.title.map((t) => t.plain_text).join('').trim() : ''
    const url = urlProp?.type === 'url' ? urlProp.url?.trim() : null

    if (!title) { console.warn(`⚠ skipped ${page.id}: empty Name`); continue }
    if (!isHttpUrl(url)) { console.warn(`⚠ skipped ${page.id} "${title}": missing or invalid URL`); continue }

    const key = urlKey(url)
    if (seen.has(key)) { console.warn(`⚠ skipped ${page.id} "${title}": duplicate of a newer entry (${url})`); continue }
    seen.add(key)

    const topics = topicsProp?.type === 'multi_select'
      ? [...new Set(topicsProp.multi_select.map((o) => slugify(o.name)))]
          .sort((a, b) => (topicOrder.get(a) ?? Infinity) - (topicOrder.get(b) ?? Infinity))
      : []
    const type = typeValue?.type === 'select' && typeValue.select ? slugify(typeValue.select.name) : null

    // Explicit key order keeps the JSON output stable.
    bookmarks.push({
      id: page.id,
      title,
      url,
      domain: getDomain(url),
      topics,
      type,
      addedAt: page.created_time,
    })
  }

  // 6. Only taxonomy with at least one published bookmark.
  const usedTopics = new Set(bookmarks.flatMap((b) => b.topics))
  const usedTypes = new Set(bookmarks.map((b) => b.type).filter(Boolean))
  const data: BookmarksData = {
    topics: topicOptions.filter((t) => usedTopics.has(t.slug)).map(({ slug, label }) => ({ slug, label })),
    types: typeOptions.filter((t) => usedTypes.has(t.slug)).map(({ slug, label }) => ({ slug, label })),
    bookmarks,
  }

  // 7. Atomic write, only after everything above succeeded.
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true })
  const tmp = `${OUTPUT_FILE}.tmp`
  writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`)
  renameSync(tmp, OUTPUT_FILE)

  console.log(`✔ ${bookmarks.length} bookmarks, ${data.topics.length} topics, ${data.types.length} types → ${OUTPUT_FILE}`)
}

main().catch((err: unknown) => {
  fail(`Sync failed, ${OUTPUT_FILE} left untouched: ${err instanceof Error ? err.message : String(err)}`)
})
