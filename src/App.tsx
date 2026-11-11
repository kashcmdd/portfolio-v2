import React, { useEffect, useState } from 'react';
import { IntroControls } from './components/IntroControls';
import { Petals } from './components/Petals';
import { Reveal } from './components/Reveal';
import { profile, projects, writing } from './data';

const Asterisk: React.FC<{ className?: string }> = ({ className = 'icon' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2.6v18.8M3.9 7.3l16.2 9.4M20.1 7.3 3.9 16.7" />
    </g>
  </svg>
);

const Sun: React.FC = () => (
  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </g>
  </svg>
);

const Moon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" focusable="false">
    <path
      d="M20.3 14.6A8.4 8.4 0 0 1 9.4 3.7a8.4 8.4 0 1 0 10.9 10.9Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

type Phase = 'intro' | 'reveal' | 'done';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const INTRO_HOLD = 2200;
const REVEAL_LENGTH = 4400;
const FAST_REVEAL = 1400;

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
      ? 'dark'
      : 'light'
  );

  // The page is the intro: the signature writes itself, then the copy arrives
  // word by word and the chrome follows. `done` is the ordinary, scrollable
  // state, and reduced-motion visitors start there.
  const [phase, setPhase] = useState<Phase>(() => (reducedMotion() ? 'done' : 'intro'));
  const [fast, setFast] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem('v2-theme', theme);
    } catch {
      /* storage can be blocked; the attribute above still applies for this visit */
    }
  }, [theme]);

  useEffect(() => {
    if (phase !== 'intro') return;
    const timer = window.setTimeout(() => setPhase('reveal'), INTRO_HOLD);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const timer = window.setTimeout(() => setPhase('done'), fast ? FAST_REVEAL : REVEAL_LENGTH);
    return () => window.clearTimeout(timer);
  }, [phase, fast]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', phase !== 'done');
    return () => document.body.classList.remove('is-locked');
  }, [phase]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Petals />

      <div className="shell" data-phase={phase} data-speed={fast ? 'fast' : undefined}>
        <header className="header">
          <div className="header-inner">
            <a className="mark" href="#top" aria-label="KashhCMD, back to top">
              <Asterisk />
            </a>
            <nav className="nav" aria-label="Primary">
              <a href="#work">Projects</a>
              <a href="#writing">Writing</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <button
                type="button"
                className="theme-toggle"
                onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
                aria-label={
                  theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'
                }
              >
                {theme === 'dark' ? <Moon /> : <Sun />}
              </button>
            </nav>
          </div>
        </header>

        <main className="page" id="main">
          <span id="top" />

          <section className="intro-block" aria-labelledby="portfolio-name">
            <h1 id="portfolio-name" className="name">
              <span className="name-text">{profile.name}</span>
            </h1>

            <Reveal
              className="greeting"
              atoms={[
                'hey ',
                <span key="wave" className="emoji" aria-hidden="true">
                  👋
                </span>,
              ]}
            />

            <div className="copy">
              <Reveal
                base={350}
                atoms={[
                  'I’ve been building for the web for as long as I can remember — starting with ',
                  <span key="bots" className="phrase">
                    Discord bots
                  </span>,
                  ' for servers I was in, then the APIs, dashboards and databases behind them. I’m self-taught, and I still learn by shipping.',
                ]}
              />
              <Reveal
                base={1250}
                atoms={[
                  'My main project is ',
                  <span key="nebula" className="phrase">
                    Nebula
                  </span>,
                  ', a self-hosted Discord bot with ',
                  <mark key="tools">70+ tools</mark>,
                  ' that can read and change a live server. Around it I maintain ',
                  <span key="melon" className="phrase">
                    Melon
                  </span>,
                  ', built a ',
                  <a
                    key="ladder"
                    href="https://kashcmdd.github.io/portfolio/projects/rainbow-leaderboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rainbow Six ladder
                  </a>,
                  ', and keep a ',
                  <em key="journal" className="pink">
                    journal
                  </em>,
                  ' about the decisions behind the code.',
                ]}
              />
              <Reveal
                base={2300}
                atoms={[
                  'I care about the parts people don’t see: bundle budgets, accessible dialogs, and pages that work with JavaScript switched off.',
                ]}
              />
              <Reveal base={3050} atoms={['Here’s some of what I’ve made.']} />
            </div>
          </section>

          <section className="section" id="work" aria-labelledby="work-heading">
            <div className="section-head">
              <h2 id="work-heading" className="section-title">
                Projects
              </h2>
              <a
                className="section-link"
                href={`${profile.portfolio}projects/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                See all 6
              </a>
            </div>

            <ul className="work-list">
              {projects.map((project) => (
                <li key={project.id} className="work-item">
                  <a
                    className="work-link"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} — open the case study`}
                  >
                    <span className="work-frame" style={{ background: project.tint }}>
                      <img src={project.image} alt={`Preview of ${project.title}`} loading="lazy" />
                    </span>
                    <span className="work-caption">
                      <span className="work-name">{project.title}</span>
                      <span className="work-meta">{project.meta}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="section" id="writing" aria-labelledby="writing-heading">
            <div className="section-head">
              <h2 id="writing-heading" className="section-title">
                Writing
              </h2>
              <a
                className="section-link"
                href={`${profile.portfolio}journal/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the journal
              </a>
            </div>

            <ul className="writing-list">
              {writing.map((entry) => (
                <li key={entry.href} className="writing-item">
                  <a href={entry.href} target="_blank" rel="noopener noreferrer">
                    {entry.title}
                  </a>
                  <span className="writing-date">{entry.date}</span>
                </li>
              ))}
            </ul>
          </section>

          <footer className="footer">
            <p className="signature signature--footer">kashhcmd</p>
            <div className="footer-links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                github.com/kashcmdd
              </a>
              <a href={`${profile.portfolio}#contact`} target="_blank" rel="noopener noreferrer">
                say hello
              </a>
            </div>
          </footer>
        </main>
      </div>

      {phase !== 'done' && (
        <IntroControls
          onFastForward={() => {
            setFast(true);
            setPhase('reveal');
          }}
          onSkip={() => setPhase('done')}
        />
      )}
    </>
  );
};
