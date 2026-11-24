/**
 * Notion property IDs for the "All Library" data source.
 * IDs survive renames in Notion; names don't. Run `npm run bookmarks:inspect`
 * to print the current schema and update these if a property is recreated.
 *
 * "Added" needs no ID: sorting uses the page's created_time timestamp.
 * "Status" and "Author " are intentionally not synced.
 */
export const PROPERTY_IDS = {
  name: 'title',
  url: '%5C%5EKq',
  topic: 'hDZt',
  type: 'R%3FaP',
  onSite: '%3C%60mM',
} as const

export const OUTPUT_FILE = 'src/data/bookmarks.json'
