import { Hero } from '../sections/Hero';
import { Idea } from '../sections/Idea';
import { Ora } from '../sections/Ora';
import { Explore } from '../sections/Explore';
import { MapTeaser } from '../sections/MapTeaser';
import { Culture } from '../sections/Culture';
import { Close } from '../sections/Close';
import { LightMeter } from '../components/LightMeter';
import { TopBar } from '../components/Chrome';

export default function Home() {
  return (
    <>
      <TopBar />
      <LightMeter />
      <main>
        <Hero />
        <div id="hero-end" aria-hidden />
        <Idea />
        <Ora />
        <Explore />
        <MapTeaser />
        <Culture />
        <Close />
      </main>
    </>
  );
}
