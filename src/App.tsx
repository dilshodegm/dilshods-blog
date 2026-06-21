import { useCallback, useState } from 'react'
import Preloader from './components/Preloader'
import Home from './pages/Home'

function App() {
  // The hero typewriter only starts once the preloader has finished.
  const [revealed, setRevealed] = useState(false)
  const handleComplete = useCallback(() => setRevealed(true), [])

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <Home startTyping={revealed} />
    </>
  )
}

export default App
