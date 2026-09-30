import type { ImageMetadata } from 'astro';
import type { Labelme } from '@/lib/labelme';
import manuscript from '@/assets/manuscript.jpg';
import manuscriptBoxes from '@/assets/manuscript-boxes.json';
import engravedMistakes from '@/assets/engraved-mistakes.json';

export const hero = {
  titleLead: 'Cyfrowy',
  titleScript: 'skryba',
  subtitle: 'który naprawdę rozumie Twój charakter pisma muzycznego',
  lead: 'Odczytujemy odręczne zadania z harmonii i automatycznie sprawdzamy je pod kątem błędów.',
  eyebrow: 'By musicians for musicians',
  ctaNote: 'Pomóż nam trenować model i zyskaj bezpłatny dostęp – do 12 miesięcy i więcej!',
  illustrationAlt:
    'Uczennica zapisuje nuty ołówkiem, obok laptop z cyfrową transkrypcją i zaznaczonym błędem',
} as const;

export const problem = {
  title: 'Dlaczego odręczne nuty to informatyczny koszmar?',
  body:
    'Programy muzyczne od lat świetnie radzą sobie ze sterylnym, generowanym komputerowo drukiem. ' +
    'Kiedy jednak widzą ołówek, skrzywioną pięciolinię i zamazaną główkę nuty – poddają się, uznając to za defekt. ' +
    'Tradycyjne algorytmy wymagają idealnych odstępów typograficznych, a ludzkie pismo łamie wszelkie zasady geometrii.',
  quote: 'Odzyskać setki godzin.',
  quoteCaption: 'Nasz cel',
  closing:
    'Nauczyciele harmonii w szkołach muzycznych spędzają setki godzin rocznie na żmudnym sprawdzaniu odręcznych prac. ' +
    'Chcemy stworzyć narzędzie, które wykona tę mechaniczną pracę za nich, zdejmując brzemię wprowadzania nut do edytorów cyfrowych. ' +
    'Zamiast marnować czas na rozszyfrowywanie grafitu, nauczyciele będą mogli skupić się na pracy twórczej z uczniem.',
} as const;

export interface Step {
  number: string;
  title: string;
  body: string;
  /** Steps 1 and 2 show the photo; step 3 renders the score reveal. */
  image?: { src: ImageMetadata; alt: string; boxes?: Labelme };
  /** Tab on the artwork's frame, naming what the figure shows. */
  frameLabel: string;
  /** true places the illustration on the left and the copy on the right. */
  reversed?: boolean;
  /** true stacks the copy above artwork that spans the full width. */
  wide?: boolean;
}

export const howItWorks = {
  eyebrow: 'Jak to działa',
  title: 'Od pogniecionej kartki do MusicXML.',
  steps: [
    {
      number: '01',
      frameLabel: 'Wejście · zdjęcie z telefonu',
      title: 'Zwykłe zdjęcie.',
      body:
        'Nie potrzebujesz skanera. Wystarczy zwykłe zdjęcie z telefonu. ' +
        'Nasz system sam prostuje perspektywę i izoluje ślad ołówka.',
      image: {
        src: manuscript,
        alt: 'Zdjęcie kartki ze szkolnym czterogłosem pisanym ołówkiem',
      },
    },
    {
      number: '02',
      frameLabel: 'Detekcja · klasyfikacja obiektów',
      title: 'Klasyfikacja obiektów przez CNN.',
      body:
        'Trenujemy głębokie sieci konwolucyjne do tego, aby rozpoznawały każdą nutę, klucz i krzywą laseczkę oddzielnie, ' +
        'radząc sobie z nakładającym się na siebie atramentem.',
      image: {
        src: manuscript,
        alt: 'To samo zdjęcie z ramkami wokół wykrytych obiektów: nut, kluczy, kresek taktowych i łuków',
        boxes: manuscriptBoxes,
      },
      reversed: true,
    },
    {
      number: '03',
      frameLabel: 'Wynik · zapis cyfrowy i weryfikacja',
      wide: true,
      title: 'Cyfrowy zapis i inteligentny asystent.',
      body:
        'Pojedyncze znaki są łączone w logiczną strukturę na podstawie reguł gramatyki muzycznej. ' +
        'Następnie system bezstratnie transkoduje je do formatu cyfrowego i przepuszcza przez algorytmy ' +
        'sprawdzające poprawność kontrapunktu klasycznego.',
    },
  ] satisfies Step[],
  /** Step 3: the engraving from `src/assets/engraved.svg` with the checker's findings. */
  score: {
    alt:
      'To samo zadanie w zapisie cyfrowym z zaznaczonymi błędami: podwojone tercje, równoległe kwinty, ' +
      'skok o sekundę zwiększoną i skok o tryton',
    mistakes: engravedMistakes satisfies Labelme,
    /**
     * One label per mistake box, in the order of `mistakes.shapes`. `from` is
     * where the arrow starts, `to` where it lands on the box, both in the
     * mistakes' pixel space. A `from` above the score (y < 0) puts the label
     * over it; below the score (y > imageHeight) puts it underneath.
     */
    callouts: [
      { text: 'Zdwojenie tercji', from: [2600, -260], to: [2150, 790] },
      { text: 'Zdwojenie tercji', from: [1100, 3860], to: [700, 3610] },
      { text: 'Równoległe kwinty', from: [3500, 3860], to: [1300, 3225] },
      { text: 'Sekunda zwiększona', from: [6000, -260], to: [5250, 2035] },
      { text: 'Skok o tryton', from: [5600, 3860], to: [5100, 3210] },
    ] as { text: string; from: [number, number]; to: [number, number] }[],
  },
} as const;

export const why = {
  eyebrow: 'Proof of concept',
  title: 'Zaczynamy od zadań z harmonii.',
  illustration: {
    src: '/assets/why-notebook.svg',
    alt: 'Uczennica przy biurku porównuje zadanie z harmonii w zeszycie z jego cyfrowym zapisem na tablecie, obok stos zeszytów',
  },
  body:
    'Dlaczego akurat harmonia? Czterogłos wokalny to idealne, zamknięte środowisko dla sztucznej inteligencji. ' +
    'Z góry znana tonacja, metrum i dokładnie cztery głosy drastycznie redukują przestrzeń błędów systemu. ' +
    'Budujemy na tym nasz fundament (Proof of Concept), aby z czasem skalować model na bardziej złożone, ' +
    'swobodne formy kompozytorskie. Obecnie zbieramy dane do uczenia – każdy dostarczony przez Was zeszyt ' +
    'z harmonii to krok w stronę lepszego algorytmu!',
} as const;

export const contact = {
  eyebrow: 'Kontakt',
  title: 'Masz pytanie albo pomysł? Napisz do nas.',
  body: 'Odpowiadamy na każdą wiadomość: o zbiórce zeszytów, o modelu i o tym, jak możesz pomóc.',
  email: 'Napisz do nas',
} as const;

export const closingCta = {
  title: 'Chcesz pomóc nam rozwijać Copyisto?',
  body: 'Jesteś nauczycielem lub uczniem, który ma w szafie stare zeszyty z harmonii? Odezwij się do nas!',
  credits:
    'Za przekazane materiały zbierasz kredyty do wykorzystania w narzędziu. Im więcej przekażesz, tym więcej ich masz.',
  creditsLink: 'Jak to działa',
  emailCta: 'Napisz e-mail',
  note: 'Przez najbliższy miesiąc zbieramy zeszyty we Wrocławiu. W zamian bezpłatny wczesny dostęp – do 12 miesięcy i więcej od uruchomienia narzędzia!',
} as const;
