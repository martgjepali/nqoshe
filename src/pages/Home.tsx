import { Hero } from '../sections/Hero';
import { Finder } from '../sections/Finder';
import { Radio } from '../sections/Radio';
import { Close } from '../sections/Close';
import { TopBar } from '../components/Chrome';

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <div id="hero-end" aria-hidden />
        <Finder />
        <Radio />
        <Close />
      </main>
    </>
  );
}
