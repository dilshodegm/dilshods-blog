import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
// Vite resolves & fingerprints the asset (the Vite+React equivalent of
// Astro's optimized <Image>). Replace src/assets/portrait.svg with the
// real Figma portrait once it can be exported (egress to figma.com is
// currently blocked, so a neutral placeholder is committed in its place).
import portrait from '../assets/portrait.svg'
import './Home.css'

gsap.registerPlugin(ScrambleTextPlugin)

// Lowercase + a few "terminal" glyphs — restrained, to match the
// monospace black-and-white style without looking noisy.
const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz!<>-_/\\[]'

// Shared scrambleText config — tweenLength:false keeps the string length
// fixed so the monospace layout never jumps.
const scrambleConfig = (text: string) => ({
  text,
  chars: SCRAMBLE_CHARS,
  speed: 0.4,
  revealDelay: 0.3,
  tweenLength: false,
})

function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Respect users who opt out of motion: leave the real text in place.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cascade = gsap.utils.toArray<HTMLElement>('[data-scramble="cascade"]')
      const descParts = gsap.utils.toArray<HTMLElement>('[data-scramble="desc"]')

      const tl = gsap.timeline({ defaults: { ease: 'none' } })

      // Section headings + nav items decode one after another (terminal cascade).
      cascade.forEach((el, i) => {
        const text = (el.textContent ?? '').trim()
        tl.to(
          el,
          { duration: 0.8, scrambleText: scrambleConfig(text) },
          i * 0.08,
        )
      })

      // Hero description — kept as two parts so the bold lead survives.
      descParts.forEach((el) => {
        const text = (el.textContent ?? '').trim()
        tl.to(
          el,
          { duration: 1.2, scrambleText: scrambleConfig(text) },
          0.2,
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="page" ref={rootRef}>
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <ul className="nav__links">
            <li>
              <a className="nav__link nav__link--active" href="/about" aria-current="page" data-scramble="cascade">
                about
              </a>
            </li>
            <li>
              <a className="nav__link" href="/projects" data-scramble="cascade">projects</a>
            </li>
            <li>
              <a className="nav__link" href="/blog" data-scramble="cascade">blog</a>
            </li>
            <li>
              <a className="nav__link" href="/sketch" data-scramble="cascade">sketch</a>
            </li>
            <li>
              <a className="nav__link" href="/photography" data-scramble="cascade">photography</a>
            </li>
          </ul>
          <ul className="nav__lang" aria-label="Language">
            <li>
              <a className="nav__link" href="/ru" lang="ru" data-scramble="cascade">russian</a>
            </li>
            <li>
              <a className="nav__link" href="/en" lang="en" data-scramble="cascade">english</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero" aria-labelledby="hero-name">
          <h1 className="hero__name" id="hero-name">
            <span className="hero__highlight" data-scramble="cascade">dilshod egm</span>
          </h1>
          <p className="hero__desc">
            <strong className="hero__desc-strong" data-scramble="desc">ux designer &amp; mentor.</strong>{' '}
            <span data-scramble="desc">sharing insights, experience, and thoughts on design. sometimes about work, sometimes about life. (read if you want)</span>
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
      </main>

      <footer className="footer">
        <a className="footer__cta" href="mailto:dilshodegamnazarov10@gmail.com" data-scramble="cascade">
          get in touch &gt;
        </a>
      </footer>
    </div>
  )
}

export default Home
