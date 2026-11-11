import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Petals } from './Petals';

/**
 * The opening beat.
 *
 * It is a short, skippable title card rather than a loader: the page is already
 * rendered behind it, and the copy says so. `Fast forward` and `Skip` do the
 * same thing — a visitor should not have to decode the difference — and the
 * card leaves on its own after six and a half seconds.
 *
 * Nothing here runs for a visitor who prefers reduced motion: App decides not
 * to mount it at all. A screen-reader visitor gets a dialog with a name and an
 * immediately focusable exit.
 */
export const Intro: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);
  const panel = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 520);
  }, [onDone]);

  useEffect(() => {
    const timer = window.setTimeout(finish, 6500);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    panel.current?.focus();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [finish]);

  return (
    <div
      ref={panel}
      className={`intro ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-label="Introduction"
      tabIndex={-1}
    >
      <Petals className="petals--intro" />
      <div className="intro-center">
        <p className="signature signature--intro">kashhcmd</p>
        <p className="intro-line">a second look at the work</p>
      </div>
      <div className="intro-controls">
        <button type="button" className="intro-button" onClick={finish}>
          <span aria-hidden="true">▶▶</span>
          Fast forward
        </button>
        <span className="intro-divider" aria-hidden="true" />
        <button type="button" className="intro-button" onClick={finish}>
          Skip
        </button>
      </div>
    </div>
  );
};
