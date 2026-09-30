import { routes } from '@/lib/routes';
import type { NavLink } from '../site';

const { anchors } = routes.en;

export const site = {
  name: 'Copyisto',
  domain: 'copyisto.com',
  stage: 'an MVP-stage project',
  tagline: 'A digital scribe that understands your musical handwriting.',
  homeTitle: 'a digital scribe for music notation',
  ogLocale: 'en_GB',
} as const;

export const primaryNav: NavLink[] = [
  { href: anchors.howItWorks, label: 'How does it work?' },
  { href: anchors.why, label: 'Why harmony?' },
  { href: anchors.team, label: 'Team' },
  { href: '#', label: 'Blog', soon: true },
  { href: '#', label: 'Check your credits', soon: true },
];

export const nav = {
  label: 'Main',
  soon: 'Soon',
  menu: 'Menu',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
} as const;

export const languageSwitch = {
  label: 'PL',
  title: 'Wersja polska',
} as const;

export const footerNav = {
  privacy: { href: routes.en.privacy, label: 'Privacy policy (in Polish)' },
  cookieSettings: 'Cookie settings',
} as const;

export const consent = {
  title: 'Cookies',
  text:
    'We’d like to know how you use the site, so we can improve it. With your consent, we’ll use ' +
    'analytics cookies for that. You’ll find the details in our ',
  link: 'privacy policy (in Polish)',
  after: '.',
  deny: 'Decline',
  accept: 'Accept',
} as const;

export const cta = {
  openForm: 'Give a notebook',
  donate: 'Give your harmony notebook a second life',
  formHref: routes.en.form,
} as const;

export const formPage = {
  title: 'Give a notebook',
  description:
    'We’re collecting harmony notebooks in Wrocław. Give yours, help us train the model and get free early access.',
  back: '← Back to the home page',
} as const;

// ponytail: the English pages link to the Polish policy; this page itself stays Polish.
export const privacyPage = {
  title: 'Privacy policy',
  description: 'How Copyisto processes personal data and uses cookies.',
} as const;

export const notFound = {
  title: 'Page not found',
  eyebrow: 'Error 404',
  titleLead: 'This page is not',
  titleScript: 'in our notebook',
  body: 'The address may have changed or contain a typo. Start from the home page, or give us your notebook.',
  home: 'Back to the home page',
} as const;
