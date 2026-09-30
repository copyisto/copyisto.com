import type { ImageMetadata } from 'astro';
import type { Labelme } from '@/lib/labelme';
import { localeOf, type Locale } from '@/lib/routes';
import * as plSite from './site';
import * as plLanding from './landing';
import * as plFormularz from './formularz';
import * as plTeam from './team';
import * as enSite from './en/site';
import * as enLanding from './en/landing';
import * as enFormularz from './en/formularz';
import * as enTeam from './en/team';

/** The Polish copy's shape with every string widened, so a translation must match it key for key. */
type Widen<T> = T extends string
  ? string
  : T extends ImageMetadata | Labelme
    ? T
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T;

const pl = { ...plSite, ...plLanding, ...plFormularz, ...plTeam };

export type Copy = Widen<typeof pl>;

const copy: Record<Locale, Copy> = {
  pl,
  en: { ...enSite, ...enLanding, ...enFormularz, ...enTeam },
};

/** All copy for the page being rendered: `copyFor(Astro.currentLocale)`. */
export const copyFor = (current: string | undefined) => copy[localeOf(current)];
