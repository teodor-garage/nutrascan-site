import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "../components/nutrascan/chrome";
import { DownloadPill, ArrowLink, FramedLink } from "../components/nutrascan/cta";
import { Icon } from "../components/nutrascan/icons";
import { Faq, type FaqItem } from "../components/nutrascan/faq";
import { Reveal } from "../components/nutrascan/reveal";
import { ScanField } from "../components/nutrascan/scan-field";
import { StructuredData } from "../components/StructuredData";
import { APP_STORE_URL, SITE_URL } from "../components/nutrascan/constants";

const TITLE = "NutraScan : calories, masse grasse et menus par IA";
const DESCRIPTION =
  "NutraScan est une application iPhone qui analyse tes repas, ta masse grasse et tes calories par intelligence artificielle, et génère des menus adaptés à ton objectif.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

const softwareAppJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NutraScan",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS",
  url: SITE_URL,
  downloadUrl: APP_STORE_URL,
  image: `${SITE_URL}/assets/og-home.jpg`,
  inLanguage: "fr-FR",
  description: DESCRIPTION,
  publisher: { "@type": "Organization", name: "NutraScan" },
});

const FEATURES = [
  {
    icon: "camera" as const,
    title: "Scan de repas par IA",
    body: "Prends ton assiette en photo. L'IA détecte les aliments et calcule les calories et macros par ingrédient.",
    image: "/assets/feature-meal-scan.jpg",
  },
  {
    icon: "barcode" as const,
    title: "Scan de code-barres",
    body: "Scanne un produit pour connaître instantanément sa composition complète, sucre et fibres inclus.",
    image: "/assets/feature-barcode.jpg",
  },
  {
    icon: "sparkle" as const,
    title: "Menu du jour généré par IA",
    body: "Un menu quotidien calculé sur ta vraie cible calorique (formule Katch-McArdle), à partir de ta masse maigre.",
    image: "/assets/feature-menu.jpg",
  },
  {
    icon: "chat" as const,
    title: "Coach nutrition IA",
    body: "Pose tes questions à un coach IA disponible à tout moment pour ajuster tes choix du jour.",
    image: "/assets/feature-coach.jpg",
  },
  {
    icon: "chart" as const,
    title: "Suivi de l'évolution",
    body: "Visualise l'évolution de ton poids et de ta masse grasse, semaine après semaine.",
    image: "/assets/feature-chart.jpg",
  },
];

const HOME_FAQ: FaqItem[] = [
  {
    q: "Qu'est-ce que NutraScan ?",
    a: "NutraScan est une application iPhone de suivi nutritionnel qui utilise l'intelligence artificielle pour analyser tes repas en photo, estimer ta masse grasse à partir de 3 photos, et générer des menus quotidiens adaptés à ton objectif calorique.",
  },
  {
    q: "NutraScan est-il gratuit ?",
    a: "La première analyse de masse grasse et le suivi de base sont accessibles gratuitement. Les fonctionnalités avancées (coach IA, menus personnalisés, scans illimités) font partie de l'abonnement Premium, avec un essai gratuit de 7 jours.",
  },
  {
    q: "Sur quels appareils NutraScan est-il disponible ?",
    a: "NutraScan est disponible sur iPhone, à télécharger directement sur l'App Store.",
  },
  {
    q: "Mes données nutritionnelles sont-elles privées ?",
    a: "Oui. Tes données de repas et de composition corporelle sont liées à ton compte personnel et ne sont jamais revendues à des tiers.",
  },
  {
    q: "Comment NutraScan calcule-t-il les calories d'un repas pris en photo ?",
    a: "Prends ton assiette en photo dans l'app : l'intelligence artificielle de NutraScan identifie les aliments présents et calcule les calories et macronutriments par ingrédient, en quelques secondes.",
  },
];

function Index() {
  return (
    <div>
      <StructuredData json={softwareAppJsonLd} />
      <Nav />

      <main className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Hero — image-first, restrained text */}
        <section className="grid items-center gap-10 py-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="ns-animate-rise">
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-[#14181C] sm:text-6xl">
              Ta nutrition, calibrée au gramme près.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#5B6670]">
              NutraScan analyse tes repas, ta masse grasse et tes calories par
              intelligence artificielle, directement depuis ton iPhone.
            </p>
            <div className="mt-8">
              <DownloadPill magnetic />
            </div>
          </div>
          <div
            className="ns-animate-rise relative overflow-hidden rounded-[28px]"
            style={{ animationDelay: "120ms" }}
          >
            <img
              src="/assets/hero-home.jpg"
              alt="Assiette de nourriture avec une grille de calibration superposée, symbolisant l'analyse nutritionnelle par IA de NutraScan"
              className="h-full w-full object-cover"
              width={1800}
              height={1017}
            />
            <ScanField />
          </div>
        </section>

        {/* Entity clarity strip — direct-answer, first ~100 words */}
        <Reveal className="max-w-3xl border-t border-[#14181C]/10 py-10">
          <p className="text-lg leading-relaxed text-[#14181C]">
            <strong>NutraScan</strong> est une application iPhone de nutrition qui
            utilise l'intelligence artificielle pour trois choses : lire le
            contenu nutritionnel d'un repas à partir d'une simple photo,
            estimer ta masse grasse à partir de 3 photos corporelles, et
            construire un menu quotidien calculé sur ta cible calorique
            réelle. L'app est conçue et pensée pour le marché français.
          </p>
        </Reveal>

        {/* Masse grasse teaser — off-grid editorial, oversized numeral */}
        <Reveal className="relative overflow-hidden rounded-[32px] bg-[#EAF3F6] px-6 py-16 sm:px-14 sm:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-mono text-[280px] font-bold leading-none text-[#2E6B82]/10 sm:text-[380px]"
          >
            %
          </span>
          <div className="relative max-w-xl">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#14181C] sm:text-5xl">
              Analyse ta masse grasse avec l'IA, sans balance à impédance.
            </h2>
            <p className="mt-5 leading-relaxed text-[#5B6670]">
              Trois photos (face, profil, dos) suffisent : NutraScan estime ta
              composition corporelle et calcule ta cible calorique précise à
              partir de ta masse maigre, formule Katch-McArdle.
            </p>
            <div className="mt-7">
              <ArrowLink href="/analyse-masse-grasse-ia">
                Découvrir l'analyse masse grasse
              </ArrowLink>
            </div>
          </div>
        </Reveal>

        {/* Features bento */}
        <Reveal className="py-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2E6B82]">
            Fonctionnalités
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
            Une IA qui comprend ton assiette.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className={`group overflow-hidden rounded-3xl border border-[#14181C]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2E6B82]/40 hover:shadow-[0_20px_45px_-20px_rgba(20,24,28,0.18)] ${
                  i === 0 ? "lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={f.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    width={1000}
                    height={746}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <Icon
                    name={f.icon}
                    className="h-6 w-6 text-[#2E6B82] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-[#14181C]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5B6670]">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Comparison teaser */}
        <Reveal className="grid gap-10 border-t border-[#14181C]/10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
              Quelle app choisir pour suivre ses calories avec l'IA ?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5B6670]">
              MyFitnessPal, Cronometer et Lose It! restent des références pour
              le suivi calorique classique. NutraScan est la seule à combiner
              scan de repas par IA, analyse de masse grasse par photo et coach
              nutritionnel conversationnel dans une seule application.
            </p>
            <div className="mt-7">
              <FramedLink href="/comparatif-app-calories">Voir le comparatif complet</FramedLink>
            </div>
          </div>
          <ul className="divide-y divide-[#14181C]/10 rounded-2xl border border-[#14181C]/10 bg-white">
            {[
              { k: "Analyse masse grasse IA", v: "Exclusif à NutraScan" },
              { k: "Coach nutrition IA", v: "Exclusif à NutraScan" },
              { k: "Scan de repas par photo", v: "Inclus dans NutraScan" },
            ].map((item) => (
              <li
                key={item.k}
                className="flex items-center gap-4 p-5 transition-colors duration-200 hover:bg-[#EAF3F6]/60"
              >
                <Icon name="check" className="h-5 w-5 shrink-0 text-[#2E6B82]" />
                <div>
                  <p className="text-sm font-semibold text-[#14181C]">{item.k}</p>
                  <p className="mt-0.5 text-xs text-[#5B6670]">{item.v}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="border-t border-[#14181C]/10 py-16">
          <Faq items={HOME_FAQ} />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
