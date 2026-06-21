import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Preloader.css'

// Tunables.
const DURATION = 2 // fill 0 -> 100%, seconds (1.5–2.5)
const HOLD = 0.15 // pause on the full row before the reveal, seconds
const RISE = 0.6 // background rise (bottom -> top), seconds
const MIN_SLOTS = 8 // floor for very narrow viewports

type Props = { onComplete: () => void }

function Preloader({ onComplete }: Props) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [visible, setVisible] = useState(!prefersReduced)
  const [slots, setSlots] = useState(0)

  const overlayRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const slotEls = useRef<HTMLSpanElement[]>([])
  const lastPaint = useRef(-1)

  // Reduced motion: never play — reveal the page immediately.
  useLayoutEffect(() => {
    if (prefersReduced) onComplete()
  }, [prefersReduced, onComplete])

  // Derive slot count N from the available width so the row stays one line.
  useLayoutEffect(() => {
    if (prefersReduced) return
    const compute = () => {
      const row = rowRef.current
      const measure = measureRef.current
      if (!row || !measure) return
      const charW = measure.getBoundingClientRect().width / 10
      if (!charW) return
      setSlots(Math.max(MIN_SLOTS, Math.floor(row.clientWidth / charW) - 1))
    }
    compute()
    window.addEventListener('resize', compute)
    document.fonts?.ready.then(compute).catch(() => {})
    return () => window.removeEventListener('resize', compute)
  }, [prefersReduced])

  // Drive everything with a single GSAP timeline.
  useLayoutEffect(() => {
    if (prefersReduced || slots === 0) return

    // Fresh build (e.g. after a resize recomputed N): drop stale refs/state.
    slotEls.current.length = slots
    lastPaint.current = -1

    // Paint the row for a given fill position p (head = "\" at the front).
    const paint = (raw: number) => {
      const n = slotEls.current.length
      const p = Math.min(Math.max(Math.round(raw), 0), n)
      if (p === lastPaint.current) return
      const start = lastPaint.current < 0 ? 0 : Math.min(lastPaint.current, p)
      for (let i = start; i <= p && i < n; i++) {
        const el = slotEls.current[i]
        if (!el) continue
        if (i < p) {
          el.textContent = '/'
          el.className = 'pl-slash pl-slash--filled'
        } else {
          // i === p: the moving head (none once p reaches n)
          el.textContent = '\\'
          el.className = 'pl-head'
        }
      }
      lastPaint.current = p
    }

    const ctx = gsap.context(() => {
      const proxy = { value: 0 }
      paint(0) // first frame already shows the head, no flash

      gsap
        .timeline({
          onComplete: () => {
            setVisible(false)
            onComplete()
          },
        })
        // Fill: 0 -> N, soft ease-in-out.
        .to(proxy, {
          value: slots,
          duration: DURATION,
          ease: 'power1.inOut',
          onUpdate: () => paint(proxy.value),
        })
        // Hold on the full row, then lift the background bottom -> top.
        .to(
          overlayRef.current,
          { yPercent: -100, duration: RISE, ease: 'power3.inOut' },
          `+=${HOLD}`,
        )
    }, overlayRef)

    return () => ctx.revert()
  }, [prefersReduced, slots, onComplete])

  if (prefersReduced || !visible) return null

  const row = []
  for (let i = 0; i < slots; i++) {
    row.push(
      <span
        key={i}
        className="pl-slash"
        ref={(el) => {
          if (el) slotEls.current[i] = el
        }}
      >
        /
      </span>,
    )
  }

  return (
    <div
      className="preloader"
      ref={overlayRef}
      role="status"
      aria-label="Loading"
      aria-busy="true"
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
