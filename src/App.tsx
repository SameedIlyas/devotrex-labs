import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Engagement } from './sections/Engagement';
import { FinalCta } from './sections/FinalCta';
import { Hero } from './sections/Hero';
import { Positioning } from './sections/Positioning';
import { Process } from './sections/Process';
import { Services } from './sections/Services';
import { Stack } from './sections/Stack';

/* labs.devotrex.com is one page: the catalogue reads top to bottom,
   and every nav item is an anchor into it. */
export default function App() {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
        <Navbar />
        <main className="relative flex-grow">
          <Hero />
          <Positioning />
          <Engagement />
          <Services />
          <Process />
          <Stack />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
