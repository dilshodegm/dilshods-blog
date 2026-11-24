import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import FillReveal from '../components/FillReveal'
import { getBookmarks, getTopics, getTypes } from '../lib/getBookmarks'
import type { Bookmark, TaxonomyItem } from '../types/bookmarks'
import './Bookmarks.css'

const SOCIAL_LINKS = [
  { label: 'telegram', href: '#' },
  { label: 'linkedin', href: '#' },
  { label: 'instagram', href: '#' },
  { label: 'dribbble', href: '#' },
  { label: 'behance', href: '#' },
  { label: 'github', href: '#' },
]

const BOOKMARKS = getBookmarks()
const TOPICS = getTopics()
const TYPES = getTypes()

function BookmarkCard({ item }: { item: Bookmark }) {
  return (
    <a
      className="bm-card"
      href={item.url}
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
      <span className="sr-only">(opens in new tab)</span>
    </a>
  )
}

type FilterRowProps = {
  label: string
  items: TaxonomyItem[]
  active: string | null
  onSelect: (slug: string | null) => void
  size: 'large' | 'small'
}

function FilterRow({ label, items, active, onSelect, size }: FilterRowProps) {
  const options = [{ slug: null, label: 'all' }, ...items]
  return (
    <div
      role="group"
      aria-label={label}
      className={`bookmarks__filters bookmarks__filters--${size}`}
    >
      {options.map(({ slug, label: text }) => {
        const isActive = slug === active
        return (
          <FillReveal
            key={slug ?? 'all'}
            as="button"
            type="button"
            active={isActive}
            className="bookmarks__filter"
            aria-pressed={isActive}
            onClick={() => onSelect(slug)}
          >
            {text}
          </FillReveal>
        )
      })}
    </div>
  )
}

function Bookmarks() {
  const [searchParams, setSearchParams] = useSearchParams()
  const topicParam = searchParams.get('topic')
  const typeParam = searchParams.get('type')

  // Unknown slugs fall back to "all".
  const topic = TOPICS.some((t) => t.slug === topicParam) ? topicParam : null
  const inTopic = topic ? BOOKMARKS.filter((b) => b.topics.includes(topic)) : BOOKMARKS
  const typesInTopic = TYPES.filter((t) => inTopic.some((b) => b.type === t.slug))
  const type = typesInTopic.some((t) => t.slug === typeParam) ? typeParam : null
  const filtered = type ? inTopic.filter((b) => b.type === type) : inTopic

  // Quietly drop invalid params from the URL without adding a history entry.
  useEffect(() => {
    if ((topicParam !== null && !topic) || (typeParam !== null && !type)) {
      const next = new URLSearchParams(searchParams)
      if (!topic) next.delete('topic')
      if (!type) next.delete('type')
      setSearchParams(next, { replace: true })
    }
  }, [searchParams, setSearchParams, topicParam, typeParam, topic, type])

  const selectTopic = (slug: string | null) => {
    if (slug === topic) return
    const next = new URLSearchParams(searchParams)
    if (slug) next.set('topic', slug)
    else next.delete('topic')
    // Reset type if the new topic has no bookmarks of that type.
    const pool = slug ? BOOKMARKS.filter((b) => b.topics.includes(slug)) : BOOKMARKS
    if (!type || !pool.some((b) => b.type === type)) next.delete('type')
    setSearchParams(next)
  }

  const selectType = (slug: string | null) => {
    if (slug === type) return
    const next = new URLSearchParams(searchParams)
    if (slug) next.set('type', slug)
    else next.delete('type')
    setSearchParams(next)
  }

  const count = filtered.length

  return (
    <div className="page bookmarks-page">
      <Header />

      <main className="bookmarks">
        <h1 className="sr-only">bookmarks</h1>

        {(TOPICS.length > 0 || typesInTopic.length > 0) && (
          <div className="bookmarks__filter-rows">
            {TOPICS.length > 0 && (
              <FilterRow label="topic" items={TOPICS} active={topic} onSelect={selectTopic} size="large" />
            )}
            {typesInTopic.length > 0 && (
              <FilterRow label="type" items={typesInTopic} active={type} onSelect={selectType} size="small" />
            )}
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {count} {count === 1 ? 'bookmark' : 'bookmarks'}
        </p>

        {count > 0 ? (
          <ul className="bookmarks__grid">
            {filtered.map((item) => (
              <li key={item.id} className="bookmarks__item">
                <BookmarkCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="bookmarks__empty">empty. for now.</p>
        )}
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
