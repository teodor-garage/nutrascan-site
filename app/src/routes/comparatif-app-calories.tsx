import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "../components/nutrascan/chrome";
import { DownloadPill } from "../components/nutrascan/cta";
import { ComparisonTable, type ComparisonRow } from "../components/nutrascan/comparison-table";
import { Faq, type FaqItem } from "../components/nutrascan/faq";
import { Reveal } from "../components/nutrascan/reveal";
import { StructuredData } from "../components/StructuredData";
import { SITE_URL } from "../components/nutrascan/constants";

const TITLE = "NutraScan vs MyFitnessPal, Cronometer, Lose It! | Comparatif";
const DESCRIPTION =
  "Comparatif honnête entre NutraScan, MyFitnessPal, Cronometer et Lose It! sur l'analyse masse grasse par IA, le scan de repas par photo et le coach nutritionnel.";
const PAGE_URL = `${SITE_URL}/comparatif-app-calories`;

export const Route = createFileRoute("/comparatif-app-calories")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: `${SITE_URL}/assets/og-comparatif.jpg` },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: ComparatifPage,
});

const articleJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NutraScan vs MyFitnessPal, Cronometer, Lose It! : le comparatif",
  description: DESCRIPTION,
  url: PAGE_URL,
  image: `${SITE_URL}/assets/og-comparatif.jpg`,
  publisher: { "@type": "Organization", name: "NutraScan" },
  inLanguage: "fr-FR",
});

const ROWS: ComparisonRow[] = [
  {
    label: "Analyse de masse grasse par IA",
    detail: "Estimation de la composition corporelle à partir de 3 photos.",
    nutrascan: true,
    myfitnesspal: false,
    cronometer: false,
    loseit: false,
  },
  {
    label: "Scan de repas par photo",
    detail: "Reconnaissance des aliments et calcul des macros par ingrédient.",
    nutrascan: true,
    myfitnesspal: true,
    cronometer: false,
    loseit: true,
  },
  {
    label: "Scan de code-barres",
    detail: "Lecture des produits emballés via base de données crowdsourcée.",
    nutrascan: true,
    myfitnesspal: true,
    cronometer: true,
    loseit: true,
  },
  {
    label: "Coach nutrition IA conversationnel",
    detail: "Chat avec une IA pour ajuster ses choix au quotidien.",
    nutrascan: true,
    myfitnesspal: false,
    cronometer: false,
    loseit: false,
  },
  {
    label: "Menu quotidien généré par IA",
    detail: "Menu calculé sur la cible calorique réelle de l'utilisateur.",
    nutrascan: true,
    myfitnesspal: false,
    cronometer: false,
    loseit: false,
  },
  {
    label: "Interface pensée pour le marché français",
    detail: "Application et contenu conçus en français en priorité.",
    nutrascan: true,
    myfitnesspal: false,
    cronometer: false,
    loseit: false,
  },
];

const FAQ: FaqItem[] = [
  {
    q: "NutraScan vs MyFitnessPal, quelle est la différence ?",
    a: "NutraScan est la seule des deux à proposer une analyse de la masse grasse par IA à partir de photos, un coach nutritionnel conversationnel par IA et des menus quotidiens générés automatiquement. MyFitnessPal reste une référence pour sa très large base de données alimentaire et son ancienneté.",
  },
  {
    q: "Quelle application choisir pour suivre ses calories avec l'IA ?",
    a: "Cela dépend de l'objectif. Pour combiner suivi calorique et analyse de la composition corporelle dans une seule app, NutraScan est la seule à réunir scan de repas par photo, analyse masse grasse par IA et coach nutritionnel.",
  },
  {
    q: "Cronometer est-il plus précis que NutraScan ?",
    a: "Cronometer est réputé pour la précision de sa base de données micronutriments (vitamines, minéraux). NutraScan se concentre sur l'analyse par IA (repas et masse grasse) plutôt que sur la saisie manuelle détaillée. Les deux répondent à des besoins différents.",
  },
];

function ComparatifPage() {
  return (
    <div>
      <StructuredData json={articleJsonLd} />
      <Nav />

      <main className="mx-auto max-w-6xl px-6 sm:px-10">
        <section className="py-8 sm:py-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2E6B82]">
            Comparatif
          </span>
          <h1 className="ns-animate-rise mt-3 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-[#14181C] sm:text-6xl">
            NutraScan face à MyFitnessPal, Cronometer et Lose It!
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5B6670]">
            Un comparatif honnête, sans chiffres inventés : ce que NutraScan
            fait différemment, et ce que les applications historiques font
            encore mieux.
          </p>
          <div className="mt-8">
            <DownloadPill />
          </div>
        </section>

        <Reveal className="border-t border-[#14181C]/10 py-12">
          <ComparisonTable rows={ROWS} />
          <p className="mt-4 text-xs leading-relaxed text-[#5B6670]">
            Comparatif basé sur les fonctionnalités publiques de chaque
            application. Les applications évoluent régulièrement ; vérifie
            les fonctionnalités actuelles directement sur l'App Store avant
            de choisir.
          </p>
        </Reveal>

        <Reveal className="max-w-3xl border-t border-[#14181C]/10 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
            Pourquoi NutraScan plutôt qu'une app généraliste ?
          </h2>
          <p className="mt-5 leading-relaxed text-[#5B6670]">
            MyFitnessPal, Cronometer et Lose It! ont construit leur force sur
            des bases de données alimentaires massives et une saisie
            manuelle très complète. NutraScan part d'un autre problème :
            réduire la friction du suivi (photo plutôt que recherche
            manuelle) et relier ce suivi à une vraie mesure de composition
            corporelle, pas seulement au poids sur la balance.
          </p>
        </Reveal>

        <Reveal className="border-t border-[#14181C]/10 py-16">
          <Faq items={FAQ} title="Questions fréquentes sur le comparatif" />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
