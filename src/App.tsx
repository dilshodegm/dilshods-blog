import { useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Preloader from './components/Preloader'
import About from './pages/About'
import ComingSoon from './pages/ComingSoon'
import Home from './pages/Home'

function App() {
  // The hero typewriter only starts once the preloader has finished.
  const [revealed, setRevealed] = useState(false)
  const handleComplete = useCallback(() => setRevealed(true), [])

  return (
    <BrowserRouter>
      {/* Outside <Routes> so it plays once per visit, not on every navigation. */}
      <Preloader onComplete={handleComplete} />
      <Routes>
        <Route path="/" element={<Home startTyping={revealed} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
