import { Coffee, EnvelopeSimple, GithubLogo, InstagramLogo } from '@phosphor-icons/react';
import { Wordmark } from '../components/Wordmark';
import { stats } from '../lib/spots';

/**
 * The café-culture note and the sign-off, together. One short block of the
 * thing a visitor genuinely needs to know, then the provenance, then out.
 */
export function Close() {
  return (
    <footer data-act="dusk" className="act-dusk ground relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 60% at 2% 104%, rgba(226,140,58,0.38) 0%, rgba(69,33,15,0) 58%)',
        }}
      />

      <div className="shell relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2
              className="display-lg flex items-start gap-3"
              style={{ color: 'var(--ink)' }}
            >
              <Coffee size={26} weight="fill" className="mt-1 shrink-0" style={{ color: 'var(--accent)' }} />
              Rregulli i vetëm: porosit diçka çdo dy orë.
            </h2>
            <p className="gloss mt-2 text-body">
              The only rule: order something every couple of hours.
            </p>
            <p className="body-lg mt-5 text-body">
              Nobody will move you along. A coffee is one or two euro and it buys the table for as
              long as you want it. Three hours alone with a laptop is not eccentric here, it is what
              an afternoon is for.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="display text-lead" style={{ color: 'var(--ink)' }}>
              Ku e dimë këtë
            </h3>
            <p className="gloss mt-1.5 text-ui">Where this comes from</p>
            <p className="mt-4 text-ui leading-[1.65]" style={{ color: 'var(--ink-2)' }}>
              {stats.total} corners compiled from public sources, the oldest from{' '}
              {stats.oldestSource}. Nothing has been visited and confirmed by us, so every entry is
              unverified and every empty field stays empty. Antigua Specialty Coffee is not in the
              list: it closed in September 2025.
            </p>
            <p className="mt-3 text-ui leading-[1.65]" style={{ color: 'var(--ink-3)' }}>
              The photography was generated for this demo and does not show the real rooms.
            </p>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <div>
            <span className="mark-sm block" style={{ color: 'var(--ink)' }}>
              <Wordmark animate={false} />
            </span>
            <p className="mt-2 text-small" style={{ color: 'var(--ink-3)' }}>
              Tiranë · të dhëna publike, të paverifikuara
            </p>
          </div>

          <ul className="m-0 flex list-none items-center gap-3 p-0">
            {[
              { href: 'https://www.instagram.com/', label: 'Instagram', Icon: InstagramLogo },
              { href: 'mailto:tungjatjeta@neqoshe.al', label: 'Email', Icon: EnvelopeSimple },
              { href: 'https://github.com/', label: 'GitHub', Icon: GithubLogo },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full no-underline transition-[transform,border-color] duration-200 ease-light hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--rule)', color: 'var(--ink-2)' }}
                >
                  <Icon size={19} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
