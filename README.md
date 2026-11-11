# portfolio-v2

A second, editorial portfolio: warm paper, a narrow reading column, a
handwritten signature, and project shots stacked like plates. It is deliberately
lighter than the main site — React and Vite only, no animation library, no video,
no glass.

Published at https://kashcmdd.github.io/portfolio-v2/.

## Run

```bash
npm install
npm run dev     # http://localhost:3002
npm run build
npm run preview
```

## Notes

- The content is a trimmed copy of `src/data/portfolioData.ts` from the main
  portfolio (`src/data.ts` here). Project and journal links point at the
  canonical pages there, so this site is a front door, not a second source of
  truth. Update both when a project changes.
- Fonts are self-hosted: Inter and JetBrains Mono from the main site, plus
  Caveat for the signature (SIL OFL, licence in `public/fonts/`).
- The flowers are SVG, not a photograph, and they stop moving under
  `prefers-reduced-motion`.
- The intro is skippable, leaves after five seconds, and does not mount at all
  for reduced-motion visitors.
