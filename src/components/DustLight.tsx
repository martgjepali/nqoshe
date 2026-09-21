import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Mote {
  x: number;
  y: number;
  z: number;
  r: number;
  drift: number;
  phase: number;
}

/**
 * Dust in a sunbeam. Canvas 2D on purpose: it is the first thing that moves
 * on the page and it must cost almost nothing before the hero has painted.
 * Motes rise, wander on a slow sine, and parallax against the cursor by depth.
 */
export function DustLight({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let motes: Mote[] = [];
    let frame = 0;
    let running = true;
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.round((width * height) / 14000);
      const count = Math.max(24, Math.min(110, density));
      motes = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: 0.5 + z * 1.9,
          drift: (0.09 + Math.random() * 0.22) * z,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const draw = (time: number) => {
      if (!running) return;
      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const t = time * 0.001;
      for (const m of motes) {
        m.y -= m.drift;
        if (m.y < -8) {
          m.y = height + 8;
          m.x = Math.random() * width;
        }
        const wander = Math.sin(t * 0.32 + m.phase) * 16 * m.z;
        const px = m.x + wander - eased.x * 46 * m.z;
        const py = m.y - eased.y * 26 * m.z;
        const alpha = 0.1 + m.z * 0.3;

        const g = ctx.createRadialGradient(px, py, 0, px, py, m.r * 5);
        g.addColorStop(0, `rgba(255, 226, 172, ${alpha})`);
        g.addColorStop(0.45, `rgba(216, 154, 74, ${alpha * 0.32})`);
        g.addColorStop(1, 'rgba(216, 154, 74, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, m.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      frame = requestAnimationFrame(draw);
    };

    build();
    frame = requestAnimationFrame(draw);

    const resize = new ResizeObserver(build);
    resize.observe(canvas);
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Stop burning frames once the beam has scrolled away.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, [reduce]);

  if (reduce) return null;

  return <canvas ref={ref} aria-hidden className={className} />;
}
