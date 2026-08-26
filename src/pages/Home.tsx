import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Header from '../components/Header'
// Vite resolves & fingerprints the asset (the Vite+React equivalent of
// Astro's optimized <Image>).
import portrait from '../assets/portrait.png'
import './Home.css'

gsap.registerPlugin(TextPlugin)

const NAME = 'dilshod egm'

// Keep the terminal cursor blinking after typing finishes. Flip to false
// to hide the cursor once the name is fully typed.
const SHOW_IDLE_CURSOR = true

type Props = { startTyping?: boolean }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Home({ startTyping = false }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const typedRef = useRef(false)

  // Before paint, clear the name so it never flashes behind the preloader.
  // Under reduced motion we keep the full name in place (no typing later).
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const typed = rootRef.current?.querySelector<HTMLElement>('.hero__typed')
    if (typed) gsap.set(typed, { text: '' })
  }, [])

  // Type the name once the preloader signals completion.
  useEffect(() => {
    if (!startTyping || prefersReducedMotion() || typedRef.current) return
    const root = rootRef.current
    if (!root) return
    typedRef.current = true

    const ctx = gsap.context(() => {
      const typed = root.querySelector<HTMLElement>('.hero__typed')
      const cursor = root.querySelector<HTMLElement>('.hero__cursor')
      if (!typed) return

      gsap.to(typed, {
        duration: 1.0,
        ease: 'none',
        text: { value: NAME },
        onComplete: () => {
          if (!SHOW_IDLE_CURSOR && cursor) cursor.style.display = 'none'
        },
      })
    }, root)

    return () => ctx.revert()
  }, [startTyping])

  return (
    <div className="page" ref={rootRef}>
      <Header />

      <main className="main">
        <section className="hero" aria-labelledby="hero-name">
          <h1 className="hero__name" id="hero-name">
            <span className="hero__highlight">
              <span className="hero__typed" aria-hidden="true">{NAME}</span><span
                className="hero__cursor" aria-hidden="true">▮</span>
              <span className="sr-only">{NAME}</span>
            </span>
          </h1>
          <p className="hero__desc">
            <strong className="hero__desc-strong">ux designer &amp; mentor.</strong>{' '}
            sharing insights, experience, and thoughts on design. sometimes about
            work, sometimes about life. (read if you want)
          </p>
        </section>

        <section className="banner" aria-label="Portrait">
          <img
            className="banner__photo"
            src={portrait}
            width={223}
            height={278}
            alt="Black-and-white side portrait of dilshod egm wearing a cap"
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="touch">
          <a className="touch__cta" href="mailto:dilshodegamnazarov10@gmail.com">
            let's build something &gt;
          </a>
        </section>
      </main>
    </div>
  )
}

export default Home
