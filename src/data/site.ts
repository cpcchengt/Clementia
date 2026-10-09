export const site = {
  name: 'Beatrix',
} as const

export const navigation = ['Docs', 'Tools', 'Pro', 'Sponsors'] as const

export const footerGroups = [
  {
    title: 'Product',
    items: ['Docs', 'Showcase', 'Sponsors'],
  },
  {
    title: 'Community',
    items: ['GitHub', 'Updates', 'Contact'],
  },
] as const

export type Preset = {
  name: string
  color: string
  speed: number
  frequency: number
  noise: number
  bandWidth: number
}

export const presets: Preset[] = [
  { name: 'Nebula', color: '#A855F7', speed: 0.2, frequency: 1, noise: 0.15, bandWidth: 0.14 },
  { name: 'Aurora', color: '#10B981', speed: 0.35, frequency: 1.5, noise: 0.08, bandWidth: 0.3 },
  { name: 'Ember', color: '#F97316', speed: 0.4, frequency: 1.8, noise: 0.18, bandWidth: 0.22 },
  { name: 'Ice', color: '#06B6D4', speed: 0.15, frequency: 1.2, noise: 0.06, bandWidth: 0.4 },
]
