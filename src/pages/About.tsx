import Header from '../components/Header'
import portrait from '../assets/about-portrait.jpg'
import photo1 from '../assets/offscreen/costa-2026-1.png'
import photo2 from '../assets/offscreen/photo-for-site-03-1.png'
import photo3 from '../assets/offscreen/photo-for-site-05-1.png'
import photo4 from '../assets/offscreen/photo-for-site-02-1.png'
import photo5 from '../assets/offscreen/photo-for-site-04-1.png'
import photo6 from '../assets/offscreen/photo-for-site-06-1.png'
import photo7 from '../assets/offscreen/img-20260727-1.png'
import './About.css'

const SOCIAL_LINKS = [
  { label: 'telegram', href: '#' },
  { label: 'linkedin', href: '#' },
  { label: 'instagram', href: '#' },
  { label: 'dribbble', href: '#' },
  { label: 'behance', href: '#' },
  { label: 'github', href: '#' },
]

function About() {
  return (
    <div className="page">
      <Header />

      <main className="about" aria-labelledby="about-title">
        <div className="about__text">
          <section className="about__bio">
            <h1 className="about__title" id="about-title">
              background
            </h1>
            <div className="about__copy">
              <p className="about__p">
                hi. i've been{' '}
                <strong className="about__strong">designing user interfaces</strong>{' '}
                for 4+ years, and i've spent almost as long explaining to
                others how it's done.
              </p>
              <p className="about__p">
                i started out with code. that's probably why it's easier for
                me to communicate with developers than with myself.
              </p>
            </div>
          </section>

          <section className="about__now" aria-labelledby="about-now-title">
            <div className="about__now-head">
              <h2 className="about__now-title" id="about-now-title">
                now - september 2026
              </h2>
              <hr className="about__rule" />
            </div>
            <p className="about__now-body">
              designing [nothing] at [nowhere].<br />
              mentoring at an academy — teaching teenagers digital design.<br />
              or trying to. mostly it works.<br />
              learning to shoot on film. not very well yet.
            </p>
          </section>
        </div>

        <figure className="about__photo">
          <img
            className="about__photo-img"
            src={portrait}
            width={522}
            height={522}
            alt="Black-and-white portrait of dilshod egm looking at the camera"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </main>

      <section className="offscreen" aria-labelledby="offscreen-title">
        <div className="offscreen__head">
          <div className="offscreen__heading-row">
            <h2 className="offscreen__title" id="offscreen-title">off screen</h2>
            <h2 className="offscreen__subtitle">my life</h2>
          </div>
          <hr className="offscreen__rule" />
        </div>
        <div className="offscreen__gallery">
          <img className="offscreen__img offscreen__img--w191" src={photo1} alt="" loading="lazy" decoding="async" />
          <img className="offscreen__img offscreen__img--w190" src={photo2} alt="" loading="lazy" decoding="async" />
          <img className="offscreen__img offscreen__img--w116" src={photo3} alt="" loading="lazy" decoding="async" />
          <img className="offscreen__img offscreen__img--w190" src={photo4} alt="" loading="lazy" decoding="async" />
          <img className="offscreen__img offscreen__img--w116" src={photo5} alt="" loading="lazy" decoding="async" />
          <img className="offscreen__img offscreen__img--w190" src={photo6} alt="" loading="lazy" decoding="async" />
          <img className="offscreen__img offscreen__img--w190" src={photo7} alt="" loading="lazy" decoding="async" />
        </div>
      </section>

      <footer className="about-footer">
        <a
          className="about-footer__email"
          href="mailto:dilshodegamnazarov10@gmail.com"
        >
          dilshodegamnazarov10@gmail.com
        </a>
        <nav aria-label="Social links">
          <ul className="about-footer__social">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a className="about-footer__link" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default About
