# NutraScan blog operator - playbook

GEO/SEO content operator for nutrascan.fr. Publishes one new article at a
time, straight to the live site, fully automatic (no review before publish -
explicit user instruction). Target cadence: ~3x/week.

## Why flat HTML, not the TanStack app
The main site (`/`, `/analyse-masse-grasse-ia/`, `/comparatif-app-calories/`)
is built from a TanStack Start app on the `source` branch and compiled to
static HTML (see the main site memory / earlier session notes for the full
bun/wrangler rebuild pipeline). That pipeline is fine for the 3 hand-crafted
pillar pages but too heavy/fragile to run on every single blog post (full
rebuild, hashed asset bundle, Tailwind JIT-purged CSS that only contains
classes used at build time). Blog articles are instead **self-contained flat
HTML files**, hand-authored per article, styled with a plain hand-written
stylesheet (`/assets/blog.css` - does NOT depend on the Tailwind bundle),
pushed directly onto the live `main` branch (via local branch `live-static`).
This is deliberate, not a shortcut - do not try to route new articles through
the TanStack build.

## Hard rules (do not violate)
1. **GEO structure on every article** (matches the site's existing pattern,
   audited and confirmed solid on the 3 pillar pages): direct answer in the
   first ~100 words, real question-shaped `<h2>`s, a short-answer FAQ section,
   `Organization` + `Article` + `FAQPage` JSON-LD (reuse the Organization
   block verbatim from any existing page).
2. **No invented numbers/stats/precision claims.** Every factual claim about
   what NutraScan does must be verifiable against `project_nutrascan.md`
   memory or the actual app code - if unsure whether a feature works a
   certain way, don't state it as fact.
3. **Reuse existing images** (`/assets/feature-*.jpg`, `/assets/hero-*.jpg`) -
   never invent/generate a new image for a blog post.
4. **One topic = one real, accurate article.** Don't pad or repeat content
   across articles just to hit the cadence.

## Every run, do this in order
1. Read `content-ops/topics.json`. Pick the first entry with
   `"status": "pending"`. If the list is running low (<5 pending), add 4-6
   more topics in the same style (French, question-shaped, GEO-relevant to
   nutrition/masse grasse/calories/IA, not yet covered) before continuing.
2. Write the article as `blog/<slug>/index.html`, following the exact
   structure of `blog/formule-katch-mcardle-calories/index.html` (copy its
   `<head>` boilerplate, nav, JSON-LD shape, `.ns-cta` block - only change the
   content). Use `/assets/blog.css` for styling, do not inline new styles.
   Pick the most topically relevant existing image from `/assets/` for
   `og:image`/hero.
3. Add the new article as a card at the top of the list in `blog/index.html`
   (inside the `<!-- ns-blog-list -->` comment block).
4. Add two entries to `sitemap.xml`: nothing needed for `/blog/` itself
   (already listed) unless it's the very first article - just add the new
   article URL with today's date, `changefreq monthly`, `priority 0.7`.
5. Add the new article to the `## Pages` list in `llms.txt` (indented under
   the `- [Blog]` line, same format as the existing entry).
6. Mark the topic `"status": "published"` and add `"published_at"` (today's
   date) in `topics.json`.
7. Commit and push:
   ```
   cd ~/Sites/nutrascan-site
   git add blog/ content-ops/topics.json sitemap.xml llms.txt
   git commit -m "content-ops: blog article - <slug>"
   git push github live-static:main
   ```
8. Wait for it to actually be live before considering the run done:
   `curl -s -o /dev/null -w '%{http_code}' https://nutrascan.fr/blog/<slug>/`
   until it returns 200 (GitHub Pages Actions deploy - can occasionally hang,
   see the TikTok operator's PLAYBOOK.md troubleshooting section for the
   cancel-and-retry fix if it's stuck >5 min).
9. Ping IndexNow so Bing picks it up fast:
   ```
   curl -s -X POST https://api.indexnow.org/indexnow \
     -H "Content-Type: application/json" \
     -d '{"host":"nutrascan.fr","key":"c14bd96007f951a6be680a12b4e52811","keyLocation":"https://nutrascan.fr/c14bd96007f951a6be680a12b4e52811.txt","urlList":["https://nutrascan.fr/blog/<slug>/","https://nutrascan.fr/blog/","https://nutrascan.fr/sitemap.xml"]}'
   ```

## Files
- `content-ops/topics.json` - the topic backlog (grow it when low, see step 1).
- `content-ops/BLOG_PLAYBOOK.md` - this file.
- `assets/blog.css` - shared stylesheet for all blog pages, matches the main
  site's palette (`#F8F9FB` / `#14181C` / `#5B6670` / `#2E6B82` / `#6FA8C1` /
  `#EAF3F6`, Plus Jakarta Sans + JetBrains Mono).
- `blog/index.html` - the article listing page.
- `blog/<slug>/index.html` - one per article.

## First article (reference example)
`blog/formule-katch-mcardle-calories/index.html`, published 2026-08-06.
Use it as the template for structure/tone/JSON-LD shape for every future
article.
