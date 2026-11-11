import React from 'react';

/**
 * The two controls under the reveal.
 *
 * `Fast forward` drops the stagger and finishes the sequence in about a second;
 * `Skip` snaps every word to its final state. They are different speeds of the
 * same idea rather than two unrelated buttons.
 */
export const IntroControls: React.FC<{
  onFastForward: () => void;
  onSkip: () => void;
}> = ({ onFastForward, onSkip }) => (
  <div className="intro-bar" role="group" aria-label="Introduction controls">
    <button type="button" className="intro-button" onClick={onFastForward}>
      <span aria-hidden="true">▶▶</span>
      Fast forward
    </button>
    <span className="intro-divider" aria-hidden="true" />
    <button type="button" className="intro-button" onClick={onSkip}>
      Skip
    </button>
  </div>
);
