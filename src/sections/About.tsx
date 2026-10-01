import { DotSphere } from '../components/art/DotSphere';
import { Halftone } from '../components/Halftone';
import { Appear, RollingNumber, WordsIn } from '../components/motion';
import { Button } from '../components/ui';
import { engagementModels } from '../data/company';
import { pillars, serviceCount } from '../data/services';

/* ── about ────────────────────────────────────────────────────────
   Headline on the left, one action on the right. Below, a wide
   halftone panel with a turning globe of dots behind the headline
   figure, and a narrow card
   with the statement and three figures in ruled rows. Every figure
   rolls up from zero when it comes into view, and every one is
   counted from the catalogue data, never typed in. */

const rows = [
  { label: 'Service pillars', value: `${pillars.length}` },
  { label: 'Ways to engage', value: `${engagementModels.length}` },
  { label: 'First engagements', value: '1–2 wk' },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="h-display max-w-[13ch]">
              <WordsIn text="Built to ship under your name." />
            </h2>
          </div>
          <Appear delay={0.3}>
            <Button href="#contact">Scope a project</Button>
          </Appear>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-[1.65fr_1fr]">
          <Appear y={40}>
            <Halftone preset="dawn" className="card min-h-[420px] md:min-h-[520px]">
              <div className="absolute inset-y-0 right-0 w-full md:w-[70%]" aria-hidden>
                <DotSphere scale={0.42} />
              </div>
              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7 md:min-h-[520px] md:p-9">
                <div className="font-serif text-[clamp(4.5rem,9vw,7.5rem)] leading-none tracking-[-0.04em]">
                  <RollingNumber value={`${serviceCount}`} />
                </div>
                <h3 className="mt-6 font-sans text-[20px] font-medium tracking-[-0.03em]">Defined services</h3>
                <p className="mt-1.5 max-w-[46ch] text-[15.5px] text-white/70">
                  Each one scoped, stacked and timed, across AI, full-stack, enterprise and vertical builds.
                </p>
              </div>
            </Halftone>
          </Appear>

          <Appear y={40} delay={0.15} className="h-full">
            <div className="card flex h-full flex-col justify-between gap-12 p-7 md:p-9">
              <p className="max-w-[34ch] text-[17px] leading-[1.5] text-ink-soft">
                We are the engineering arm behind boutique consultancies and agencies, building AI,
                automation, full-stack and legacy systems that ship under your brand, on your timeline.
              </p>
              <dl className="m-0">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-5 first:border-t-0"
                  >
                    <dt className="text-[17px] font-medium tracking-[-0.02em] text-white">{r.label}</dt>
                    <dd className="m-0 text-[20px] font-medium text-ink-soft">
                      <RollingNumber value={r.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Appear>
        </div>
      </div>
    </section>
  );
}
