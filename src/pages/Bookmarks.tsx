import { useState } from 'react'
import Header from '../components/Header'
import FillReveal from '../components/FillReveal'
import './Bookmarks.css'

const CATEGORIES = [
  'design', 'insporation', 'coding', 'art',
  'psychology', 'literature', 'photography', 'philosophy',
]

const SOCIAL_LINKS = [
  { label: 'telegram', href: '#' },
  { label: 'linkedin', href: '#' },
  { label: 'instagram', href: '#' },
  { label: 'dribbble', href: '#' },
  { label: 'behance', href: '#' },
  { label: 'github', href: '#' },
]

type Bookmark = {
  id: string
  title: string
  domain: string
  href: string
  featured?: boolean
  category: string
}

const BOOKMARKS: Bookmark[] = [
  // Items ordered so index % 3 maps to column (0→col1, 1→col2, 2→col3)
  {
    id: '1',
    featured: true,
    title: 'Vasilis Marmatakis',
    domain: 'marmatakis.net',
    href: 'https://marmatakis.net',
    category: 'design',
  },
  {
    id: '2',
    title: 'Work and life of Stanley Kubrick — 04 Paths of Glory',
    domain: 'kibrik.life',
    href: 'https://kibrik.life',
    category: 'design',
  },
  {
    id: '3',
    title: 'Handheld Design® — Discover best-in-class mobile design inspiration.',
    domain: 'handhelddesign.app',
    href: 'https://handhelddesign.app',
    category: 'design',
  },
  {
    id: '4',
    title: 'Handheld Design® — Discover best-in-class mobile design inspiration.',
    domain: 'deadsimplesites.com',
    href: 'https://deadsimplesites.com',
    category: 'design',
  },
  {
    id: '5',
    title: 'Showcase of the best Animation Websites',
    domain: 'landing.love',
    href: 'https://landing.love',
    category: 'design',
  },
  {
    id: '6',
    title: 'SaaS Landing Page',
    domain: 'saaslandingpage.com',
    href: 'https://saaslandingpage.com',
    category: 'design',
  },
]

function BookmarkCard({ item }: { item: Bookmark }) {
  if (item.featured) {
    return (
      <a
        className="bm-card bm-card--featured"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="bm-card__body">
          <span className="bm-card__name">{item.title}</span>
          <span className="bm-card__domain">{item.domain}</span>
        </div>
        <div className="bm-card__rule" aria-hidden="true" />
      </a>
    )
  }

  return (
    <a
      className="bm-card"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="bm-card__body">
        <span className="bm-card__title">{item.title}</span>
        <div className="bm-card__meta">
          <span className="bm-card__domain">{item.domain}</span>
          <span className="bm-card__arrow" aria-hidden="true">&gt;&gt;&gt;</span>
        </div>
      </div>
      <div className="bm-card__rule" aria-hidden="true" />
    </a>
  )
}

function Bookmarks() {
  const [activeCategory, setActiveCategory] = useState('design')

  const filtered = BOOKMARKS.filter((b) => b.category === activeCategory)
  const col1 = filtered.filter((_, i) => i % 3 === 0)
  const col2 = filtered.filter((_, i) => i % 3 === 1)
  const col3 = filtered.filter((_, i) => i % 3 === 2)

  return (
    <div className="page bookmarks-page">
      <Header />

      <main className="bookmarks">
        <nav className="bookmarks__filters" aria-label="Category filters">
          {CATEGORIES.map((cat) => (
            <FillReveal
              key={cat}
              as="button"
              active={cat === activeCategory}
              className="bookmarks__filter"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={cat === activeCategory}
            >
              {cat}
            </FillReveal>
          ))}
        </nav>

        <div className="bookmarks__grid">
          {[col1, col2, col3].map((col, i) => (
            <div key={i} className="bookmarks__col">
              {col.map((item) => (
                <BookmarkCard key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer className="bookmarks-footer">
        <a
          className="bookmarks-footer__email"
          href="mailto:dilshodegamnazarov10@gmail.com"
        >
          dilshodegamnazarov10@gmail.com
        </a>
        <nav aria-label="Social links">
          <ul className="bookmarks-footer__social">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a className="bookmarks-footer__link" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Bookmarks
