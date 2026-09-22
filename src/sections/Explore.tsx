import type { ReactNode } from 'react';
import { SpotCard } from '../components/SpotCard';
import { Reveal, WordReveal } from '../components/Reveal';
import { groupSpots, moodGroups, stats } from '../lib/spots';

function GroupHead({ sq, en, note }: { sq: string; en: string; note: string }) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <h3
          className="display text-[clamp(1.6rem,3.6vw,2.5rem)] leading-[1.08]"
          style={{ color: 'var(--ink)' }}
        >
          {sq}
        </h3>
        <p className="gloss mt-2 text-[1.05rem]">{en}</p>
      </div>
      <p
        className="max-w-[34ch] text-[0.9rem] leading-[1.55] md:text-right"
        style={{ color: 'var(--ink-2)' }}
      >
        {note}
      </p>
    </header>
  );
}

function Group({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      className="py-14 first:pt-0 last:pb-0 md:py-20 md:last:pb-0"
      style={{ borderTop: '1px solid var(--rule)' }}
      aria-labelledby={`group-${id}`}
    >
      {children}
    </section>
  );
}

export function Explore() {
  const [deep, books, specialty, slow, night] = moodGroups;

  return (
    <section id="qoshet" data-act="night" className="act-night ground relative">
      <div className="shell pt-12 pb-4 md:pt-16 md:pb-6">
        <div className="mb-14 max-w-[46rem] md:mb-20">
          <WordReveal
            as="h2"
            text="Qoshet, sipas asaj që kërkon."
            className="display text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.03]"
          />
          <Reveal delay={0.12}>
            <p className="body-lg mt-6">
              {stats.total} places across {stats.neighborhoods} parts of Tirana, grouped by what
              the afternoon is actually for. Tap any corner for the full reading.
            </p>
          </Reveal>
        </div>

        {/* 1 / asymmetric: one room you can settle into, two you can fall back on */}
        <Group id={deep.id}>
          <div id={`group-${deep.id}`}>
            <GroupHead {...deep} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
            <SpotCard
              spot={groupSpots(deep)[0]}
              ratio="tall"
              index={0}
              className="md:col-span-7"
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 md:gap-6">
              {groupSpots(deep)
                .slice(1)
                .map((s, i) => (
                  <SpotCard key={s.id} spot={s} ratio="wide" index={i + 1} />
                ))}
            </div>
          </div>
        </Group>

        {/* 2 / three across, stepped down the page so the eye walks the shelf */}
        <Group id={books.id}>
          <div id={`group-${books.id}`}>
            <GroupHead {...books} />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {groupSpots(books).map((s, i) => (
              <SpotCard
                key={s.id}
                spot={s}
                ratio="portrait"
                index={i}
                className={i === 1 ? 'sm:mt-14' : i === 2 ? 'sm:mt-7' : undefined}
              />
            ))}
          </div>
        </Group>

        {/* 3 / a track you push through: this group is about breadth */}
        <Group id={specialty.id}>
          <div id={`group-${specialty.id}`}>
            <GroupHead {...specialty} />
          </div>
          <div className="-mx-[var(--gutter)]">
            <ul
              className="m-0 flex list-none snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:thin]"
              aria-label={specialty.en}
            >
              {groupSpots(specialty).map((s, i) => (
                <li
                  key={s.id}
                  className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23rem]"
                >
                  <SpotCard spot={s} ratio="portrait" index={i} />
                </li>
              ))}
            </ul>
          </div>
        </Group>

        {/* 4 / two wide rooms, one dropped */}
        <Group id={slow.id}>
          <div id={`group-${slow.id}`}>
            <GroupHead {...slow} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
            {groupSpots(slow).map((s, i) => (
              <SpotCard
                key={s.id}
                spot={s}
                ratio="wide"
                index={i}
                className={i === 1 ? 'md:mt-16' : undefined}
              />
            ))}
          </div>
        </Group>

        {/* 5 / the last pair, given room, on the darkest ground of the page */}
        <Group id={night.id}>
          <div id={`group-${night.id}`}>
            <GroupHead {...night} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
            {groupSpots(night).map((s, i) => (
              <SpotCard key={s.id} spot={s} ratio="letterbox" index={i} />
            ))}
          </div>
        </Group>
      </div>
    </section>
  );
}
