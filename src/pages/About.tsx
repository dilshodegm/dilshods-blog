import Header from '../components/Header'
import './About.css'

function About() {
  return (
    <div className="page">
      <Header />

      <main className="about" aria-labelledby="about-title">
        <h1 className="about__title" id="about-title">
          <span className="about__highlight">about</span>
        </h1>

        <p className="about__lead">
          <strong className="about__lead-strong">ux designer &amp; mentor.</strong>{' '}
          sharing insights, experience, and thoughts on design. sometimes about
          work, sometimes about life. (read if you want)
        </p>
      </main>
    </div>
  )
}

export default About
