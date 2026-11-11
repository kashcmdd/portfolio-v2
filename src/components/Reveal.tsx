import React from 'react';

/**
 * A paragraph whose words arrive one at a time.
 *
 * This is how the reference site opens: not a title card in front of the page,
 * but the page itself resolving from blurred words into sentences. Each word
 * gets an index so CSS can stagger it; each paragraph gets a base delay so the
 * paragraphs follow one another instead of all starting together.
 *
 * Inline pieces — a chip, a link, an italic phrase — are single atoms rather
 * than being exploded into words, because splitting them would break the
 * markup and the sentence around them.
 */
export type Atom = string | React.ReactElement;

export const Reveal: React.FC<{
  atoms: Atom[];
  base?: number;
  className?: string;
  as?: 'p' | 'div';
}> = ({ atoms, base = 0, className, as = 'p' }) => {
  let index = 0;
  const nodes: React.ReactNode[] = [];

  atoms.forEach((atom, atomIndex) => {
    if (typeof atom === 'string') {
      // Keep the whitespace between words as real text nodes so the spacing is
      // unchanged while the spans are still invisible.
      atom.split(/(\s+)/).forEach((chunk, chunkIndex) => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) {
          nodes.push(' ');
          return;
        }
        nodes.push(
          <span
            key={`${atomIndex}-${chunkIndex}`}
            className="word"
            style={{ '--i': index++, '--base': `${base}ms` } as React.CSSProperties}
          >
            {chunk}
          </span>
        );
      });
      return;
    }

    nodes.push(
      <span
        key={`atom-${atomIndex}`}
        className="word word--atom"
        style={{ '--i': index++, '--base': `${base}ms` } as React.CSSProperties}
      >
        {atom}
      </span>
    );
  });

  const Tag = as;
  return <Tag className={className}>{nodes}</Tag>;
};
