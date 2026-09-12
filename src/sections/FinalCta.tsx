import { AgWords } from '../components/agencee/AgWords';
import { AgButton } from '../components/agencee/primitives';
import { MotionReveal } from '../components/MotionReveal';
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO } from '../lib/links';

/* ── final CTA ────────────────────────────────────────────────────
   The main site's closing band: a second mesh field with the trailing
   phrase in the same frosted pill the hero opens with, so the page
   starts and ends on the identical device. */

const PROOF_CHIPS = ['White-label delivery', 'Start with a pilot', 'Milestone-based projects'];

export function FinalCta() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-paper">
      <div className="ag-mesh" aria-hidden>
        <div className="ag-mesh__blob" />
        <div className="ag-mesh__dots" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 py-32 text-center md:px-10">
        <h2 className="ag-display text-[clamp(1.9rem,8.4vw,4.6rem)]">
          <AgWords
            text="A client project you can’t staff?"
            highlight={<span className="ag-glass whitespace-nowrap">Let’s scope it</span>}
          />
        </h2>

        <MotionReveal delay={0.3}>
          <p className="ag-lede mx-auto mt-7 max-w-[54ch] text-[17px]">
            Tell us the project, the stack and the deadline. We’ll tell you honestly whether it’s a
            fit, and what the smallest useful first step looks like.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <AgButton variant="light" href={CONTACT_MAILTO}>
              Email {CONTACT_EMAIL}
            </AgButton>
            <AgButton href={BOOKING_URL} external arrow>
              Book a scoping call
            </AgButton>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.5}>
          <ul className="m-0 mt-10 flex list-none flex-wrap items-center justify-center gap-3 p-0">
            {PROOF_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/60 bg-white/45 px-4 py-1.5 text-[12.5px] font-medium text-ink-soft backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}
