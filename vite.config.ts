import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is a GitHub Pages project site, so every asset URL is rooted at
// /portfolio-v2/. Keep this in sync with the workflow's base path.
export default defineConfig({
  base: '/portfolio-v2/',
  plugins: [react()],
});
