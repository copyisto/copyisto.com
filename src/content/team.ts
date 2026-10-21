import type { ImageMetadata } from 'astro';
import michalPhoto from '@/assets/team-michal.webp';
import olesPhoto from '@/assets/team-oles.webp';

export interface TeamMember {
  name: string;
  /** TODO: replace the placeholder copy carried over from the design. */
  bio: string;
  /** Square portrait; members without one keep the placeholder circle. */
  photo?: ImageMetadata;
  /** Personal site, shown as a small link under the name. */
  url?: string;
  /** The design gives the second member a quoted, rule-marked treatment. */
  emphasised?: boolean;
}

export const team: TeamMember[] = [
  {
    name: 'Michał',
    bio:
      'Pianista i kompozytor, absolwent kompozycji Akademii Muzycznej we Wrocławiu, obecnie student matematyki. ' +
      'Od 2019 roku inżynier oprogramowania w DIVEINAI, gdzie odpowiada za architekturę i utrzymanie platformy produkcyjnej. ' +
      'Tworzy technologie dla muzyki na żywo, m.in. Agogica.app do synchronizacji muzyków podczas koncertu.',
    photo: michalPhoto,
    url: 'https://michalkulbacki.com',
  },
  {
    name: 'Oleś',
    bio:
      'Pierwszą aplikację do sprawdzania zadań z harmonii napisał jako pracę inżynierską z informatyki na Uniwersytecie Wrocławskim. ' +
      'Programuje zawodowo od 2017 roku w software house’ach i startupach – od interfejsu po chmurę. ' +
      'Studiuje kompozycję w Akademii Muzycznej we Wrocławiu i sam wykonuje swoje utwory – przy fortepianie i z elektroniką na żywo.',
    photo: olesPhoto,
    url: 'https://kulczewicz.com',
  },
];

export const teamCopy = {
  title: 'Zespół Copyisto',
  /** Follows the member's name in the portrait's alt text. */
  photo: 'zdjęcie',
} as const;

export const teamStatement =
  'Jesteśmy dwójką inżynierów i muzyków, którzy postanowili rozwiązać problem, ' +
  'o który od lat potykają się największe komercyjne programy muzyczne.';
