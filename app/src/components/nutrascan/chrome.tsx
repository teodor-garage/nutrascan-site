import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { DownloadPill, BannerCta } from "./cta";
import { SUPPORT_EMAIL } from "./constants";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/analyse-masse-grasse-ia", label: "Masse grasse" },
  { to: "/comparatif-app-calories", label: "Comparatif" },
] as const;

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src="/assets/logo-mark.png" alt="" aria-hidden="true" className="h-8 w-8 rounded-[22%]" />
      <span className="text-lg font-bold tracking-tight text-[#14181C]">NutraScan</span>
    </Link>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 right-0 h-[1.5px] bg-[#14181C] transition-transform duration-300 ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-[#14181C] transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 right-0 h-[1.5px] bg-[#14181C] transition-transform duration-300 ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 rotate-0"
        }`}
      />
    </span>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-[#14181C]/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <nav
        aria-label="Navigation mobile"
        className={`absolute inset-x-4 top-4 origin-top rounded-3xl border border-[#14181C]/10 bg-[#F8F9FB] p-6 shadow-[0_20px_60px_-15px_rgba(20,24,28,0.25)] transition-all duration-300 ${
          open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <Wordmark />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#14181C] transition-colors hover:bg-[#EAF3F6]"
          >
            <MenuGlyph open={true} />
          </button>
        </div>
        <ul className="mt-8 flex flex-col divide-y divide-[#14181C]/10">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={onClose}
                className="flex items-center justify-between py-4 text-lg font-medium text-[#14181C] transition-colors hover:text-[#2E6B82]"
                activeProps={{ className: "text-[#2E6B82]" }}
              >
                {link.label}
                <span aria-hidden="true" className="text-[#2E6B82]">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <DownloadPill className="w-full justify-center" />
        </div>
      </nav>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
      <Wordmark />
      <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="ns-nav-link text-sm font-medium text-[#5B6670] transition-colors hover:text-[#14181C]"
            activeProps={{ className: "text-[#14181C]" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <DownloadPill />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14181C]/10 text-[#14181C] transition-colors hover:bg-[#EAF3F6] md:hidden"
        >
          <MenuGlyph open={false} />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10 sm:px-10">
      <BannerCta
        headline="Commence gratuitement"
        subline="Ta première analyse de masse grasse par IA est gratuite. Télécharge NutraScan et calibre ta nutrition en 3 minutes."
      />
      <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#14181C]/10 pt-8 text-sm text-[#5B6670] sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo-mark.png" alt="" aria-hidden="true" className="h-5 w-5 rounded-[22%]" />
          <span>NutraScan, nutrition calibrée par IA.</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-[#14181C]">
              {link.label}
            </Link>
          ))}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-[#14181C]">
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
