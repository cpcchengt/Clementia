import { site } from '../../data/site'

type BrandProps = { className?: string }

export default function Brand({ className = '' }: BrandProps) {
  return (
    <span className={`brand inline-flex items-center gap-2 ${className}`}>
      <svg className="brand-symbol" width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1.6" transform="rotate(-28 12 12)" />
        <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1.6" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1.6" transform="rotate(90 12 12)" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
      <span className="brand-wordmark">{site.name}</span>
    </span>
  )
}
