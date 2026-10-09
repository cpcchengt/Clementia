import { useState } from 'react'
import Hero from './components/hero/Hero'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'

export default function App() {
  const [lightMode, setLightMode] = useState(true)

  return (
    <div id="top" className={`app-shell min-h-screen ${lightMode ? 'theme-light' : ''}`}>
      <SiteHeader lightMode={lightMode} onToggleTheme={() => setLightMode((value) => !value)} />
      <main>
        <Hero />
        {/* Add future landing sections here. */}
      </main>
      <SiteFooter />
    </div>
  )
}
