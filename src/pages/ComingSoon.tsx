import Header from '../components/Header'

// Fallback for nav sections that don't have a page yet, so they never land
// on a blank screen. Replace with the real page as each one is built.
function ComingSoon() {
  return (
    <div className="page">
      <Header />
      <main className="placeholder">
        <p className="placeholder__text">coming soon...</p>
      </main>
    </div>
  )
}

export default ComingSoon
