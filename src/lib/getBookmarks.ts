import type { Bookmark, BookmarksData, TaxonomyItem } from '../types/bookmarks'
import data from '../data/bookmarks.json'

// The only module that knows where bookmarks come from. Today it's a JSON
// snapshot synced from Notion at build time (scripts/sync-bookmarks.ts).
const snapshot = data as BookmarksData

/** All published bookmarks, newest first. */
export function getBookmarks(): Bookmark[] {
  return snapshot.bookmarks
}

/** Topics that have at least one bookmark, in Notion option order. */
export function getTopics(): TaxonomyItem[] {
  return snapshot.topics
}

/** Types that have at least one bookmark, in Notion option order. */
export function getTypes(): TaxonomyItem[] {
  return snapshot.types
}
