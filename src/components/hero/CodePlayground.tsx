import { useState } from 'react'
import { MoveHorizontal, RotateCcw } from 'lucide-react'
import type { Preset } from '../../data/site'
import { presets } from '../../data/site'

type CodePlaygroundProps = {
  settings: Preset
  activePreset: number | null
  onPresetChange: (index: number) => void
  onSettingsChange: (changes: Partial<Preset>) => void
  dotSpacing: number
  glowRadius: number
  onDotSpacingChange: (value: number) => void
  onGlowRadiusChange: (value: number) => void
}

type NumberProperty = 'speed' | 'frequency' | 'noise' | 'bandWidth'

function NumberValue({ name, value, onChange }: {
  name: NumberProperty
  value: number
  onChange: (name: NumberProperty, value: number) => void
}) {
  return (
    <input
      className="code-value code-number"
      type="number"
      min="0"
      max={name === 'frequency' ? '3' : '1'}
      step={name === 'bandWidth' || name === 'noise' ? '0.01' : '0.05'}
      value={value}
      aria-label={name}
      onChange={(event) => {
        const next = Number(event.target.value)
        if (Number.isFinite(next)) onChange(name, Math.max(0, Math.min(name === 'frequency' ? 3 : 1, next)))
      }}
    />
  )
}

export default function CodePlayground({ settings, activePreset, onPresetChange, onSettingsChange, dotSpacing, glowRadius, onDotSpacingChange, onGlowRadiusChange }: CodePlaygroundProps) {
  const [snippet, setSnippet] = useState<'ColorBends' | 'DotField'>('ColorBends')

  const updateNumber = (name: NumberProperty, value: number) => onSettingsChange({ [name]: value })

  return (
    <div className="code-window w-full max-w-[520px] overflow-hidden rounded-[14px]">
      <div className="code-titlebar flex items-center justify-between px-2 py-1.5">
        <div className="code-tabs flex items-center" role="tablist" aria-label="Demo component">
          {(['ColorBends', 'DotField'] as const).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={snippet === item} className={snippet === item ? 'active' : ''} onClick={() => setSnippet(item)}>{item}</button>
          ))}
        </div>
        <div className="flex items-center">
          {activePreset === null && (
            <button type="button" className="code-reset" onClick={() => onPresetChange(0)} aria-label="Reset to default preset" title="Reset to default preset"><RotateCcw size={14} /></button>
          )}
        </div>
      </div>

      <div className="code-body min-h-[395px] overflow-x-auto px-5 py-5 sm:px-6">
        <div className="code-content font-mono text-[12px] leading-[1.86] sm:text-[13px]">
          <div><span className="code-purple">import</span> <span className="code-white">{'{ '}</span><span className="code-yellow">{snippet}</span><span className="code-white">{' } '}</span><span className="code-purple">from</span> <span className="code-green">'@components/{snippet}'</span><span className="code-white">;</span></div>
          <div className="h-5" />
          <div><span className="code-purple">function</span> <span className="code-blue">App</span><span className="code-white">() {'{'}</span></div>
          <div className="pl-4"><span className="code-purple">return</span> <span className="code-white">(</span></div>
          <div className="pl-8"><span className="code-yellow">{'<' + snippet}</span></div>
          {snippet === 'ColorBends' ? (
            <>
              <div className="pl-12"><span className="code-blue">color</span><span className="code-white">=</span><label className="code-color-label"><span className="code-color-swatch" style={{ background: settings.color }} /><span className="code-green">"{settings.color.toUpperCase()}"</span><input type="color" value={settings.color} onChange={(event) => onSettingsChange({ color: event.target.value })} aria-label="Change animation color" /></label></div>
              {(['speed', 'frequency', 'noise', 'bandWidth'] as const).map((name) => (
                <div className="pl-12" key={name}><span className="code-blue">{name}</span><span className="code-white">={'{'}</span><NumberValue name={name} value={settings[name]} onChange={updateNumber} /><span className="code-white">{'}'}</span></div>
              ))}
              <div className="pl-12"><span className="code-blue">rotation</span><span className="code-white">={'{90}'}</span></div>
              <div className="pl-12"><span className="code-blue">fadeTop</span><span className="code-white">={'{0.75}'}</span></div>
              <div className="pl-12"><span className="code-blue">intensity</span><span className="code-white">={'{1.25}'}</span></div>
            </>
          ) : (
            <>
              <div className="pl-12"><span className="code-blue">dotRadius</span><span className="code-white">={'{1.5}'}</span></div>
              <div className="pl-12"><span className="code-blue">dotSpacing</span><span className="code-white">={'{'}</span><input className="code-value code-number" type="number" min="8" max="40" value={dotSpacing} aria-label="dotSpacing" onChange={(event) => onDotSpacingChange(Math.min(40, Math.max(8, Number(event.target.value))))} /><span className="code-white">{'}'}</span></div>
              <div className="pl-12"><span className="code-blue">glowRadius</span><span className="code-white">={'{'}</span><input className="code-value code-number" type="number" min="50" max="500" value={glowRadius} aria-label="glowRadius" onChange={(event) => onGlowRadiusChange(Math.min(500, Math.max(50, Number(event.target.value))))} /><span className="code-white">{'}'}</span></div>
              <div className="pl-12"><span className="code-blue">cursorForce</span><span className="code-white">={'{0.1}'}</span></div>
              <div className="pl-12"><span className="code-blue">bulgeOnly</span><span className="code-white">={'{true}'}</span></div>
            </>
          )}
          <div className="pl-8"><span className="code-yellow">{'/>'}</span></div>
          <div className="pl-4"><span className="code-white">)</span></div>
          <div><span className="code-white">{'}'}</span></div>
        </div>
      </div>

      <div className="code-footer flex flex-wrap items-center justify-between gap-2 px-2 pb-2 pt-1 sm:px-2">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Color presets">
          {presets.map((preset, index) => <button type="button" key={preset.name} className={`preset-button ${activePreset === index ? 'active' : ''}`} aria-pressed={activePreset === index} onClick={() => onPresetChange(index)}>{preset.name}</button>)}
        </div>
        <div className="code-hint flex items-center gap-1.5 text-[10px] text-white/30"><MoveHorizontal size={13} /> Edit highlighted values</div>
      </div>
    </div>
  )
}
