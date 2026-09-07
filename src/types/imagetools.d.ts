// Ambient module declarations for vite-imagetools query-string imports.
// The leading `*` wildcard matches any path prefix, so TypeScript knows
// the shape of each import without needing explicit casts.

declare module '*as=picture' {
  import type { Picture } from 'imagetools-core'
  const value: Picture
  export default value
}

declare module '*as=dataurl' {
  const value: string
  export default value
}
