import { useState } from 'react';
import type { FormEvent } from 'react';
import { Appear, WordsIn } from '../components/motion';
import { Button } from '../components/ui';
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/links';

/* ── 009 · contact ────────────────────────────────────────────────
   A tall frosted card on the closing navy field. The site has no
   backend, so the form composes an email to CONTACT_EMAIL in the
   visitor's own mail client; nothing is sent anywhere by the page. */

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'company', label: 'Your company name', type: 'text', autoComplete: 'organization' },
  { name: 'email', label: 'Your business email', type: 'email', autoComplete: 'email' },
] as const;

const MAX_LEN = 2000;

export function Contact() {
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim().slice(0, MAX_LEN);
    const [name, company, email, details] = ['name', 'company', 'email', 'details'].map(get);

    if (!name || !company || !email || !details) {
      setError('Please fill in every field.');
      return;
    }
    setError('');
    const subject = `Devotrex: project enquiry from ${company}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${details}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const input =
    'w-full rounded-[18px] border border-white/15 bg-white/10 px-5 py-4 text-[16px] text-white placeholder:text-white/55 outline-none transition-colors focus:border-white/50 focus:bg-white/15';

  return (
    <section id="contact" className="section pb-20">
      <Appear y={50} className="mx-auto max-w-[680px]">
        <div data-nav-theme="dark" className="relative overflow-hidden rounded-[48px] border border-white/20 bg-white/[0.08] px-5 pt-14 pb-14 shadow-[inset_0_2px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl md:rounded-[88px] md:px-14">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.055em] text-white">
              <WordsIn text="A project you can’t staff? Let’s scope it." />
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.45] text-white/75">
              Tell us the project, the stack and the deadline. We’ll tell you honestly whether it’s a fit,
              and what the smallest useful first step looks like.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-10 space-y-3">
            {FIELDS.map((f) => (
              <label key={f.name} className="block">
                <span className="sr-only">{f.label}</span>
                <input
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  maxLength={200}
                  required
                  placeholder={`${f.label}*`}
                  className={input}
                />
              </label>
            ))}
            <label className="block">
              <span className="sr-only">Project details</span>
              <textarea
                name="details"
                rows={4}
                maxLength={MAX_LEN}
                required
                placeholder="Share project details*"
                className={`${input} resize-none`}
              />
            </label>
            {error ? (
              <p role="alert" className="text-center text-[14px] text-white">
                {error}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
              <button type="submit" className="btn btn--light">
                Send your request
              </button>
              <Button href={BOOKING_URL} external arrow>
                Book a scoping call
              </Button>
            </div>
          </form>
        </div>
      </Appear>
    </section>
  );
}
