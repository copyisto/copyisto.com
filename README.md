# copyisto.com

Marketing site for Copyisto, a tool that reads handwritten music notation and checks four-part harmony exercises for errors.

Three static pages in Polish: the landing page, a page for contributing notebooks, and the privacy policy.

Built with [Astro](https://astro.build). No client framework.

## Requirements

Node 22.12 or newer.

## Getting started

```sh
bun install
bun run dev
```

Or with npm:

```sh
npm install
npm run dev
```

The site runs at http://localhost:4321.

`bun.lock` is the committed lockfile, so bun gives a reproducible install.
npm works too, but resolves its own tree.

## Scripts

| Script    | Description                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `dev`     | Start the dev server                                                                 |
| `build`   | Lint, type check and build to `dist/`                                                |
| `preview` | Serve the production build locally                                                   |
| `lint`    | Lint all CSS, including the `<style>` block in every component, and check formatting |
| `test`    | Run the page-view Worker's checks with the built-in Node test runner                 |
| `format`  | Format the repo with Prettier                                                        |

## Structure

```
src/
├─ pages/          one file per route
├─ layouts/        Base.astro: head, metadata, icons
├─ components/     one file per component: markup, styles and script
├─ content/        all copy, typed
├─ lib/            routes, icons, cookie consent and analytics
├─ styles/         global.css: design tokens, reset, shared classes
└─ assets/         illustrations inlined at build
docs/              the privacy policy, rendered verbatim at /polityka-prywatnosci
worker/            the Worker in front of the static site: counts page views
```

Every component is a single `.astro` file.
Its styles live in a scoped `<style>` block and are extracted into a real stylesheet at build.

## Score assets

`src/assets/engraved.svg` is the Dorico PDF converted with `pdftocairo -svg`, which outlines every glyph.
Dorico's own SVG export draws noteheads as text in its Leipzig font, so it only renders on machines that have Leipzig installed.
`src/lib/score-svg.ts` reads that pdftocairo structure to order the step-three animation.

## Styling

Colours, fonts, spacing and the type ramp are custom properties in `src/styles/global.css`.
Components reference them with `var(--…)` and never write literal values.

`bun run lint` fails on a raw hex, an `rgb()` literal in a colour property, or a bare font stack anywhere outside `global.css`.

The header, every section and both footers take the `.gutter` class instead of setting a max-width of their own.
It pads them by `--gutter` and, once the content would grow past `--content-width`, widens the padding instead, so the whole site shares one left and one right edge.

## Forms

Notebooks are collected in person in Wrocław for now, so the contribution page offers e-mail and direct messages instead of an upload.
The Instagram and Messenger buttons open a chat with the accounts behind the `INSTAGRAM_URL` and `FACEBOOK_URL` build variables (see `.env.example`).
Each button appears only when its variable is set.
The upload form waits on the `feat/upload-form` branch.

The newsletter waits on the `feat/newsletter` branch until its November launch.
Merge that branch to bring the sign-up form back.
Until then the landing footer and the contribution page offer a "write to us" e-mail link instead.
Every e-mail button uses the `EMAIL_ADDRESS` build variable, which defaults to `kontakt@copyisto.com`.

The credits lookup has no backend yet, so "Sprawdź swoje kredyty" shows in the navigation as "Wkrótce", like the blog.
Its former mock-up (a popover and a drawer panel resolving a fake result) lives in git history, in `src/components/layout/CreditsPopover.astro`.

The footer shows Facebook, Instagram and X icons for the profiles named by the `FACEBOOK_URL`, `INSTAGRAM_URL` and `TWITTER_URL` build variables.
Each icon appears only when its variable is set.

## Analytics

PostHog runs only with consent.
`src/components/ConsentBanner.astro` asks on the first visit and stores the answer in the `cookie_consent` cookie (`granted` or `denied`, 12 months).
Until the answer is `granted`, `src/lib/analytics.ts` does not even download `posthog-js`, so nothing is sent and nothing is stored on the device.
Withdrawing consent through "Ustawienia cookies" in the footer opts out, stops session recording and deletes every `ph_` cookie and storage key.

Once running, PostHog autocaptures clicks and pageviews and records sessions with inputs masked.
It also reads `utm_*` parameters from the landing URL, so tag shared links like `https://copyisto.com/?utm_source=facebook&utm_medium=social&utm_campaign=post-2026-09-30`.
The query string is removed from the address bar once it has been read: after the first `$pageview` with consent, straight away without it.
On top of that, any element tagged `data-track="event_name"` sends that named event on click, with every other `data-track-*` attribute as a property.
The tagged events are `form_cta_clicked`, `email_clicked`, `dm_clicked` and `social_clicked`, each with a `location`, `channel` or `network`.

The site has no adapter yet.
The upload endpoint will need one, for example `@astrojs/cloudflare`, with the route at `src/pages/api/` opting out of prerendering via `export const prerender = false` while the pages stay static.
Uploads accept files up to 20 MB, which exceeds a serverless request body limit, so the real implementation should issue a signed URL and let the browser upload directly to storage.

### Page views without consent

`worker/index.js` runs in front of the static site for every page (not for `/_astro/` or `/assets/`).
It writes one data point per page view to the `copyisto_visits` Workers Analytics Engine dataset, then serves the page unchanged.
It records the path, the `utm_source`, `utm_medium`, `utm_campaign` and `utm_content` parameters, the referring site, the country and the status code.
It stores no IP address, sets no cookie, runs nothing in the browser and skips link-preview bots such as `facebookexternalhit`.

Query the counts with the SQL API, using an API token with the Account Analytics read permission:

```sh
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/analytics_engine/sql" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d "SELECT blob2 AS source, blob4 AS campaign, SUM(_sample_interval) AS visits
      FROM copyisto_visits
      WHERE timestamp > NOW() - INTERVAL '30' DAY
      GROUP BY source, campaign
      ORDER BY visits DESC"
```

The columns are `blob1` path, `blob2` source, `blob3` medium, `blob4` campaign, `blob5` content, `blob6` referrer, `blob7` country and `blob8` status.

## Known gaps

- Team bios and two profile photos are placeholders in `src/content/team.ts`.
- `/regulamin` redirects to the privacy policy through `public/_redirects`; `astro dev` ignores that file, so check redirects with `wrangler dev`.

## Deployment

`bun run build` writes a fully static site to `dist/`.
Cloudflare Workers Builds then runs `npx wrangler deploy`, which uploads `dist/` as static assets per `wrangler.jsonc`.
