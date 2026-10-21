import { routes } from '@/lib/routes';

const { anchors } = routes.pl;

export const site = {
  name: 'Copyisto',
  domain: 'copyisto.com',
  stage: 'projekt w fazie MVP',
  tagline: 'Cyfrowy skryba, który rozumie Twój charakter pisma muzycznego.',
  /** The home page's title, after the site name. */
  homeTitle: 'cyfrowy skryba dla zapisu nutowego',
  /** og:locale */
  ogLocale: 'pl_PL',
} as const;

export interface NavLink {
  href: string;
  label: string;
  /** Renders as non-clickable text with a "Wkrótce" badge. */
  soon?: boolean;
}

export const primaryNav: NavLink[] = [
  { href: anchors.howItWorks, label: 'Jak to działa?' },
  { href: anchors.why, label: 'Dlaczego harmonia?' },
  { href: anchors.team, label: 'Zespół' },
  { href: '#', label: 'Blog', soon: true },
  { href: '#', label: 'Sprawdź swoje kredyty', soon: true },
];

export const nav = {
  label: 'Główna',
  soon: 'Wkrótce',
  menu: 'Menu',
  openMenu: 'Otwórz menu',
  closeMenu: 'Zamknij menu',
} as const;

/** The link to the other language, written in that language. */
export const languageSwitch = {
  label: 'EN',
  title: 'English version',
} as const;

export const footerNav = {
  privacy: { href: routes.pl.privacy, label: 'Polityka prywatności' },
  /** A button, not a link: it reopens the consent banner. */
  cookieSettings: 'Ustawienia cookies',
} as const;

export const consent = {
  title: 'Pliki cookies',
  /** Runs straight into the privacy-policy link, then `after`. */
  text:
    'Chcemy wiedzieć, jak korzystasz ze strony, żeby ją ulepszać. Za Twoją zgodą użyjemy do tego ' +
    'analitycznych plików cookies. Szczegóły znajdziesz w ',
  link: 'polityce prywatności',
  after: '.',
  deny: 'Odrzucam',
  accept: 'Akceptuję',
} as const;

export const cta = {
  openForm: 'Przekaż zeszyt',
  donate: 'Podaruj swojemu zeszytowi z harmonii drugie życie',
  formHref: routes.pl.form,
} as const;

export const formPage = {
  title: 'Przekaż materiały',
  description:
    'Zbieramy zeszyty z harmonii we Wrocławiu. Przekaż swój, pomóż wytrenować model i zyskaj bezpłatny wczesny dostęp.',
  back: '← Wróć na stronę główną',
} as const;

export const privacyPage = {
  title: 'Polityka prywatności',
  description: 'Jak Copyisto przetwarza dane osobowe i korzysta z plików cookies.',
} as const;

export const notFound = {
  title: 'Nie znaleziono strony',
  eyebrow: 'Błąd 404',
  titleLead: 'Tej strony nie ma',
  titleScript: 'w naszym zeszycie',
  body: 'Adres mógł się zmienić albo zawierać literówkę. Zacznij od strony głównej lub przekaż nam swoje materiały.',
  home: 'Wróć na stronę główną',
} as const;
