export const formIntro = {
  eyebrow: 'Collecting in Wrocław',
  titleLead: 'Give your harmony notebook',
  titleScript: 'a second life',
  body:
    'For the next month we’re collecting notebooks in person in Wrocław. Harmony exercises, counterpoint ' +
    'drills, rough drafts full of pencil and eraser marks – the less perfect, the more valuable.',
  steps: [
    {
      number: '01',
      title: 'You write to us',
      body: 'By email or direct message.',
    },
    {
      number: '02',
      title: 'We arrange the handover',
      body: 'We agree on a place and time in Wrocław.',
    },
    {
      number: '03',
      title: 'You get early access',
      body: 'Free – for 12 months or more from the tool’s launch!',
    },
  ],
} as const;

export const collection = {
  local: {
    eyebrow: 'In Wrocław?',
    title: 'Write to us and we’ll arrange to collect your notebook.',
    body: 'Before any page goes into training the model, we remove names and other personal data from it.',
    email: 'Send an email',
    instagram: 'Message us on Instagram',
    messenger: 'Message us on Messenger',
  },
  remote: {
    eyebrow: 'Outside Wrocław?',
    title: 'An online form is coming soon.',
    body: 'We’ll let you know when you can send scans from anywhere.',
    email: 'Write to us',
  },
} as const;

export const credits = {
  eyebrow: 'Credits',
  title: 'The more you give, the more credits you collect.',
  body:
    'Every notebook you give us adds credits to your account, to spend in the tool once it launches. ' +
    'Credits don’t expire when the trial period ends.',
  points: [
    {
      number: '01',
      body: 'You hand over your material, we check it and add the credits to your account.',
    },
    {
      number: '02',
      body: 'What counts is the amount and the legibility of the writing.',
    },
    {
      number: '03',
      body: 'You can check your balance at any time with the ‘Check your credits’ button on the home page.',
      soon: true,
    },
  ],
  footnote: 'We’ll announce the exact rate when the tool launches.',
} as const;
