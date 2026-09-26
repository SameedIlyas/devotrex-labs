import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/* Cycles 0..count-1 every `ms`. Holds at `still` under reduced motion,
   so looping illustrations freeze on a meaningful frame. */
export function useTicker(count: number, ms: number, still = count - 1): number {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [count, ms, reduced]);
  return reduced ? still : i;
}
