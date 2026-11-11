import React from 'react';

/**
 * The soft floral background.
 *
 * The flowers are drawn as SVG rather than shipped as a photograph: the palette
 * stays editable, the layer costs a few kilobytes, and nothing is a copyrighted
 * asset. Depth comes from three bands — large, heavily blurred shapes at the
 * edges, medium ones mid-frame, and a few small sharp ones for sparkle.
 *
 * They sit behind the content with `pointer-events: none` and stop moving under
 * `prefers-reduced-motion`.
 */

type FlowerSpec = {
  left: string;
  top: string;
  size: number;
  color: string;
  blur: number;
  opacity: number;
  rotate: number;
  delay: number;
};

const FLOWERS: FlowerSpec[] = [
  // Edges, out of focus.
  { left: '-6%', top: '4%', size: 320, color: '#ff8a2a', blur: 26, opacity: 0.26, rotate: -12, delay: -6 },
  { left: '78%', top: '-4%', size: 340, color: '#ff9b45', blur: 30, opacity: 0.22, rotate: 18, delay: -12 },
  { left: '-8%', top: '42%', size: 260, color: '#ffb05e', blur: 24, opacity: 0.2, rotate: 8, delay: -3 },
  { left: '82%', top: '50%', size: 300, color: '#ff7a1a', blur: 28, opacity: 0.22, rotate: -20, delay: -9 },
  { left: '4%', top: '82%', size: 280, color: '#ffa94d', blur: 26, opacity: 0.2, rotate: 24, delay: -15 },
  { left: '74%', top: '88%', size: 320, color: '#ff8a2a', blur: 30, opacity: 0.18, rotate: -6, delay: -2 },

  // Mid-frame.
  { left: '10%', top: '18%', size: 120, color: '#ff7a18', blur: 9, opacity: 0.4, rotate: 12, delay: -5 },
  { left: '70%', top: '16%', size: 140, color: '#ff9d4d', blur: 10, opacity: 0.36, rotate: -14, delay: -11 },
  { left: '6%', top: '62%', size: 110, color: '#ff8a2a', blur: 8, opacity: 0.34, rotate: 20, delay: -7 },
  { left: '76%', top: '36%', size: 96, color: '#ffb872', blur: 7, opacity: 0.35, rotate: -8, delay: -1 },
  { left: '66%', top: '70%', size: 130, color: '#ff7a18', blur: 9, opacity: 0.3, rotate: 16, delay: -13 },
  { left: '16%', top: '92%', size: 100, color: '#ff9b45', blur: 7, opacity: 0.28, rotate: -22, delay: -4 },

  // Small, sharper accents.
  { left: '22%', top: '21%', size: 46, color: '#ff7a18', blur: 2, opacity: 0.5, rotate: 8, delay: -8 },
  { left: '62%', top: '9%', size: 38, color: '#ff9d4d', blur: 1.5, opacity: 0.55, rotate: -16, delay: -2 },
  { left: '4%', top: '34%', size: 52, color: '#ff8a2a', blur: 2.5, opacity: 0.45, rotate: 26, delay: -12 },
  { left: '86%', top: '66%', size: 44, color: '#ff7a18', blur: 2, opacity: 0.5, rotate: -6, delay: -6 },
  { left: '38%', top: '96%', size: 40, color: '#ffb872', blur: 1.5, opacity: 0.45, rotate: 14, delay: -10 },
  { left: '70%', top: '94%', size: 56, color: '#ff8a2a', blur: 3, opacity: 0.4, rotate: -24, delay: -14 },
];

const Flower: React.FC<{ spec: FlowerSpec }> = ({ spec }) => (
  <span
    className="petal"
    style={{
      left: spec.left,
      top: spec.top,
      width: spec.size,
      height: spec.size,
      opacity: spec.opacity,
      animationDelay: `${spec.delay}s`,
    }}
  >
    <svg
      viewBox="0 0 100 100"
      width={spec.size}
      height={spec.size}
      style={{ transform: `rotate(${spec.rotate}deg)`, filter: `blur(${spec.blur}px)` }}
      aria-hidden="true"
      focusable="false"
    >
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="27"
          rx="15.5"
          ry="22"
          fill={spec.color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  </span>
);

export const Petals: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`petals ${className}`.trim()} aria-hidden="true">
    {FLOWERS.map((spec, index) => (
      <Flower key={index} spec={spec} />
    ))}
  </div>
);
