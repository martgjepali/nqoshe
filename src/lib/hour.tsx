import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export const HOUR_MIN = 6;
export const HOUR_MAX = 24;

interface HourValue {
  hour: number;
  setHour: (h: number) => void;
  /** True once the visitor has moved it themselves. */
  touched: boolean;
  /** The hour it was on when the page opened. */
  initial: number;
}

const HourContext = createContext<HourValue | null>(null);

const clampHour = (h: number) => Math.min(HOUR_MAX, Math.max(HOUR_MIN, h));

function nowInTirana(): number {
  // The demo has no timezone data, so this is the visitor's own clock. It is
  // the right default anyway: they are deciding where to go now.
  const d = new Date();
  return clampHour(d.getHours() + d.getMinutes() / 60);
}

/**
 * The hour is a control, not a scroll position. The visitor sets it, and the
 * light on the table, the ground of the finder and which places count as open
 * all read from this one value.
 */
export function HourProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(nowInTirana, []);
  const [hour, setHourRaw] = useState(initial);
  const [touched, setTouched] = useState(false);

  const value = useMemo<HourValue>(
    () => ({
      hour,
      initial,
      touched,
      setHour: (h: number) => {
        setHourRaw(clampHour(h));
        setTouched(true);
      },
    }),
    [hour, initial, touched],
  );

  return <HourContext.Provider value={value}>{children}</HourContext.Provider>;
}

export function useHour(): HourValue {
  const ctx = useContext(HourContext);
  if (!ctx) throw new Error('useHour must be used inside <HourProvider>');
  return ctx;
}

export const formatHour = (h: number) => {
  const hours = Math.floor(h) % 24;
  const minutes = Math.floor((h % 1) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/** Dark after the sun is down. Drives the finder's act. */
export const isDark = (h: number) => h >= 18.5 || h < 6.6;
