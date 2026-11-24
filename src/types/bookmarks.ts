export type Bookmark = {
  id: string // Notion page id
  title: string
  url: string
  domain: string // "manobranding.uz" — no protocol, no www
  topics: string[] // slugs, in Notion option order
  type: string | null // slug
  addedAt: string // ISO
}

export type TaxonomyItem = {
  slug: string
  label: string
}

export type BookmarksData = {
  topics: TaxonomyItem[]
  types: TaxonomyItem[]
  bookmarks: Bookmark[]
}
