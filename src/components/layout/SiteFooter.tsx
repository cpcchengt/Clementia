import { Heart } from 'lucide-react'
import FadeContent from '../effects/FadeContent'
import Brand from './Brand'
import { footerGroups } from '../../data/site'

export default function SiteFooter() {
  return (
    <footer id="footer" className="site-footer relative z-10 border-t border-white/8">
      <div className="mx-auto max-w-[1324px] px-6 pb-8 pt-16 md:px-8 md:pt-20">
        <FadeContent className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-20" blur duration={700}>
          <div>
            <Brand />
            <p className="mt-5 max-w-[260px] text-sm leading-6 text-white/45">Animated UI components for React.</p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{group.title}</h2>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}><span className="footer-link">{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </FadeContent>
        <div className="mt-20 flex flex-col gap-4 border-t border-white/8 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Made with <Heart className="mx-0.5 inline-block fill-fuchsia-500 text-fuchsia-500" size={11} aria-label="love" /> by Beatrix</span>
          <span>© {new Date().getFullYear()} Beatrix</span>
        </div>
      </div>
      <div className="footer-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full" aria-hidden="true" />
    </footer>
  )
}
