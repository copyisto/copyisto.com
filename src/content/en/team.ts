import type { TeamMember } from '../team';
import * as pl from '../team';

const [michal, oles] = pl.team;

export const team: TeamMember[] = [
  {
    ...michal,
    bio:
      'Pianist and composer, a graduate in composition from the Academy of Music in Wrocław, now studying mathematics. ' +
      'A software engineer at DIVEINAI since 2019, responsible for the architecture and upkeep of its production platform. ' +
      'Builds technology for live music, including Agogica.app, which keeps musicians in sync during a concert.',
  },
  {
    ...oles,
    bio:
      'Wrote a first app for checking harmony exercises as a computer science engineering thesis at the University of Wrocław. ' +
      'A professional programmer since 2017, at software houses and start-ups, from the interface to the cloud. ' +
      'Studies composition at the Academy of Music in Wrocław and performs original works at the piano and with live electronics.',
  },
];

export const teamCopy = {
  title: 'The Copyisto team',
  photo: 'photo',
} as const;

export const teamStatement =
  'We’re two engineers and musicians who set out to solve a problem ' +
  'that the biggest commercial music programs have been tripping over for years.';
