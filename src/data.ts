/**
 * Content for the second portfolio.
 *
 * It is a trimmed copy of the main site's data: the home page only needs the
 * project list and the latest writing, not the case-study bodies. The links
 * point at the canonical pages on kashcmdd.github.io/portfolio, so this site
 * stays a front door rather than a second source of truth.
 */

export const profile = {
  name: 'kashhcmd',
  display: 'KashhCMD',
  github: 'https://github.com/kashcmdd',
  portfolio: 'https://kashcmdd.github.io/portfolio/',
  discord: 'https://discord.com/users/1415420243836407878',
};

export interface ProjectEntry {
  id: string;
  title: string;
  meta: string;
  image: string;
  tint: string;
  href: string;
}

export const projects: ProjectEntry[] = [
  {
    id: 'rainbow-leaderboard',
    title: 'Rainbow Leaderboard',
    meta: 'ELO-ranked ladder · FastAPI + PostgreSQL',
    image: 'images/rainbow-leaderboard.webp',
    tint: '#a91237',
    href: 'https://kashcmdd.github.io/portfolio/projects/rainbow-leaderboard/',
  },
  {
    id: 'scriptforge',
    title: 'ScriptForge',
    meta: 'Controller-script hub · Next.js + SQLite',
    image: 'images/scriptforge-cover.jpg',
    tint: '#2f6fed',
    href: 'https://kashcmdd.github.io/portfolio/projects/scriptforge/',
  },
  {
    id: 'discord-music-bot',
    title: 'Discord Music Bot',
    meta: 'Lavalink pipeline · 25+ commands',
    image: 'images/discord-music-bot-cover.jpg',
    tint: '#5b3fd4',
    href: 'https://kashcmdd.github.io/portfolio/projects/discord-music-bot/',
  },
  {
    id: 'melon',
    title: 'Melon',
    meta: 'Maintained community bot · PostgreSQL',
    image: 'images/melon.webp',
    tint: '#8fd6a0',
    href: 'https://kashcmdd.github.io/portfolio/projects/melon/',
  },
  {
    id: 'kashhcmd-portfolio',
    title: 'KashhCMD Portfolio',
    meta: 'This site’s bigger sibling · React + Vite',
    image: 'images/portfolio-site.webp',
    tint: '#c9b6e8',
    href: 'https://kashcmdd.github.io/portfolio/projects/kashhcmd-portfolio/',
  },
  {
    id: 'nebula',
    title: 'Nebula',
    meta: 'Self-hosted bot with 70+ AI tools',
    image: 'images/nebula-cover.jpg',
    tint: '#6c5ce7',
    href: 'https://kashcmdd.github.io/portfolio/projects/nebula/',
  },
];

export interface WritingEntry {
  title: string;
  date: string;
  href: string;
}

export const writing: WritingEntry[] = [
  {
    title: 'A Seasonal Theme Without a Rewrite',
    date: 'Oct 2026',
    href: 'https://kashcmdd.github.io/portfolio/journal/seasonal-theme/',
  },
  {
    title: 'Cutting 59% Off My Portfolio’s JavaScript',
    date: 'Sep 2026',
    href: 'https://kashcmdd.github.io/portfolio/journal/bundle-splitting/',
  },
  {
    title: 'SQLite Is Fine Until It Isn’t',
    date: 'Sep 2026',
    href: 'https://kashcmdd.github.io/portfolio/journal/sqlite-postgres/',
  },
];
