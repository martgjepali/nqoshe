import { Reveal, WordReveal } from '../components/Reveal';
import { stats } from '../lib/spots';

interface ReadingBlock {
  sq: string;
  en: string;
  body: string;
}

const readings: ReadingBlock[] = [
  {
    sq: 'Sa e qetë',
    en: 'How quiet it is',
    body: 'Not the rating. The room. Whether you can hear the person across the table, whether the music turns at five, whether the terrace sits next to a school.',
  },
  {
    sq: 'Sa gjatë mund të rrish',
    en: 'How long you can stay',
    body: 'Opening hours, outlets, whether a laptop is welcome or merely tolerated. In Tirana nobody moves you along, and the places that mean it are worth knowing by name.',
  },
  {
    sq: 'Çfarë nuk e dimë',
    en: 'What we do not know',
    body: 'Half of these fields are empty, and we leave them empty. An unknown wifi speed is printed as unknown. Nothing here has been checked in person yet, and the page says so at every corner.',
  },
];

export function Idea() {
  return (
    <section
      id="ideja"
      data-act="dawn"
      className="act-dawn ground relative"
      style={{
        backgroundImage:
          'linear-gradient(180deg, var(--ground) 0%, var(--ground-2) 62%, var(--ground) 100%)',
      }}
    >
      <div className="shell grid grid-cols-1 gap-x-12 pt-24 pb-16 md:pt-32 md:pb-20 lg:grid-cols-12 lg:pt-40 lg:pb-24">
        {/* The statement stays; the readings move past it. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[18vh]">
            <WordReveal
              as="h2"
              text="Një qytet nuk matet me yje."
              className="display text-[clamp(2.1rem,5.6vw,3.9rem)] leading-[1.06]"
            />
            <Reveal delay={0.15}>
              <p className="gloss mt-3 text-[1.0625rem]">A city is not measured in stars.</p>
              <p className="body-lg mt-8">
                In the old habit you drain the cup, turn it over, and let the grounds settle into
                whatever they are going to say. Somebody who knows how reads it back to you.
              </p>
              <p className="body-lg mt-5">
                Nëqoshe does that with {stats.total} corners of Tirana. Not a ranking. A reading:
                what the room is like, what it costs to sit there, and what nobody has checked yet.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <ol className="m-0 list-none p-0">
            {readings.map((r, i) => (
              <li
                key={r.sq}
                className="flex min-h-[min(52vh,440px)] flex-col justify-center py-10 last:min-h-0 last:pb-0"
                style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}
              >
                <Reveal amount={0.4}>
                  <h3
                    className="display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.1]"
                    style={{ color: 'var(--ink)' }}
                  >
                    {r.sq}
                  </h3>
                  <p className="gloss mt-2 text-[1rem]">{r.en}</p>
                  <p className="body-lg mt-6">{r.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
