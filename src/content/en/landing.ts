import manuscript from '@/assets/manuscript.jpg';
import manuscriptBoxes from '@/assets/manuscript-boxes.json';
import * as pl from '../landing';
import type { Step } from '../landing';

export const hero = {
  titleLead: 'A digital',
  titleScript: 'scribe',
  subtitle: 'that truly understands your musical handwriting',
  lead: 'We read handwritten harmony exercises and check them for mistakes automatically.',
  eyebrow: 'By musicians for musicians',
  ctaNote: 'Help us train the model and get free access – for 12 months or more!',
  illustrationAlt:
    'A student writing music in pencil, next to a laptop showing the digital transcription with a mistake marked',
} as const;

export const problem = {
  title: 'Why is handwritten music a computing nightmare?',
  body:
    'Music software has long handled clean, computer-generated print with ease. ' +
    'Show it pencil, a crooked stave and a smudged notehead, though, and it gives up, dismissing it all as a defect. ' +
    'Traditional algorithms need perfect typographic spacing, and human handwriting breaks every rule of geometry.',
  quote: 'Win back hundreds of hours.',
  quoteCaption: 'Our goal',
  closing:
    'Harmony teachers at music schools spend hundreds of hours a year on the tedious marking of handwritten work. ' +
    'We want to build a tool that does this mechanical work for them, lifting the burden of typing notes into music editors. ' +
    'Instead of wasting time deciphering graphite, teachers will be free to focus on the creative work with their students.',
} as const;

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From a crumpled page to MusicXML.',
  steps: [
    {
      number: '01',
      frameLabel: 'Input · a phone photo',
      title: 'An ordinary photo.',
      body:
        'You don’t need a scanner. An ordinary phone photo is enough. ' +
        'Our system straightens the perspective and isolates the pencil marks on its own.',
      image: {
        src: manuscript,
        alt: 'A photo of a page with a four-part school harmony exercise written in pencil',
      },
    },
    {
      number: '02',
      frameLabel: 'Detection · object classification',
      title: 'Object classification with a CNN.',
      body:
        'We train deep convolutional networks to recognise every note, clef and crooked stem separately, ' +
        'even where the pencil marks overlap.',
      image: {
        src: manuscript,
        alt: 'The same photo with boxes around the detected symbols: notes, clefs, barlines and ties',
        boxes: manuscriptBoxes,
      },
      reversed: true,
    },
    {
      number: '03',
      frameLabel: 'Output · digital score and check',
      wide: true,
      title: 'A digital score and a smart assistant.',
      body:
        'The individual symbols are assembled into a logical structure by the rules of music notation grammar. ' +
        'The system then transcodes them losslessly into a digital format and runs them through algorithms ' +
        'that check them against classical counterpoint.',
    },
  ] satisfies Step[],
  score: {
    ...pl.howItWorks.score,
    alt:
      'The same exercise as a digital score with the mistakes marked: doubled thirds, parallel fifths, ' +
      'a leap of an augmented second and a leap of a tritone',
    callouts: pl.howItWorks.score.callouts.map((callout, i) => ({
      ...callout,
      text: [
        'Doubled third',
        'Doubled third',
        'Parallel fifths',
        'Augmented second',
        'Tritone leap',
      ][i],
    })),
  },
} as const;

export const why = {
  eyebrow: 'Proof of concept',
  title: 'We start with harmony exercises.',
  illustration: {
    ...pl.why.illustration,
    alt: 'A student at a desk compares a harmony exercise in a notebook with its digital score on a tablet, beside a stack of notebooks',
  },
  body:
    'Why harmony? Four-part vocal writing is an ideal, closed environment for artificial intelligence. ' +
    'A known key, metre and exactly four voices drastically narrow the room for error. ' +
    'This is the foundation we’re building on, our proof of concept, before scaling the model to more complex, ' +
    'freer compositional forms. Right now we’re collecting training data – every harmony notebook you give us ' +
    'is a step towards a better algorithm!',
} as const;

export const contact = {
  eyebrow: 'Contact',
  title: 'A question or an idea? Write to us.',
  body: 'We answer every message: about the notebook collection, about the model and about how you can help.',
  email: 'Write to us',
} as const;

export const closingCta = {
  title: 'Would you like to help us build Copyisto?',
  body: 'Are you a teacher or a student with old harmony notebooks in a cupboard? Get in touch!',
  credits:
    'The notebooks you give us earn you credits to use in the tool. The more you give, the more you get.',
  creditsLink: 'How it works',
  emailCta: 'Send an email',
  note: 'For the next month we’re collecting notebooks in Wrocław. In return, you get free early access – for 12 months or more from the tool’s launch!',
} as const;
