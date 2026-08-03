import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "../components/nutrascan/chrome";
import { DownloadPill } from "../components/nutrascan/cta";
import { Counter } from "../components/nutrascan/counter";
import { Faq, type FaqItem } from "../components/nutrascan/faq";
import { StructuredData } from "../components/StructuredData";
import { SITE_URL } from "../components/nutrascan/constants";

const TITLE = "Analyse de masse grasse par IA : comment ça marche | NutraScan";
const DESCRIPTION =
  "NutraScan estime ta masse grasse à partir de 3 photos grâce à l'IA, puis calcule ta cible calorique réelle avec la formule Katch-McArdle. Méthode, précision et limites expliquées.";
const PAGE_URL = `${SITE_URL}/analyse-masse-grasse-ia`;

export const Route = createFileRoute("/analyse-masse-grasse-ia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: `${SITE_URL}/assets/og-massegrasse.jpg` },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: MasseGrassePage,
});

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Analyse de masse grasse par IA : comment ça marche",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: `${SITE_URL}/assets/og-massegrasse.jpg`,
  publisher: { "@type": "Organization", name: "NutraScan" },
  inLanguage: "fr-FR",
});

const STEPS = [
  {
    n: "01",
    title: "Prends 3 photos",
    body: "Face, profil et dos, directement depuis l'appareil photo de ton iPhone. Aucun équipement supplémentaire.",
  },
  {
    n: "02",
    title: "L'IA analyse ta silhouette",
    body: "Le modèle estime ta composition corporelle : pourcentage de masse grasse et masse maigre.",
  },
  {
    n: "03",
    title: "Ta cible calorique est calculée",
    body: "La masse maigre alimente la formule Katch-McArdle pour calculer un besoin calorique personnalisé, plus précis qu'une estimation basée sur le poids seul.",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "Comment NutraScan analyse-t-il ma masse grasse ?",
    a: "Tu prends 3 photos (face, profil, dos) depuis l'appareil photo de ton iPhone. L'IA de NutraScan analyse ces images pour estimer ta composition corporelle, utilisée ensuite pour calculer ton besoin calorique via la formule Katch-McArdle.",
  },
  {
    q: "L'analyse est-elle aussi précise qu'un scanner DEXA ?",
    a: "Non. Il s'agit d'une estimation par IA à partir de photos, pas d'un examen médical. C'est un outil de suivi de tendance pratique et accessible depuis un téléphone, pas un diagnostic médical, et il ne remplace pas un avis professionnel de santé.",
  },
  {
    q: "L'analyse de masse grasse est-elle payante ?",
    a: "La première analyse est gratuite, proposée dès l'inscription. Le suivi de l'évolution dans le temps et les analyses supplémentaires font partie de l'abonnement Premium.",
  },
  {
    q: "Mes photos sont-elles partagées ou publiées ?",
    a: "Non. Tes photos sont utilisées uniquement pour l'analyse par intelligence artificielle et ne sont jamais publiées ni partagées publiquement.",
  },
  {
    q: "Quelle application gratuite pour analyser sa masse grasse ?",
    a: "NutraScan propose une première analyse de masse grasse gratuite par IA à partir de 3 photos, dès l'inscription, sans carte bancaire requise.",
  },
  {
    q: "Peut-on estimer sa masse grasse avec une photo ?",
    a: "Oui. NutraScan utilise l'intelligence artificielle pour estimer la composition corporelle à partir de 3 photos (face, profil, dos), sans matériel spécifique. C'est une estimation de suivi, pas une mesure clinique.",
  },
  {
    q: "Quelle alternative moins chère à un scanner DEXA ?",
    a: "Un scanner DEXA coûte généralement plusieurs dizaines d'euros par séance en institut spécialisé. NutraScan propose une estimation par IA à partir de photos, gratuite pour la première analyse, comme alternative de suivi au quotidien : moins précise qu'un DEXA, mais accessible et répétable aussi souvent que voulu.",
  },
  {
    q: "Comment suivre sa masse grasse sans balance à impédance ?",
    a: "NutraScan permet de suivre l'évolution de ta masse grasse dans le temps par photo plutôt que par balance à impédance, un capteur sensible à l'hydratation et à l'heure de la mesure. Reprends 3 photos régulièrement pour visualiser ta courbe d'évolution.",
  },
  {
    q: "NutraScan est-il fiable ?",
    a: "NutraScan est une estimation par intelligence artificielle, pas un diagnostic médical. C'est un outil de suivi de tendance dans le temps, pensé pour être répété régulièrement, plutôt qu'une mesure ponctuelle exacte.",
  },
];

function MasseGrassePage() {
  return (
    <div>
      <StructuredData json={articleJsonLd} />
      <Nav />

      <main className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Hero — off-grid editorial, oversized numeral */}
        <section className="relative overflow-hidden py-8 sm:py-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-0 select-none font-mono text-[260px] font-bold leading-none text-[#2E6B82]/[0.07] sm:text-[420px]"
          >
            %
          </span>
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="ns-animate-rise">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2E6B82]">
                Analyse masse grasse
              </span>
              <h1 className="mt-3 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#14181C] sm:text-6xl">
                Ta composition corporelle, mesurée par l'IA.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#5B6670]">
                Pas de balance à impédance, pas de pince à plis cutanés :
                3 photos suffisent à NutraScan pour estimer ta masse grasse
                et calibrer ton objectif calorique.
              </p>
              <div className="mt-8">
                <DownloadPill />
              </div>
            </div>
            <div className="ns-animate-rise overflow-hidden rounded-[28px]" style={{ animationDelay: "120ms" }}>
              <img
                src="/assets/hero-massegrasse.jpg"
                alt="Silhouette humaine abstraite en fil de fer avec des lignes de calibration, illustrant l'analyse de masse grasse par intelligence artificielle"
                className="h-full w-full object-cover"
                width={1800}
                height={1017}
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-[#14181C]/10 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
            Comment fonctionne l'analyse de masse grasse par IA
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="border-l-2 border-[#2E6B82]/20 pl-5">
                <span className="font-mono text-sm text-[#2E6B82]">{step.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-[#14181C]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B6670]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Katch-McArdle explainer with signature counter */}
        <section className="grid gap-10 rounded-[32px] border border-[#14181C]/10 bg-white p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
              Ta masse maigre calcule ta vraie cible calorique.
            </h2>
            <p className="mt-4 leading-relaxed text-[#5B6670]">
              La plupart des apps calculent ton besoin calorique à partir du
              poids total. NutraScan utilise ta masse maigre (issue de
              l'analyse photo) dans la formule Katch-McArdle, une méthode
              plus précise pour les personnes qui font du sport ou dont la
              composition corporelle sort de la moyenne.
            </p>
          </div>
          <div className="rounded-2xl bg-[#EAF3F6] p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#2E6B82]">
              Exemple pour un profil type
            </p>
            <Counter to={2340} suffix=" kcal" className="mt-3 block text-5xl font-bold text-[#14181C]" />
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#2E6B82]/15 pt-6">
              <div>
                <Counter to={165} suffix="g" className="text-xl font-semibold text-[#14181C]" />
                <p className="mt-1 text-xs text-[#5B6670]">Protéines</p>
              </div>
              <div>
                <Counter to={220} suffix="g" className="text-xl font-semibold text-[#14181C]" />
                <p className="mt-1 text-xs text-[#5B6670]">Glucides</p>
              </div>
              <div>
                <Counter to={70} suffix="g" className="text-xl font-semibold text-[#14181C]" />
                <p className="mt-1 text-xs text-[#5B6670]">Lipides</p>
              </div>
            </div>
          </div>
        </section>

        {/* Honesty / accuracy — direct answer to a real query */}
        <section className="max-w-3xl border-t border-[#14181C]/10 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
            Quelle est la précision de cette estimation ?
          </h2>
          <p className="mt-5 leading-relaxed text-[#5B6670]">
            L'analyse de NutraScan est une estimation par intelligence
            artificielle à partir de photos, pas un examen médical de type
            DEXA ou hydrodensitométrie. C'est un outil pensé pour suivre une
            tendance dans le temps de façon accessible, directement depuis un
            téléphone, à répéter régulièrement. Elle ne remplace pas un avis
            médical ou une mesure clinique.
          </p>
        </section>

        <div className="border-t border-[#14181C]/10 py-16">
          <Faq items={FAQ} title="Questions fréquentes sur l'analyse masse grasse" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
