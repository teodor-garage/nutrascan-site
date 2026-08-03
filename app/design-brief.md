# NutraScan marketing site — design brief

## Design read
French adults (20-45) trying to lose fat or eat better, who are skeptical of
"yet another calorie app" and want proof of precision, not hype. Emotional
register: calm confidence of a well-calibrated instrument, not a fitness-hype
energy blast.

## Concept spine
**Precision instrument.** NutraScan's actual differentiator is measurement:
a photo-based body-composition calibration (3-angle scan → lean mass →
Katch-McArdle calorie target) and per-ingredient macro readouts. The site
enacts this: numeric readouts as structure, grid alignment, restrained color
used only where it marks data or action, generous whitespace read as
"measurement margin" rather than decoration.

## Delivery tier: editorial
Primary goal is to be extracted and cited by AI answer engines (ChatGPT,
Perplexity, Gemini) when people search for calorie-tracking or body-fat
analysis tools — clarity and fast, clean semantic HTML beat scroll spectacle.
User explicitly asked for "propre, beau et clair." Micro-motion only: on-mount
headline builds, scroll reveals (transform/opacity, never opacity-to-zero
gated on viewport), hover states, and one motivated signature micro-interaction
— an animated numeric readout (kcal / lean mass / % body fat counting up to
its computed value) on the masse-grasse page, since the spine is measurement.
No Tier-1 wow-catalog mechanic required at editorial tier.

## Locked palette
- Background (near-white): `#F8F9FB`
- Ink (primary text): `#14181C`
- Secondary text: `#5B6670`
- Accent — moonstone blue (CTAs, links, active states): `#2E6B82`
- Accent soft (icons, decorative marks): `#6FA8C1`
- Accent tint (section fills): `#EAF3F6`
Defense: matches the app's own recent Theme.swift redesign (near-white +
moonstone blue) — visual continuity between app and site is itself a trust
signal for a health app. Not a banned family (no graphite+orange, no
neon-on-black, no beige+brass, no AI-purple).

## Locked type
**Plus Jakarta Sans** (display + body — a Satoshi-like geometric grotesk,
warm enough for consumer health, available self-hosted via Google Fonts) +
**JetBrains Mono** (numeric readouts: kcal, macros, %, comparison-table
figures). Numbers are core content here, not decoration — a mono face gives
them the credibility of an instrument readout. No serif anywhere.

## Hero architecture
Home hero: **massive image-first with restrained text** — a generated
precision-instrument visual (calibration grid over a food plate / phone),
headline + one subline + one CTA, no feature bullets. NOT the overused plain
left-text/right-image split.

## Section system (dominant)
Alternating editorial blocks, one bento module (features), one Swiss-grid
table (comparison) — mixed families across pages, never repeated back to back.

## Signature components (4)
Oversized metrics strip (kcal / macros / % readouts), product-concept panel
stack (feature tiles as generated imagery, never div-fake UI), vertical
rhythm lines (how-it-works steps), hover-accordion slices (FAQ).

## Second-read moment
One oversized numeral used as structure: a giant "%" glyph anchoring the
masse-grasse page's hero, doubling as a layout element (text wraps around it).

## CTA inventory (bespoke, one identity each)
1. **"Télécharger"** — primary pill, App Store black + accent underline
   sweep on hover. Hero + footer.
2. **"Découvrir l'analyse masse grasse"** — inline text link with an arrow
   that slides right on hover. Home teaser.
3. **"Voir le comparatif"** — framed outline block, fills with accent-tint
   on hover. Home teaser.
4. **"Commencer gratuitement"** — full-width banner CTA, footer only.

## Section plan (boards — one per archetype, reused consistently across the
3 routes rather than re-rolled per page)
1. Hero — home, image-first, calibration-grid-over-plate motif.
2. Masse-grasse deep hero — off-grid editorial, oversized "%" numeral,
   triple-photo-angle capture motif (face/profil/dos), abstract silhouette
   only, never a realistic identifiable body/face.
3. Features bento — 5 modules (scan repas, code-barres, menu IA, coach IA,
   courbes d'évolution), product-concept imagery not fake UI.
4. How-it-works steps — 3-step vertical rhythm (photo → IA → résultat).
5. Comparison table — Swiss grid, NutraScan vs MyFitnessPal vs Cronometer
   vs Lose It.
6. FAQ accordion.
7. CTA / download banner footer.

## Routes (multi-page for GEO — dedicated URLs match dedicated search intents)
- `/` — home: hero, masse-grasse teaser, features bento, comparison teaser,
  FAQ (site-wide questions), download CTA.
- `/analyse-masse-grasse-ia` — flagship page. Targets "outil pour analyser sa
  masse grasse", "analyse masse grasse IA". Deep, factual, honest about
  method (photo-based estimate, not a DEXA scan).
- `/comparatif-app-calories` — targets "meilleure app calories",
  "NutraScan vs MyFitnessPal". Honest comparison table + narrative.

Each route: unique OG image, unique FAQPage schema matching its own visible
FAQ content (schema-content alignment), SoftwareApplication JSON-LD on `/`.

## Asset plan
- Hero visual (home): 2 candidates, calibration-grid/plate motif.
- Masse-grasse hero visual: abstract wireframe/scan-line body silhouette
  (never realistic/identifiable), oversized "%" integrated.
- 2 section plates: soft accent-tint ambient gradients.
- Content imagery: 5 feature-concept shots (meal scan, barcode, AI menu,
  AI coach chat, evolution chart) — illustrative/conceptual, not fake
  screenshots.
- Custom icon set: 10 glyphs (scan corporel, appareil photo, code-barres,
  IA/étincelle, chat, courbe, coche, feuille/nutrition, horloge, confidentialité)
  in accent stroke style, one sheet, background-removed.
- Logo/monogram: generated (no existing site/brand logo available in this
  environment) — simple "N" mark + scan-line motif, consistent family with
  favicon derivations.
- OG images: 3 (one per route), wide 1200×630, brand language.
- Head kit: favicon.ico/svg, apple-touch-icon, icon-192/512 + maskable,
  site.webmanifest, theme-color.

## Anti-convergence
First build in this chat — all six identity axes (palette, type, hero
architecture, technique, CTA garments, corner language) derived fresh from
the brief's material world (measurement, calibration, food, light).
Corner language: soft 12-16px radius throughout (instrument-panel feel, not
sharp/brutalist, not pill-everywhere).
