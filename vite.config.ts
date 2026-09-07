import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import type { OutputFormat, ProcessedImage } from 'imagetools-core'

// Custom output format: returns the image as an inline base64 data URL.
// Used for tiny blur-up placeholders (?w=20&blur=5&as=dataurl).
const dataurlFormat: OutputFormat = () => async (images: ProcessedImage[]) => {
  const img = images[0]
  const buffer = await img.image.toBuffer()
  const format = img.sharpMetadata.format ?? 'jpeg'
  const mime = format === 'jpeg' ? 'image/jpeg' : `image/${format}`
  return `data:${mime};base64,${buffer.toString('base64')}`
}

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      extendOutputFormats: (defaults) => ({ ...defaults, dataurl: dataurlFormat }),
    }),
  ],
})
