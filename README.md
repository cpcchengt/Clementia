# Beatrix

A React + TypeScript + Tailwind CSS (v4) + pnpm starter for the Beatrix landing page. The page is split into `SiteHeader`, `Hero`, `CodePlayground`, and `SiteFooter`, so more sections can be inserted in `src/App.tsx` without changing the existing sections. Navigation labels, calls to action, and footer items are visual placeholders with no destinations.

## Run locally

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
pnpm lint
```

## Project structure

- `src/components/layout/`: navigation and footer
- `src/components/hero/`: hero and interactive code playground
- `src/components/effects/`: locally owned animation component source
- `src/data/site.ts`: navigation, footer, and visual presets
- `src/styles.css`: Tailwind entry, design tokens, and visual effects

The `FadeContent` component is adapted from React Bits. The source attribution remains in the component comment. Beatrix's page UI contains no navigation links.
