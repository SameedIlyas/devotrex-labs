import { ArtDefs } from './components/art/LineArt';
import { Closing, Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { About } from './sections/About';
import { Compare } from './sections/Compare';
import { Engagement } from './sections/Engagement';
import { Faq } from './sections/Faq';
import { Hero } from './sections/Hero';
import { Positioning } from './sections/Positioning';
import { Process } from './sections/Process';
import { Services } from './sections/Services';

/* devotrex is one page on a near-black field under a film grain: every
   menu item is an anchor into it, and it opens and closes on the same
   blue dot landscape. */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg font-sans text-ink">
      <ArtDefs />
      <div className="grain" aria-hidden />
      <Navbar />
      <main className="relative flex-grow">
        <Hero />
        <About />
        <Services />
        <Process />
        <Positioning />
        <Engagement />
        <Compare />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
