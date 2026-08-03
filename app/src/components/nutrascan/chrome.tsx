import { Link } from "@tanstack/react-router";
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
      <img src="/assets/logo-mark.png" alt="" aria-hidden="true" className="h-7 w-7" />
      <span className="text-lg font-bold tracking-tight text-[#14181C]">NutraScan</span>
    </Link>
  );
}

export function Nav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
      <Wordmark />
      <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm font-medium text-[#5B6670] transition-colors hover:text-[#14181C]"
            activeProps={{ className: "text-[#14181C]" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <DownloadPill />
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
          <img src="/assets/logo-mark.png" alt="" aria-hidden="true" className="h-5 w-5" />
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
