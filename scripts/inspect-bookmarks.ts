import { getNotion, fail } from './notion-client.ts'

const { notion, dataSourceId } = getNotion()

try {
  const ds = await notion.dataSources.retrieve({ data_source_id: dataSourceId })
  if (!('properties' in ds)) fail('Data source response has no properties (check integration access).')

  console.log(`Data source: ${dataSourceId}\n`)
  for (const [name, prop] of Object.entries(ds.properties)) {
    let options = ''
    if (prop.type === 'select') options = prop.select.options.map((o) => o.name).join(', ')
    if (prop.type === 'multi_select') options = prop.multi_select.options.map((o) => o.name).join(', ')
    console.log(`${JSON.stringify(name).padEnd(14)} id=${prop.id.padEnd(12)} ${prop.type.padEnd(13)} ${options}`)
  }
  console.log('\nCopy the ids into scripts/notion.config.ts.')
} catch (err) {
  fail(`Notion API error: ${err instanceof Error ? err.message : String(err)}`)
}
