import { useEffect } from 'react';

/* Thin bar pinned to the top of the viewport, advancing as the document
   scrolls. Pure CSS-variable hand-off, no React state churn. */
export function ScrollProgress() {
  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'scroll-progress';
    document.body.appendChild(el);

    let frame = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      el.style.setProperty('--scroll-progress', `${pct}%`);
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.remove();
    };
  }, []);

  return null;
}
