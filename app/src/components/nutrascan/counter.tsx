import { useEffect, useRef, useState } from "react";

/** Signature micro-interaction: a numeric readout that counts up on mount.
 * Final value is what a static/no-JS render shows, so this is additive
 * polish, never load-bearing for content visibility (reduced-motion and
 * pre-hydration both show the true number). */
export function Counter({
  to,
  suffix = "",
  durationMs = 900,
  className = "",
}: {
  to: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(to);
      return;
    }

    setValue(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, durationMs]);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {value}
      {suffix}
    </span>
  );
}
