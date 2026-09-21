import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
 * Word-by-word reveal for the editorial lines. Words carry a weight change
 * as well as position, so the sentence looks like it is being set rather
 * than being slid in.
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

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '85%', opacity: 0, fontWeight: 300 }}
            whileInView={{ y: '0%', opacity: 1, fontWeight: 500 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 1.05,
              delay: delay + i * stagger,
              ease: ease.out,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
