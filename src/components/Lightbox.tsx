import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Picture } from 'imagetools-core'
import './Lightbox.css'

export interface LightboxItem {
  picture: Picture
  alt: string
}

interface Props {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const item = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  // Keyboard: ←/→ navigate, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return createPortal(
    // Clicking the white background (the overlay itself) closes the lightbox
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      onClick={onClose}
    >
      {/* Prev — stops propagation so the click doesn't close the lightbox */}
      <button
        className={`lightbox__nav lightbox__nav--prev${hasPrev ? '' : ' lightbox__nav--hidden'}`}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous photo"
        tabIndex={hasPrev ? 0 : -1}
      >
        prev
      </button>

      {/* Image stage — stops propagation so clicking the photo doesn't close */}
      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <picture className="lightbox__picture">
          {(['avif', 'webp', 'jpeg'] as const).map((fmt) =>
            item.picture.sources[fmt] ? (
              <source key={fmt} type={`image/${fmt}`} srcSet={item.picture.sources[fmt]} />
            ) : null,
          )}
          <img
            className="lightbox__img"
            src={item.picture.img.src}
            width={item.picture.img.w}
            height={item.picture.img.h}
            alt={item.alt}
            decoding="async"
          />
        </picture>
      </div>

      <button
        className={`lightbox__nav lightbox__nav--next${hasNext ? '' : ' lightbox__nav--hidden'}`}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next photo"
        tabIndex={hasNext ? 0 : -1}
      >
        next
      </button>
    </div>,
    document.body,
  )
}
