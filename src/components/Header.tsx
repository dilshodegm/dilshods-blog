import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'projects', href: '/projects' },
  { label: 'bookmarks', href: '/bookmarks' },
  { label: 'essays', href: '/essays' },
  { label: 'photography', href: '/photography' },
]

function Header() {
  const { pathname } = useLocation()
  // The landing page is the "about" section, so "/" keeps that item active
  // (matches the Figma home design, where "about" is underlined).
  const activeHref = pathname === '/' ? '/about' : pathname

  return (
    <header className="header">
      <nav className="nav" aria-label="Primary">
        <ul className="nav__links">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = activeHref === href
            return (
              <li key={href}>
                <Link
                  className={`nav__link${isActive ? ' nav__link--active' : ''}`}
                  to={href}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            )
          })}
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
  )
}

export default Header
