import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EnvelopeSimple, GithubLogo, InstagramLogo } from '@phosphor-icons/react';
import { Reveal } from '../components/Reveal';
import { Wordmark } from '../components/Wordmark';
import { stats } from '../lib/spots';
import { ease } from '../lib/motion';

type FormState = 'idle' | 'error' | 'noted';

export function Close() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setState(ok ? 'noted' : 'error');
  };

  return (
    <footer data-act="dusk" className="act-dusk ground relative overflow-hidden">
      {/* last light, low and from the left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 62% at 2% 104%, rgba(226,140,58,0.40) 0%, rgba(42,23,16,0) 58%), radial-gradient(90% 60% at 88% 0%, rgba(193,81,47,0.14) 0%, rgba(42,23,16,0) 60%)',
        }}
      />

      <div className="shell relative py-24 md:py-32">
        <Reveal>
          <h2
            className="display max-w-[11ch] text-[clamp(2.8rem,10vw,7rem)] leading-[0.95]"
            style={{ color: 'var(--ink)' }}
          >
            Gjej këndin tënd.
          </h2>
          <p className="gloss mt-4 text-[1.25rem]">Find your corner.</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* --- the list ------------------------------------------------ */}
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <form onSubmit={submit} noValidate className="max-w-[26rem]">
                <label
                  htmlFor="email"
                  className="block text-[0.8125rem] font-medium"
                  style={{ color: 'var(--ink-2)' }}
                >
                  Merr qoshet e reja, një herë në muaj
                </label>
                <div className="mt-2.5 flex gap-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state !== 'idle') setState('idle');
                    }}
                    aria-invalid={state === 'error'}
                    aria-describedby="email-help"
                    className="min-w-0 flex-1 rounded-full px-5 py-3 text-[0.9375rem] outline-none"
                    style={{
                      background: 'color-mix(in oklab, var(--ground-2) 90%, transparent)',
                      border: `1px solid ${state === 'error' ? '#E4703F' : 'var(--rule)'}`,
                      color: 'var(--ink)',
                    }}
                    placeholder="ti@shembull.al"
                  />
                  <button
                    type="submit"
                    className="rounded-full px-5 py-3 text-[0.875rem] font-medium whitespace-nowrap transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]"
                    style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                  >
                    Më shkruaj
                  </button>
                </div>

                <div className="mt-2.5 min-h-[2.4rem]">
                  {state === 'error' ? (
                    <p id="email-help" className="text-[0.8125rem]" style={{ color: '#E4703F' }}>
                      That address is missing something. Check it and try again.
                    </p>
                  ) : state === 'noted' ? (
                    <motion.p
                      id="email-help"
                      className="text-[0.8125rem]"
                      style={{ color: 'var(--ink-2)' }}
                      initial={reduce ? false : { opacity: 0, y: 6, filter: 'blur(4px)' }}
                      animate={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.5, ease: ease.out }}
                    >
                      Read and discarded. This is a demo, so nothing was sent anywhere and no
                      address was stored.
                    </motion.p>
                  ) : (
                    <p id="email-help" className="text-[0.8125rem]" style={{ color: 'var(--ink-3)' }}>
                      Demo form. It does not submit anywhere.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>

          {/* --- what this actually is ---------------------------------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.14}>
              <h3
                className="display text-[1.25rem] leading-[1.2]"
                style={{ color: 'var(--ink)' }}
              >
                Ku e dimë këtë
              </h3>
              <p className="mt-4 text-[0.9rem] leading-[1.65]" style={{ color: 'var(--ink-2)' }}>
                {stats.total} corners compiled from public sources, the oldest of them from{' '}
                {stats.oldestSource}. Nothing here has been visited and confirmed by us, so every
                entry is marked unverified and every empty field stays empty. Antigua Specialty
                Coffee is not in the list: it closed in September 2025.
              </p>
              <p className="mt-4 text-[0.9rem] leading-[1.65]" style={{ color: 'var(--ink-3)' }}>
                The photography on this page was generated for the demo and does not show the real
                rooms. Replace it with real photographs before this goes anywhere near a visitor.
              </p>
            </Reveal>
          </div>
        </div>

        {/* --- sign-off ------------------------------------------------- */}
        <div
          className="mt-20 flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <div>
            <span className="block text-[1.75rem]" style={{ color: 'var(--ink)' }}>
              <Wordmark animate={false} />
            </span>
            <p className="mt-2 text-[0.8125rem]" style={{ color: 'var(--ink-3)' }}>
              Tiranë · {stats.total} qoshe · të dhëna publike, të paverifikuara
            </p>
          </div>

          <ul className="m-0 flex list-none items-center gap-5 p-0">
            {[
              { href: 'https://www.instagram.com/', label: 'Instagram', Icon: InstagramLogo },
              { href: 'mailto:tungjatjeta@neqoshe.al', label: 'Email', Icon: EnvelopeSimple },
              { href: 'https://github.com/', label: 'GitHub', Icon: GithubLogo },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full no-underline transition-colors duration-200"
                  style={{ border: '1px solid var(--rule)', color: 'var(--ink-2)' }}
                >
                  <Icon size={18} weight="light" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
