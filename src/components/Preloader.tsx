import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Preloader.css'

// Tunables.
const DURATION = 2000 // fill 0 -> 100%, ms (1500–2500)
const HOLD = 150 // pause on the full row before fading, ms
const FADE = 400 // fade-out, ms
const MIN_SLOTS = 8 // floor for very narrow viewports

// Soft ease-in-out so the head glides rather than runs at constant speed.
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

type Props = { onComplete: () => void }

function Preloader({ onComplete }: Props) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [visible, setVisible] = useState(!prefersReduced)
  const [fading, setFading] = useState(false)
  const [slots, setSlots] = useState(0) // N
  const [progress, setProgress] = useState(0) // p

  const rowRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const finishedRef = useRef(false)

  // Reduced motion: never play the fill — the overlay starts hidden, so just
  // signal completion to reveal the page immediately.
  useEffect(() => {
    if (prefersReduced) onComplete()
  }, [prefersReduced, onComplete])

  // Derive N from the available width so the row is always a single line.
  useLayoutEffect(() => {
    if (prefersReduced) return
    const compute = () => {
      const row = rowRef.current
      const measure = measureRef.current
      if (!row || !measure) return
      const charW = measure.getBoundingClientRect().width / 10
      if (!charW) return
      // -1 keeps a hair of slack; overflow:hidden guards the rest.
      setSlots(Math.max(MIN_SLOTS, Math.floor(row.clientWidth / charW) - 1))
    }
    compute()
    window.addEventListener('resize', compute)
    // Re-measure once the monospace webfont is ready (metrics can shift).
    document.fonts?.ready.then(compute).catch(() => {})
    return () => window.removeEventListener('resize', compute)
  }, [prefersReduced])

  // Animate p from 0 to N with requestAnimationFrame.
  useEffect(() => {
    if (prefersReduced || slots === 0) return
    let raf = 0
    let start = 0
    const tick = (ts: number) => {
      if (!start) start = ts
      const t = Math.min((ts - start) / DURATION, 1)
      setProgress(Math.round(easeInOut(t) * slots))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else if (!finishedRef.current) {
        finishedRef.current = true
        window.setTimeout(() => {
          setFading(true)
          window.setTimeout(() => {
            setVisible(false)
            onComplete()
          }, FADE)
        }, HOLD)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [prefersReduced, slots, onComplete])

  if (prefersReduced || !visible) return null

  const row = []
  for (let i = 0; i < slots; i++) {
    if (i < progress) {
      row.push(
        <span key={i} className="pl-slash pl-slash--filled">
          /
        </span>,
      )
    } else if (i === progress) {
      // Head only while filling; at p === N it's gone and the row is solid.
      row.push(
        <span key={i} className="pl-head">
          {'\\'}
        </span>,
      )
    } else {
      row.push(
        <span key={i} className="pl-slash">
          /
        </span>,
      )
    }
  }

  return (
    <div
      className={`preloader${fading ? ' preloader--fading' : ''}`}
      role="status"
      aria-label="Loading"
      aria-busy={!fading}
    >
      <div className="preloader__inner">
        <div className="preloader__row" ref={rowRef} aria-hidden="true">
          {row}
        </div>
        <span ref={measureRef} className="preloader__measure" aria-hidden="true">
          //////////
        </span>
        <p className="preloader__label">loading...</p>
      </div>
    </div>
  )
}

export default Preloader
