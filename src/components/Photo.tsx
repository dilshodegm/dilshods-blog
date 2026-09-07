import { useLayoutEffect, useRef, useState } from 'react'
import type { Picture } from 'imagetools-core'
import './Photo.css'

interface Props {
  picture: Picture
  placeholder: string
  alt: string
  width: number
  height: number
  loading?: 'lazy' | 'eager'
  sizes?: string
  className?: string
}

export default function Photo({
  picture,
  placeholder,
  alt,
  width,
  height,
  loading = 'lazy',
  sizes,
  className,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Synchronous check before paint so cached / eager images never render
  // at opacity:0 even for a single frame.
  useLayoutEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const cssVars = { '--photo-placeholder': `url(${placeholder})` } as React.CSSProperties

  return (
    <picture
      className={`photo${loaded ? ' photo--loaded' : ''}${className ? ` ${className}` : ''}`}
      style={cssVars}
    >
      {(['avif', 'webp', 'jpeg'] as const).map((fmt) =>
        picture.sources[fmt] ? (
          <source
            key={fmt}
            type={`image/${fmt}`}
            srcSet={picture.sources[fmt]}
            {...(sizes ? { sizes } : {})}
          />
        ) : null,
      )}
      <img
        ref={imgRef}
        className="photo__img"
        src={picture.img.src}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </picture>
  )
}
