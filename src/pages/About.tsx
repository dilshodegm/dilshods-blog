import Header from '../components/Header'
import Photo from '../components/Photo'

// Portrait — eager (above fold); 522×522 design square
import portraitPicture from '../assets/about-portrait.jpg?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import portraitPlaceholder from '../assets/about-portrait.jpg?w=20&blur=5&as=dataurl'

// Off-screen gallery — lazy; srcset 400/800/1200, avif > webp > jpeg
import photo1Pic from '../assets/offscreen/costa-2026-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo1Thumb from '../assets/offscreen/costa-2026-1.png?w=20&blur=5&as=dataurl'

import photo2Pic from '../assets/offscreen/photo-for-site-03-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo2Thumb from '../assets/offscreen/photo-for-site-03-1.png?w=20&blur=5&as=dataurl'

import photo3Pic from '../assets/offscreen/photo-for-site-05-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo3Thumb from '../assets/offscreen/photo-for-site-05-1.png?w=20&blur=5&as=dataurl'

import photo4Pic from '../assets/offscreen/photo-for-site-02-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo4Thumb from '../assets/offscreen/photo-for-site-02-1.png?w=20&blur=5&as=dataurl'

import photo5Pic from '../assets/offscreen/photo-for-site-04-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo5Thumb from '../assets/offscreen/photo-for-site-04-1.png?w=20&blur=5&as=dataurl'

import photo6Pic from '../assets/offscreen/photo-for-site-06-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo6Thumb from '../assets/offscreen/photo-for-site-06-1.png?w=20&blur=5&as=dataurl'

import photo7Pic from '../assets/offscreen/img-20260727-1.png?w=400;800;1200&format=avif;webp;jpeg&as=picture'
import photo7Thumb from '../assets/offscreen/img-20260727-1.png?w=20&blur=5&as=dataurl'

import './About.css'

// Gallery descriptors — flex values mirror Figma proportional widths (191:190:116…)
const GALLERY = [
  { pic: photo1Pic, thumb: photo1Thumb, flex: 191, w: 191, sizes: '(max-width: 600px) 191px, 16vw' },
  { pic: photo2Pic, thumb: photo2Thumb, flex: 190, w: 190, sizes: '(max-width: 600px) 190px, 16vw' },
  { pic: photo3Pic, thumb: photo3Thumb, flex: 116, w: 116, sizes: '(max-width: 600px) 116px, 10vw' },
  { pic: photo4Pic, thumb: photo4Thumb, flex: 190, w: 190, sizes: '(max-width: 600px) 190px, 16vw' },
  { pic: photo5Pic, thumb: photo5Thumb, flex: 116, w: 116, sizes: '(max-width: 600px) 116px, 10vw' },
  { pic: photo6Pic, thumb: photo6Thumb, flex: 190, w: 190, sizes: '(max-width: 600px) 190px, 16vw' },
  { pic: photo7Pic, thumb: photo7Thumb, flex: 190, w: 190, sizes: '(max-width: 600px) 190px, 16vw' },
] as const

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
          {/* Portrait is eager — above fold; object-position:bottom via About.css override */}
          <Photo
            picture={portraitPicture}
            placeholder={portraitPlaceholder}
            alt="Black-and-white portrait of dilshod egm looking at the camera"
            width={522}
            height={522}
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 522px"
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
          {GALLERY.map(({ pic, thumb, flex, w, sizes }, i) => (
            <div key={i} className="offscreen__slot" style={{ flex }}>
              <Photo
                picture={pic}
                placeholder={thumb}
                alt=""
                width={w}
                height={142}
                sizes={sizes}
              />
            </div>
          ))}
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
