// Vite resolves & fingerprints the asset (the Vite+React equivalent of
// Astro's optimized <Image>). Replace src/assets/portrait.svg with the
// real Figma portrait once it can be exported (egress to figma.com is
// currently blocked, so a neutral placeholder is committed in its place).
import portrait from '../assets/portrait.png'
import './Home.css'

function Home() {
  return (
    <div className="page">
      <header className="header">
        <nav className="nav" aria-label="Primary">
          <ul className="nav__links">
            <li>
              <a className="nav__link nav__link--active" href="/about" aria-current="page">
                about
              </a>
            </li>
            <li>
              <a className="nav__link" href="/projects">projects</a>
            </li>
            <li>
              <a className="nav__link" href="/blog">blog</a>
            </li>
            <li>
              <a className="nav__link" href="/sketch">sketch</a>
            </li>
            <li>
              <a className="nav__link" href="/photography">photography</a>
            </li>
          </ul>
          <ul className="nav__lang" aria-label="Language">
            <li>
              <a className="nav__link" href="/ru" lang="ru">russian</a>
            </li>
            <li>
              <a className="nav__link" href="/en" lang="en">english</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero" aria-labelledby="hero-name">
          <h1 className="hero__name" id="hero-name">
            <span className="hero__highlight">dilshod egm</span>
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

        {/* let's talk */}
        </a>
      </section>
      </main>
    </div>
  )
}

export default Home
