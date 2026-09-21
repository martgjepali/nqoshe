import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ClockProvider } from './lib/clock';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { Grain, Preloader } from './components/Chrome';
import Home from './pages/Home';
import SpotDetail from './pages/SpotDetail';

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useSmoothScroll();

  return (
    <ClockProvider>
      <Preloader />
      <Grain />
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qoshe/:id" element={<SpotDetail />} />
        <Route path="*" element={<SpotDetail />} />
      </Routes>
    </ClockProvider>
  );
}
