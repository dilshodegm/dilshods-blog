import Header from '../components/Header'
// Placeholder until the real portrait is exported from Figma (node 513:31).
// Drop the photo at src/assets/about-portrait.png and point this import at it.
import portrait from '../assets/about-portrait.svg'
import './About.css'

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
                hi. i’ve been{' '}
                <strong className="about__strong">designing user interfaces</strong>{' '}
                for 4+ years, and i’ve spent almost as long explaining to
                others how it’s done.
              </p>
              <p className="about__p">
                i started out with code. that’s probably why it’s easier for
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
            <ul className="about__list">
              <li>designing [nothing] at [nowhere].</li>
              <li>mentoring at an academy — teaching teenagers digital design.</li>
              <li>or trying to. mostly it works.</li>
              <li>learning to shoot on film. not very well yet.</li>
            </ul>
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
    </div>
  )
}

export default About
