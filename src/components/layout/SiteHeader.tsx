import { useEffect, useState } from 'react'
import { Github, Menu, Moon, Sun, X } from 'lucide-react'
import Brand from './Brand'
import { navigation } from '../../data/site'

type SiteHeaderProps = {
  lightMode: boolean
  onToggleTheme: () => void
}

export default function SiteHeader({ lightMode, onToggleTheme }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 50)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <div className="header-left">
          <Brand />
          <span className="header-divider hidden md:block" aria-hidden="true">/</span>
          <nav className="header-nav hidden md:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <span key={item} className="nav-link">{item}</span>
            ))}
          </nav>
        </div>
        <div className="header-actions">
          <button className="header-icon-button inline-flex" type="button" onClick={onToggleTheme} aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}>
            {lightMode ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <span className="header-github hidden sm:inline-flex"><Github size={16} /> <span>GitHub</span></span>
          <span className="header-pro hidden sm:inline-flex">Get Beatrix Pro</span>
          <button className="header-icon-button inline-flex md:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-navigation md:hidden" aria-label="Mobile navigation">
          {navigation.map((item) => <span key={item}>{item}</span>)}
          <span>GitHub</span>
        </nav>
      )}
    </header>
  )
}
