<!--
Instructions for Claude Code, loaded at the start of every session.
Keep this file short and true for months: dated facts such as branch states or open bugs belong in issues or the README.
Claude Code strips HTML comments like this one before loading the file.
-->

# copyisto.com

The marketing and data-collection site for Copyisto.
`README.md` covers the architecture, analytics, the page-view Worker and deployment: read it before changing any of those.

## Product

Copyisto reads handwritten music notation from an ordinary phone photo, turns it into a digital score and checks it for mistakes.

- The proof of concept is four-part harmony exercises, the pencil "zadania z harmonii" of Polish music schools.
  A known key, metre and exactly four voices keep the recognition problem small; freer compositional forms come later.
- The pipeline, as the landing page describes it: straighten the photo and isolate the pencil → a CNN detects each symbol (staves, clefs, notes, barlines, ties) → notation-grammar rules assemble the symbols into musical structure → MusicXML → a checker flags classical voice-leading errors (parallel fifths, doubled thirds, augmented seconds, tritone leaps).
- The audience is harmony teachers, who spend hundreds of hours a year grading handwritten work, and their students.
  The tagline "By musicians for musicians" stays in English.
- The product is at MVP stage, and this site collects its training data: people hand over old harmony notebooks and get free early access and credits in return.
  Names and other personal data are removed before pages go into training.
- The recognition model and the product app live elsewhere, not in this repo.
- The founders, Michał Kulbacki and Oleś Kulczewicz, are both musicians and software engineers.
  Skip the basics of web development and of harmony.

## Commands

- `bun install`, then `bun run dev` for http://localhost:4321.
  Bun is the package manager and `bun.lock` is committed.
- `bun run build` runs Stylelint, the Prettier check, `astro check` and the build.
  It must pass before you call anything done.
- `bun run test` runs the page-view Worker's tests.
- `bun run format` formats the repo with Prettier.
- After a build, `npx wrangler dev` is the only way to run the Worker and `public/_redirects` locally; `astro dev` ignores both.

## Copy

- User-facing text is Polish and lives in `src/content/*.ts`, which components import.
  Don't hard-code new copy in components.
- Polish typography: a spaced en dash ( – ), never an em dash, and „…” quotation marks.
- Keep the existing voice and don't rewrite copy you weren't asked to touch.
  When you change copy, show the Polish before and after.

## Code

- One `.astro` file per component: markup, a scoped `<style>` and plain TypeScript in `<script>`.
  No React, Vue or other UI framework, and ask before adding any dependency.
- Colours and font families come only from the tokens in `src/styles/global.css`.
  Stylelint fails the build on a raw hex, an `rgb()` or `hsl()` in a colour property, or a font stack anywhere else.
- For spacing and body text sizes, reuse a `--space-*`, `--gap-*` or `--text-*` token before inventing a number.
  Display headings keep their own `clamp()` where they are used.
- Style a class handed to a child component with `:global(...)` in the parent, because a parent's scoped styles never reach a child's markup.
- Internal links come from `src/lib/routes.ts`.
- Build-time settings go through `astro:env`.
  Add a new variable to the schema in `astro.config.mjs`, to `.env.example` and to the README, and say that it also has to be added to Cloudflare's build variables.
- Animated figures use `data-reveal` and `src/lib/reveal.ts`: without JS, or with reduced motion, they show their final state.
  Keep that contract.
- Prettier skips `src/assets/`, `public/` and `docs/` on purpose, so exported artwork and data stay byte for byte as delivered.
  `src/assets/engraved.svg` is a Dorico PDF converted with `pdftocairo -svg`, and `src/lib/score-svg.ts` depends on that exact structure.
- Comments explain why, not what.
  Flag a known shortcut or assumption with a `ponytail:` comment, as in `routes.ts` and `score-svg.ts`.
- Write English with British spelling (colour, centred) in code, comments, docs and commits.
  In Markdown, put one sentence per line.
- Commit messages follow `git log`: a conventional prefix and a plain-English summary, such as `feat: collect notebooks in person in Wrocław for now`, with a prose body when the reason isn't obvious.

## Privacy and analytics

- PostHog loads only after the visitor accepts cookies; until then `posthog-js` isn't even downloaded.
  The Worker sets no cookie and stores no IP address.
  Don't weaken either.
- Don't add third-party requests: embeds, pixels, cookies, or scripts and fonts from a CDN.
  The privacy policy promises, among other things, that the site embeds no Facebook plugins or pixels.
- `docs/polityka-prywatnosci.md` is a lawyer's text, rendered verbatim: never edit it.
  If a change alters what data the site collects or who processes it (a newsletter provider, upload storage, user accounts, any new vendor), stop and say that the policy needs updating first.
- Tag every new call to action with `data-track`.
  Reuse the existing events (`form_cta_clicked`, `email_clicked`, `dm_clicked`, `social_clicked`) with a `data-track-location` before inventing new ones.
- In dev without the PostHog variables, accepting cookies logs "PostHog is not configured".
  That's expected.
- The social buttons and footer icons render only when `FACEBOOK_URL`, `INSTAGRAM_URL` or `TWITTER_URL` is set.
  Copy `.env.example` to `.env` to see them locally.

## Workflow

- `main` is production: Cloudflare Workers Builds deploys it.
  Work on a branch, and don't push, merge or deploy unless asked.
- Make small, clear changes directly.
  Propose a short plan first for anything that spans several components or touches the Worker, consent, analytics or deployment config.
- For visual changes, check a 360px-wide phone, a desktop width and `prefers-reduced-motion`, or say what needs checking.
