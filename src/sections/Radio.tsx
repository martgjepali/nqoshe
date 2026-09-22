import { useState } from 'react';
import { MusicNotes, Play, Stop } from '@phosphor-icons/react';

/* ---------------------------------------------------------------------------
   Stations. Each is a YouTube 24/7 live stream, embedded only once you press
   play: nothing is requested from YouTube before then.

   To add one: open the live stream on YouTube and copy the id out of the URL
   (`youtube.com/watch?v=THIS_PART`), then give it a name in both languages.
--------------------------------------------------------------------------- */
interface Station {
  id: string;
  /** YouTube video id of a 24/7 live stream. */
  video: string;
  sq: string;
  en: string;
}

const STATIONS: Station[] = [{ id: 'radio', video: 'rFZHOHl-L8A', sq: 'Radio', en: '24/7 live' }];

export function Radio() {
  const [playing, setPlaying] = useState<Station | null>(null);

  return (
    <section id="radio" data-act="night" className="act-night relative" style={{ background: 'var(--ground-2)' }}>
      <div className="shell grid grid-cols-1 items-center gap-8 py-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2
            className="display-lg flex items-center gap-3"
            style={{ color: 'var(--ink)' }}
          >
            <MusicNotes size={26} weight="fill" style={{ color: 'var(--accent)' }} />
            Vër pak muzikë.
          </h2>
          <p className="gloss mt-1.5 text-body">Put something on while you look.</p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {STATIONS.map((s) => {
              const on = playing?.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setPlaying(on ? null : s)}
                  aria-pressed={on}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-ui font-medium transition-[transform,background-color,color] duration-200 ease-light active:scale-[0.96]"
                  style={{
                    background: on ? 'var(--accent)' : 'transparent',
                    color: on ? 'var(--on-accent)' : 'var(--ink-2)',
                    border: `1px solid ${on ? 'var(--accent)' : 'var(--rule)'}`,
                  }}
                >
                  {on ? <Stop size={16} weight="fill" /> : <Play size={16} weight="fill" />}
                  {s.sq}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-small" style={{ color: 'var(--ink-3)' }}>
            {playing
              ? `${playing.en} · streaming live from YouTube.`
              : 'Nothing loads from YouTube until you press play.'}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{ background: '#120C07', border: '1px solid var(--rule)' }}
          >
            {playing ? (
              <iframe
                key={playing.video}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${playing.video}?autoplay=1&rel=0`}
                title={`${playing.sq} — ${playing.en}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <MusicNotes size={32} style={{ color: 'var(--ink-3)' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
