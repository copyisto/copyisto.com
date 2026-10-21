import { EMAIL_ADDRESS, FACEBOOK_URL, INSTAGRAM_URL, TWITTER_URL } from 'astro:env/client';

/** Polish is the default and lives at the root; English lives under /en. */
export type Locale = 'pl' | 'en';

/** `Astro.currentLocale` is undefined outside a page render, which means Polish. */
export const localeOf = (current: string | undefined): Locale => (current === 'en' ? 'en' : 'pl');

/** Every internal destination in one place, so a route rename is a one-line change. */
const pages = {
  pl: { home: '/', form: '/formularz', privacy: '/polityka-prywatnosci' },
  // ponytail: the privacy policy is a lawyer's Polish text with no English version yet.
  en: { home: '/en', form: '/en/contribute', privacy: '/polityka-prywatnosci' },
} as const;

/** Section ids that are linked to from more than one page, in each language's words. */
const sections = {
  pl: { howItWorks: 'jak-to-dziala', why: 'dlaczego', team: 'zespol', credits: 'kredyty' },
  en: { howItWorks: 'how-it-works', why: 'why-harmony', team: 'team', credits: 'credits' },
} as const;

const localised = (locale: Locale) => {
  const page = pages[locale];
  const ids = sections[locale];
  return {
    ...page,
    ids,
    anchors: {
      howItWorks: `${page.home}#${ids.howItWorks}`,
      why: `${page.home}#${ids.why}`,
      team: `${page.home}#${ids.team}`,
      credits: `${page.form}#${ids.credits}`,
    },
  };
};

export const routes = { pl: localised('pl'), en: localised('en') };

export const routesFor = (current: string | undefined) => routes[localeOf(current)];

/**
 * The same page in the other language, for the language switch and hreflang.
 * A page without a translation (the privacy policy, a 404) falls back to the
 * other language's home page, and `alternates` is undefined.
 */
export function counterpart(pathname: string, current: string | undefined) {
  const locale = localeOf(current);
  const other: Locale = locale === 'pl' ? 'en' : 'pl';
  // A static build renders /formularz as /formularz.html and / as /index.html.
  const path = pathname.replace(/\.html$/, '').replace(/\/(index)?$/, '') || '/';
  const key = (Object.keys(pages[locale]) as (keyof (typeof pages)['pl'])[]).find(
    (k) => pages[locale][k] === path && pages[other][k] !== path,
  );
  return {
    locale: other,
    href: pages[other][key ?? 'home'],
    /** Both URLs, when this page has a translation. */
    alternates: key && { [locale]: pages[locale][key], [other]: pages[other][key] },
  };
}

export const CONTACT_EMAIL = EMAIL_ADDRESS;
export const mailto = `mailto:${CONTACT_EMAIL}`;

/** Public profiles linked from the footer; an unset URL hides its icon. */
export const profiles = {
  facebook: FACEBOOK_URL ?? '',
  instagram: INSTAGRAM_URL ?? '',
  twitter: TWITTER_URL ?? '',
} as const;

/** The account name in a profile URL: facebook.com/copyisto → "copyisto". */
// ponytail: assumes a vanity URL; a profile.php?id= page URL would need its id instead.
const handle = (url: string) => (url ? new URL(url).pathname.split('/').find(Boolean) : undefined);

const facebookHandle = handle(profiles.facebook);
const instagramHandle = handle(profiles.instagram);

/**
 * Temporary direct-message channels while notebooks are collected in person.
 * Each opens a chat, not just the profile; an unset profile hides its button.
 */
export const social = {
  instagram: instagramHandle ? `https://ig.me/m/${instagramHandle}` : '',
  messenger: facebookHandle ? `https://m.me/${facebookHandle}` : '',
} as const;
