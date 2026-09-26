import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { About } from './sections/About';
import { Capabilities } from './sections/capabilities/Capabilities';
import { Catalogue } from './sections/Catalogue';
import { Contact } from './sections/Contact';
import { Engagement } from './sections/Engagement';
import { Faq } from './sections/Faq';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { Stack } from './sections/Stack';
import { Value } from './sections/Value';

/* devotrex is one page: numbered sections read top to bottom,
   and every menu item is an anchor into it. The page opens and closes
   on the same navy field. */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main className="relative flex-grow">
        <Hero />
        <About />
        <Value />
        <Capabilities />
        <Process />
        <Catalogue />
        <Stack />
        <Engagement />
        <Faq />
        <div className="bg-gradient-to-b from-paper via-navy to-navy-deep via-20%">
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
