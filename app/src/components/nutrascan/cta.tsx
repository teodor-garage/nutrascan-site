import { useEffect, useRef, type ReactNode } from "react";
import { APP_STORE_URL } from "./constants";

/** Cursor pulls the element toward it within a radius, spring-back on
 * leave. Transform-only, refs not state (no per-frame re-render), skipped
 * on touch/coarse pointers and prefers-reduced-motion. */
function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el!.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    function onLeave() {
      el!.style.transform = "";
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}

/** CTA 1 — primary pill. Nav + hero. App-Store-black with a moonstone
 * underline sweep on hover. `magnetic` adds a cursor-pull effect for the
 * hero placement — the site's single most-clicked element. */
export function DownloadPill({
  className = "",
  magnetic = false,
}: {
  className?: string;
  magnetic?: boolean;
}) {
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <a
      ref={magnetic ? magneticRef : undefined}
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#14181C] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-out active:scale-[0.98] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M16.365 1.43c0 1.14-.462 2.222-1.222 3.02-.83.87-2.176 1.542-3.29 1.452-.135-1.09.44-2.24 1.18-3.02.83-.88 2.294-1.53 3.332-1.452zm3.71 16.53c-.51 1.18-.75 1.71-1.4 2.75-.91 1.46-2.19 3.28-3.78 3.29-1.41.02-1.78-.92-3.7-.91-1.92.01-2.33.93-3.74.91-1.59-.02-2.8-1.66-3.71-3.12C1.24 17.9.4 14.3 1.6 11.9c.85-1.71 2.37-2.79 4.02-2.81 1.5-.02 2.9.99 3.8.99.9 0 2.6-1.22 4.38-1.04.75.03 2.85.3 4.2 2.28-3.4 2.1-2.9 6.1-.03 7.55.04.02.06.04.09.06z" />
      </svg>
      Télécharger
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#6FA8C1] transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

/** CTA 2 — inline text link, arrow slides right on hover. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 font-medium text-[#2E6B82] underline decoration-[#2E6B82]/30 decoration-2 underline-offset-4 transition-colors hover:text-[#14181C]"
    >
      {children}
      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </a>
  );
}

/** CTA 3 — framed outline block, fills with accent-tint on hover. */
export function FramedLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl border border-[#2E6B82] px-5 py-3 text-sm font-semibold text-[#2E6B82] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EAF3F6] hover:shadow-[0_10px_25px_-12px_rgba(46,107,130,0.35)]"
    >
      {children}
    </a>
  );
}

/** CTA 4 — full-width banner CTA, footer only. */
export function BannerCta({
  headline,
  subline,
}: {
  headline: string;
  subline: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#2E6B82] px-8 py-16 text-white sm:px-16 sm:py-20">
      <svg
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-20"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="199" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="200" cy="200" r="80" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="white" strokeWidth="1" />
      </svg>
      <div className="relative max-w-xl">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{headline}</h2>
        <p className="mt-4 max-w-md text-white/80">{subline}</p>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 transition-transform active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
            <path d="M16.365 1.43c0 1.14-.462 2.222-1.222 3.02-.83.87-2.176 1.542-3.29 1.452-.135-1.09.44-2.24 1.18-3.02.83-.88 2.294-1.53 3.332-1.452zm3.71 16.53c-.51 1.18-.75 1.71-1.4 2.75-.91 1.46-2.19 3.28-3.78 3.29-1.41.02-1.78-.92-3.7-.91-1.92.01-2.33.93-3.74.91-1.59-.02-2.8-1.66-3.71-3.12C1.24 17.9.4 14.3 1.6 11.9c.85-1.71 2.37-2.79 4.02-2.81 1.5-.02 2.9.99 3.8.99.9 0 2.6-1.22 4.38-1.04.75.03 2.85.3 4.2 2.28-3.4 2.1-2.9 6.1-.03 7.55.04.02.06.04.09.06z" />
          </svg>
          <span className="text-left leading-tight text-white">
            <span className="block text-[10px] uppercase tracking-wide text-white/70">
              Télécharger dans
            </span>
            <span className="block text-lg font-semibold">l&rsquo;App Store</span>
          </span>
        </a>
      </div>
    </section>
  );
}
