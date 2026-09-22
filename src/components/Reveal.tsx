import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ease } from '../lib/motion';

interface RevealProps {
  children: ReactNode;
  /** Seconds. Keep stagger between siblings in the 60-100ms range. */
  delay?: number;
  /** How far it travels. Small. This is a settle, not an entrance. */
  y?: number;
  blur?: boolean;
  className?: string;
  amount?: number;
}

/**
 * The page's one entrance behaviour. Under reduced motion the element is
 * simply already there: no transform, no blur, no delay chain.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = true,
  className,
  amount = 0.35,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  as?: 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Word-by-word reveal for the editorial lines. Words carry a weight change as
 * well as position, so the sentence looks like it is being set rather than
 * slid in.
 *
 * The heading itself is the element in view, never the word: each word starts
 * translated out of an `overflow-hidden` wrapper, and IntersectionObserver
 * clips a target's rect by its ancestors' overflow. Observing the word would
 * cap its visible ratio below any useful threshold and the line would never
 * appear at all.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = 'p',
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <Tag className={className}>{text}</Tag>;

  const MotionTag = motion[Tag];

  const container: Variants = {
    hidden: {},
    shown: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  const word: Variants = {
    hidden: { y: '85%', opacity: 0, fontWeight: 300 },
    shown: {
      y: '0%',
      opacity: 1,
      fontWeight: 500,
      transition: { duration: 1.05, ease: ease.out },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
