import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import FadeContent from '../effects/FadeContent'
import CodePlayground from './CodePlayground'
import { presets, type Preset } from '../../data/site'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [settings, setSettings] = useState<Preset>(presets[0])
  const [activePreset, setActivePreset] = useState<number | null>(0)
  const [dotSpacing, setDotSpacing] = useState(14)
  const [glowRadius, setGlowRadius] = useState(160)

  const selectPreset = (index: number) => {
    setSettings(presets[index])
    setActivePreset(index)
  }

  const updateSettings = (changes: Partial<Preset>) => {
    setSettings((current) => ({ ...current, ...changes }))
    setActivePreset(null)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  const accentStyle = {
    '--accent': settings.color,
    '--motion-speed': `${Math.max(12, 35 - settings.speed * 25)}s`,
    '--dot-spacing': `${dotSpacing}px`,
    '--glow-radius': `${glowRadius}px`,
    '--band-height': `${300 + settings.bandWidth * 400}px`,
    '--aura-width': `${55 + settings.frequency * 15}%`,
    '--dot-opacity': Math.min(1, 0.52 + settings.noise),
  } as CSSProperties

  return (
    <section ref={heroRef} className="hero relative isolate min-h-[760px] overflow-hidden" style={accentStyle} onPointerMove={handlePointerMove} aria-labelledby="hero-title">
      <div className="hero-dots absolute inset-0" aria-hidden="true" />
      <div className="hero-aura hero-aura-one absolute" aria-hidden="true" />
      <div className="hero-aura hero-aura-two absolute" aria-hidden="true" />
      <div className="hero-aura hero-aura-three absolute" aria-hidden="true" />
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-[42%]" aria-hidden="true" />

      <div className="hero-content relative z-10 mx-auto grid max-w-[1324px] items-start gap-10 px-6 pb-28 pt-[clamp(170px,17vw,240px)] md:px-8 lg:grid-cols-2 lg:gap-5">
        <FadeContent className="hero-copy flex flex-col items-start" blur duration={850}>
          <span className="hero-tag inline-flex items-center gap-2.5 rounded-[10px] p-1 pr-4 text-xs">
            <span className="hero-tag-new rounded-md px-2.5 py-1 font-semibold">New</span>
            <span>Micro-interactions</span><ArrowRight size={11} />
          </span>
          <h1 id="hero-title" className="hero-title mt-6 font-medium text-white">
            <span>React components for</span><br />
            <span className="hero-accent">creative developers</span>
          </h1>
          <p className="hero-description mt-5 max-w-[48ch] text-[17px] leading-[1.6]">Animated components and backgrounds that install as source you own. Tune every value, starting with this page&apos;s background.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="hero-button hero-button-primary inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold">Browse components <ArrowRight size={14} /></span>
            <span className="hero-button hero-button-secondary inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold">Open source</span>
          </div>
        </FadeContent>
        <FadeContent className="hero-playground flex min-w-0 justify-end" blur duration={900} delay={140}>
          <CodePlayground settings={settings} activePreset={activePreset} onPresetChange={selectPreset} onSettingsChange={updateSettings} dotSpacing={dotSpacing} glowRadius={glowRadius} onDotSpacingChange={setDotSpacing} onGlowRadiusChange={setGlowRadius} />
        </FadeContent>
      </div>
      <div className="scroll-cue absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/35"><span>Scroll to explore</span><ArrowDown size={14} /></div>
    </section>
  )
}
