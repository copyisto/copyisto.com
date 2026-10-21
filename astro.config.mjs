// @ts-check
import { defineConfig, envField } from 'astro/config';

// Fully static: `astro build` writes plain files to dist/ for any static host.
// A server endpoint (the upload needs one) will need an adapter, e.g.
// @astrojs/cloudflare, with that route opting out via `export const prerender = false`.
export default defineConfig({
  site: 'https://copyisto.com',
  // Emit formularz.html rather than formularz/index.html, so Cloudflare serves
  // /formularz as is instead of redirecting every link to /formularz/.
  build: { format: 'file' },
  trailingSlash: 'never',
  // Polish at the root, English under /en; components read Astro.currentLocale.
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    routing: { prefixDefaultLocale: false },
  },
  env: {
    schema: {
      // Public contact address behind every "write to us" button and the legal text.
      EMAIL_ADDRESS: envField.string({
        context: 'client',
        access: 'public',
        default: 'kontakt@copyisto.com',
      }),
      // Full profile URLs for the footer icons and the direct-message buttons on
      // the contribution page. Read at build time; a missing one hides both.
      FACEBOOK_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      INSTAGRAM_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      TWITTER_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_POSTHOG_PROJECT_TOKEN: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_POSTHOG_HOST: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
