import { motion, useReducedMotion } from 'motion/react';
import { ease } from '../lib/motion';

const LETTERS = Array.from('Nëqoshe');

interface WordmarkProps {
  className?: string;
  /** Seconds before the first letter lands. */
  delay?: number;
  animate?: boolean;
}

/**
 * The letters do not slide in. They come up in weight as though light were
 * crossing them left to right: 200 to 520 on the variable axis, with the
 * blur clearing a beat behind. The ë keeps its diaeresis at every weight.
 */
export function Wordmark({ className, delay = 0, animate = true }: WordmarkProps) {
  const reduce = useReducedMotion();
  const still = reduce || !animate;

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.035em',
        display: 'inline-flex',
        lineHeight: 0.92,
        paddingBottom: '0.06em',
      }}
    >
      <span className="sr-only">Nëqoshe</span>
      {LETTERS.map((letter, i) => (
        <motion.span
          aria-hidden
          key={`${letter}-${i}`}
          initial={
            still
              ? false
              : { opacity: 0, fontWeight: 200, filter: 'blur(14px)', y: '0.06em' }
          }
          animate={
            still
              ? undefined
              : { opacity: 1, fontWeight: 520, filter: 'blur(0px)', y: '0em' }
          }
          style={still ? { fontWeight: 520 } : undefined}
          transition={{
            duration: 1.5,
            delay: delay + i * 0.075,
            ease: ease.out,
            filter: { duration: 1.8, delay: delay + i * 0.075 + 0.12, ease: ease.out },
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}
