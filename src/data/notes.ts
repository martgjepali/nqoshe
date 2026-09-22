import type { SpotNote } from '../lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   YOUR NOTES. This is the file you edit.

   tirana-spots.json is scraped and stays untouched. This is the other half:
   the things you only learn by sitting somewhere. Add, edit and delete freely,
   nothing else in the app has to change.

   Add one like this:

     'spot-id': [
       { kind: 'wifi',  sq: 'Fjalëkalimi: <...>',        en: 'Wifi password: <...>' },
       { kind: 'view',  sq: 'Pamja nga tarraca lart.',   en: 'The view from the top terrace.' },
       { kind: 'corner',sq: 'Tavolina e fundit majtas.', en: 'The last table on the left.' },
       { kind: 'tip',   sq: 'Eja para orës 10.',          en: 'Come before ten.' },
       { kind: 'heads_up', sq: 'Vetëm cash.',             en: 'Cash only.' },
     ],

   The five kinds each get their own icon and colour:
     wifi     a password or a network quirk
     view     something worth looking at
     corner   the specific seat or spot to aim for
     tip      anything else useful
     heads_up something to know before you go

   The spot id is the `id` field in tirana-spots.json: streha, 505, momus,
   tirana-times, friends-book-house, clique22, rubi, hana, mimoza, noje,
   destil, izzy, city-art, libraria-bar, moncheri-sami, moncheri-gjuhet,
   tonys, mulliri-elbasanit, nektar, ndritero, le-chateau, dangelo, komiteti,
   trinity, innospace, social-hub, dutch-hub, pyramid.

   The seeded notes below are drawn from facts already in the dataset, so
   nothing here is invented. No wifi password is recorded for anywhere yet:
   the app shows that gap out loud rather than hiding it, which is the point.
   ═══════════════════════════════════════════════════════════════════════════ */

export const spotNotes: Record<string, SpotNote[]> = {
  streha: [
    {
      kind: 'corner',
      sq: 'Muri me libra në fund të sallës, pranë tryezës së gjatë.',
      en: 'The book wall at the back of the room, by the long shared table.',
    },
    {
      kind: 'tip',
      sq: 'Muzeu i Mozaikut është ngjitur, po deshe një pushim.',
      en: 'The Mosaic of Tirana museum is next door if you need a break.',
    },
  ],
  '505': [
    {
      kind: 'tip',
      sq: 'Çizkejk i ri çdo ditë. Filxhanët janë porcelan, asnjë si tjetri.',
      en: 'A fresh cheesecake every day. The cups are porcelain, no two alike.',
    },
    { kind: 'heads_up', sq: 'Vetëm cash.', en: 'Cash only.' },
  ],
  'moncheri-sami': [
    {
      kind: 'view',
      sq: 'Oborri i gjelbër prapa. Vendi më i qetë nga të gjitha degët.',
      en: 'The green courtyard at the back. The quietest of all the branches.',
    },
  ],
  destil: [
    {
      kind: 'corner',
      sq: 'Tavolinat nën pemë. Studentët e arkitekturës i dinë.',
      en: 'The tables under the trees. The architecture students know.',
    },
  ],
  clique22: [
    {
      kind: 'view',
      sq: 'Tarraca në katin e tretë, mbi çatitë.',
      en: 'The third-floor terrace, out over the roofs.',
    },
  ],
  hana: [
    {
      kind: 'view',
      sq: 'Oborri nën hijen e pemës, me dritë të shpërndarë gjithë ditën.',
      en: 'The tree-shaded courtyard, dappled all day.',
    },
  ],
  mimoza: [
    {
      kind: 'corner',
      sq: 'Salla e brendshme, larg tymit. 80 metra nga Nöje.',
      en: 'The indoor room, away from the smoke. 80m from Nöje.',
    },
  ],
  noje: [
    {
      kind: 'tip',
      sq: 'Kroasantët mbarojnë herët të shtunave.',
      en: 'The croissants sell out early on Saturdays.',
    },
  ],
  rubi: [
    {
      kind: 'tip',
      sq: 'Brenda është i ngushtë. Dega e Komunës ka hapësirë të madhe jashtë.',
      en: 'Snug inside. The Komuna branch has the big outdoor space.',
    },
  ],
  'friends-book-house': [
    {
      kind: 'corner',
      sq: 'Kolltukët e lëkurës. Libraria e parë me kafe në Tiranë, që nga 2002.',
      en: 'The leather armchairs. The first book café in Tirana, open since 2002.',
    },
  ],
  izzy: [
    {
      kind: 'heads_up',
      sq: 'Muzika nis rreth 16:30. Para asaj, qetësi.',
      en: 'The music starts around 16:30. Before that, quiet.',
    },
  ],
  'tirana-times': [
    {
      kind: 'heads_up',
      sq: 'Jashtë bëhet zhurmë në orët e shkollës. Brenda jo.',
      en: 'Noisy outside during school hours. Not inside.',
    },
  ],
};

export const notesFor = (id: string): SpotNote[] => spotNotes[id] ?? [];
