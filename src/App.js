import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useParams, useLocation, Navigate } from 'react-router-dom';

// ============================================================
// DATA
// ============================================================

// Media helpers. Posters/stills are self-hosted under public/media (Drive
// hotlinking rate-limits and gets ORB-blocked); Drive videos embed via
// /preview and the original share links are kept for external redirects.
const media = (file) => `${process.env.PUBLIC_URL || ''}/media/${file}`;
const driveFolder = (id) => `https://drive.google.com/drive/folders/${id}`;

const videoEmbedUrl = (video, { autoplay = false } = {}) => {
  if (!video) return null;
  if (video.platform === 'youtube') {
    const params = new URLSearchParams({ rel: '0' });
    if (video.list) params.set('list', video.list);
    if (autoplay) params.set('autoplay', '1');
    return `https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`;
  }
  return `https://drive.google.com/file/d/${video.id}/preview`;
};

const posterPlaceholder = (initial) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="#161310"/><circle cx="450" cy="560" r="260" fill="none" stroke="#8a7a5c" stroke-width="2" opacity="0.5"/><circle cx="450" cy="560" r="170" fill="none" stroke="#8a7a5c" stroke-width="1.5" opacity="0.35"/><text x="450" y="606" font-family="Noto Serif Devanagari, serif" font-size="130" fill="#d8cbb0" text-anchor="middle">${initial}</text></svg>`
  )}`;

const FILMS = [
  {
    slug: 'haalaat',
    title: 'Haalaat',
    titleDeva: 'हालात',
    subtitle: 'State',
    type: 'Documentary',
    year: '2020',
    runtime: '09 min',
    language: 'Hindi',
    role: 'Director · Cinematographer · Editor · Poetry · Producer',
    synopsis:
      'A film made in COVID-19 lockdown at home. Caught up in stillness. Thoughts like void in an empty box. No sense of the passing time. Emptiness. Anxieties, ecstasies and mixed hopes for an uncertain tomorrow.',
    achievements: [
      'Jury Award · Quarantine International Film Festival (2020)',
      'CHINH Silver Award · CHINH Youth Film Festival (2020)',
      'Official Selection · 17th Mumbai International Film Festival (MIFF)',
      'Official Selection · Cine Masala Film Festival, University of Lausanne, Switzerland (2020)',
      'Official Selection · 23rd Madurai International Short Film and Documentary Film Festival',
      'Official Selection · 10th Chennai International Short Film and Documentary Film Festival',
      'Official Selection · 5th South Asian Film Festival, Kolkata',
      'Official Selection · Mumbai International Cult Film Festival (2020)',
      'Semi Finalist · Best Film on COVID-19 Crisis · International Moving Film Festival, Iran',
      'Semi Finalist · Best DOP, Best Editor, Best Poster · International Moving Film Festival, Iran',
      'Released on OTT · MovieSaints (2022)',
    ],
    links: [
      { label: 'YouTube Live · Conversation on Haalaat', url: 'https://www.youtube.com/live/ZdeFxBqAJ24?si=48Q1MG5pVXK_gn4C&t=1250' },
      { label: 'Instagram · Feature', url: 'https://www.instagram.com/p/COaM3c2nrA7/?utm_source=ig_web_copy_link' },
      { label: 'The Hindu · Auroville films make a splash at Swiss festival', url: 'https://www.thehindu.com/news/cities/puducherry/minimalistic-works-from-auroville-film-institute-make-a-splash-at-swiss-festival/article33110864.ece' },
      { label: 'The Hindu · 11 films from Auroville institute selected for Mumbai festival', url: 'https://www.thehindu.com/news/cities/puducherry/11-films-from-auroville-institute-selected-for-mumbai-festival/article65476378.ece' },
      { label: 'New Indian Express · AFI shorts win accolades at film festivals', url: 'https://www.newindianexpress.com/states/tamil-nadu/2022/Jan/15/four-short-films-of-auroville-film-institute-wins-accolades-at-film-festivals-2407281.html' },
      { label: 'PIB · Press release, Mumbai International Film Festival', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1830373' },
      { label: 'University of Lausanne · Cine Masala programme note', url: 'https://api.unil.ch/newsunil/v1/api-newsunil/resources/document/1604672901103.D1604673270944?2020-11-10T09:29:05' },
    ],
    poster: media('haalaat-poster.jpg'),
    stills: [media('haalaat-still.jpg')],
    stillsUrl: driveFolder('1QNSPu21vHn4LL3xvFd_87Dtmzh81hwte'),
    video: { platform: 'youtube', id: 'OUnhn3lvuDs', url: 'https://youtu.be/OUnhn3lvuDs?si=7D7WEPunZJnKGNcu', label: 'Watch the film' },
  },
  {
    slug: 'gadha-ghum-raha-hai',
    title: 'gadha ghum raha hai',
    titleDeva: 'गधा घूम रहा है',
    subtitle: 'A Donkey’s Wandering',
    type: 'Fiction',
    year: '2022',
    runtime: '30 min',
    language: 'Marathi · Hindi',
    role: 'Writer · Director · Cinematographer · Editor · Producer',
    synopsis:
      'Palash, in his chaotic work calls and routine, spots a donkey standing in the middle of a busy street. In a curious connection, he starts looking for its whereabouts over the weekend. Curiosity translates into responsibility, as their bond grows closer in a material and preoccupied world.',
    achievements: [
      'Official Selection · 4th International Shades Film Festival, Kerala',
      'Official Selection · 15th International Documentary and Short Film Festival of Kerala',
      'Official Selection · 12th International Film Festival of South Asia, Toronto',
      'Screening · SOSE, Delhi',
      'Screening · Meraki, Nagpur',
    ],
    links: [],
    poster: media('gadha-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('17BdtjEJRDSCcCXpBP6hFHMM0IgWLABna'),
    video: { platform: 'youtube', id: 'qoE5MTL2O60', url: 'https://youtu.be/qoE5MTL2O60', label: 'Watch the trailer' },
  },
  {
    slug: 'cycle-of-life',
    title: 'Cycle of Life',
    titleDeva: 'जीवन चक्र',
    subtitle: '',
    type: 'Documentary',
    year: '2024',
    runtime: '08:30 min',
    language: 'Marathi',
    role: 'Research · Director · Editor · Sound',
    synopsis:
      'An intimate exploration of change witnessed through the life of Umesh Sarate, an age-old cycle customer of Shinde Cycle Store, in Nagpur. He travels to the city to buy wholesale goods from the local market, as he rents a cycle from the store.',
    achievements: [
      'Screened · 17th IDSFFK, Kerala',
      'Screened · Conscious Collective, Mumbai (2024)',
      'Screened · Museo, Gurgaon',
      'Screened · MOD, Bangalore',
      'Screened · MAP, Bangalore',
      'Screened · Udaipur Film Club',
      'Screened · FilmsAajKal, Chandigarh',
    ],
    links: [
      { label: 'Homegrown · Cycle of Life: the bicycle and Indian urban mobility', url: 'https://homegrown.co.in/homegrown-creators/cycle-of-life-watch-a-documentary-tracing-the-bicycles-impact-on-indian-urban-mobility' },
      { label: 'STIR World · The Nagari Bioscope: cinematic explorations on mobility', url: 'https://www.stirworld.com/see-features-the-nagari-bioscope-prompts-cinematic-explorations-on-mobility-in-urban-india' },
    ],
    poster: media('cycle-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('1IT3FyGXMA2buCPr1Bo9W3B4P_jFFlwKn'),
    video: { platform: 'youtube', id: 'PNfe3u8qwvE', url: 'https://youtu.be/PNfe3u8qwvE?si=jcfgpZp3MaPp8x7J', label: 'Watch the film' },
  },
  {
    slug: 'anokha-dhaaga',
    title: 'Anokha Dhaaga',
    titleDeva: 'अनोखा धागा',
    subtitle: 'Tata Power CSR',
    type: 'CSR Film',
    year: '2024',
    runtime: '05:04 min',
    language: 'Hindi',
    role: 'Video Producer · Director · Editor · Sound Recordist',
    synopsis:
      'A brief look at women in Jamshedpur’s villages who are turning collective support into real livelihood opportunities, with Tata Power CSR.',
    achievements: [],
    links: [],
    poster: media('anokha-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('1Gu_RDJR8dlMckogDcYGAr6p7qGsPZ3xv'),
    video: { platform: 'drive', id: '1aVDHBIRdqbn9cbFqBFm5uFGHztSDYoQ8', url: 'https://drive.google.com/file/d/1aVDHBIRdqbn9cbFqBFm5uFGHztSDYoQ8/view?usp=share_link', label: 'Watch the film' },
  },
  {
    slug: 'nisargavedh',
    title: 'Nisargavedh',
    titleDeva: 'निसर्गवेध',
    subtitle: 'Nature for Future',
    type: 'NGO Profile',
    year: '2025',
    runtime: '18 min',
    language: 'Hindi',
    role: 'Video Producer · Director · Cinematographer · Editor',
    synopsis:
      'Documentary on environment and education initiatives by CHIP NGO, Nagpur.',
    achievements: [],
    links: [],
    poster: media('nisarga-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('1hW89zHWWhe_8L-NWWio2NvmXDyGAZPWf'),
    video: { platform: 'drive', id: '1pM1gAMUjDCyjY2TuuMtLlhFaku1T9Lx-', url: 'https://drive.google.com/file/d/1pM1gAMUjDCyjY2TuuMtLlhFaku1T9Lx-/view?usp=share_link', label: 'Watch the film' },
  },
  {
    slug: 'baal-diwas',
    title: 'Baal Diwas',
    titleDeva: 'बाल दिवस',
    subtitle: '',
    type: 'Fiction',
    year: '2022',
    runtime: '20 min',
    language: 'Marathi',
    role: 'Cinematographer · Editor',
    synopsis:
      'Young ‘Gotya’ is fascinated with playing marbles, but circumstances force him to grow from a boy to a man. Set in rural Vidarbha.',
    achievements: ['Official Selection · Madurai International Film Festival'],
    links: [],
    poster: media('baal-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('1K5DPkbMYjd4rgAPZyxvQ9hdDkDCxANoa'),
    video: { platform: 'drive', id: '1U_aZbmpCyojTKCUS7Ca_kHxHDbUFzX5n', url: 'https://drive.google.com/file/d/1U_aZbmpCyojTKCUS7Ca_kHxHDbUFzX5n/view', label: 'Watch the film' },
  },
  {
    slug: 'astitva-ka-tinka',
    title: 'Astitva ka Tinka',
    titleDeva: 'अस्तित्व का तिनका',
    subtitle: '',
    type: 'Documentary',
    year: '2025',
    runtime: '06:17 min',
    language: 'Hindi',
    role: 'Director · Cinematographer · Editor',
    synopsis:
      'Bharatbhai, who works at a food (dabeli) cart in Kutch, Bhuj, reminisces about his past life in juggling memories, as he contemplates on ‘what next’.',
    achievements: [],
    links: [],
    poster: media('astitva-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('1i7M7oUJqCX0cusInfBzsuliz5CNMorok'),
    video: { platform: 'drive', id: '1J9Ct7WlCB5gfmlQkr9a2CIkUvZ11dMEp', url: 'https://drive.google.com/file/d/1J9Ct7WlCB5gfmlQkr9a2CIkUvZ11dMEp/view?usp=share_link', label: 'Watch the film' },
  },
  {
    slug: 'tragedy-of-commons',
    title: 'Tragedy of the Commons',
    titleDeva: 'सबकी जमीन',
    subtitle: '',
    type: 'Documentary',
    year: '2024',
    runtime: '·',
    language: 'Hindi · English',
    role: 'Director · Cinematographer · Co-Editor',
    synopsis:
      'Nagpur stood in solidarity with Ladakh, protesting the arrest of environmentalist Sonam Wangchuk. We look into why the Sixth Schedule is vital for Ladakh’s survival, and why the Centre hesitates to fulfil what it once promised.',
    achievements: [],
    links: [],
    poster: media('tragedy-poster.jpg'),
    stills: [],
    stillsUrl: driveFolder('1vlON1eC6p_kZ-8xE3ODRwd1Z9OleZ7GE'),
    video: { platform: 'youtube', id: 'TH88d6kuoWs', url: 'https://youtu.be/TH88d6kuoWs?si=7jj9pwl4ZF_-PXPM', label: 'Watch the film' },
  },
  {
    slug: 'excerpts-from-ladakh',
    title: 'Excerpts from Ladakh',
    titleDeva: 'लद्दाख से',
    subtitle: 'Demolition · Turtuk · Border',
    type: 'Field Notes',
    year: '2022',
    runtime: '·',
    language: 'Observational',
    role: 'Cinematographer · Editor',
    synopsis:
      'A set of short field excerpts: Demolition of a Traditional House, Turtuk: Then and Now, Scenes from the Border. Fragments observed during travel and study in Ladakh.',
    achievements: [],
    links: [],
    poster: posterPlaceholder('ल'),
    stills: [],
  },
  {
    slug: 'making-of-jayanti',
    title: 'Making of Jayanti',
    titleDeva: 'जयंती',
    subtitle: 'Docu Series',
    type: 'Behind the Scenes',
    year: '2021',
    runtime: 'Series',
    language: 'Marathi',
    role: 'Editor',
    synopsis:
      'Documentary series on the making of the Marathi film ‘Jayanti’, released in 2021.',
    achievements: [],
    links: [],
    poster: media('jayanti-poster.jpg'),
    stills: [],
    video: {
      platform: 'youtube',
      id: 'jLTJz-oxCcc',
      list: 'PLbUvgjnLjgx0XgrlLTHnQMXR6-vwN_WPs',
      url: 'https://www.youtube.com/watch?v=jLTJz-oxCcc&list=PLbUvgjnLjgx0XgrlLTHnQMXR6-vwN_WPs',
      label: 'Watch the series',
    },
  },
];

// Role filters for the Films section. Numbers below refer to positions in
// FILM_ORDER (1-based), matching the filmography numbering in the brief.
const FILM_ORDER = [
  'gadha-ghum-raha-hai', // 1  Gadha ghum raha hai
  'haalaat',             // 2  Haalat
  'cycle-of-life',       // 3  A cycle of life
  'anokha-dhaaga',       // 4  Tata Power CSR
  'nisargavedh',         // 5  Nisargavedh
  'astitva-ka-tinka',    // 6  Astitva ka tinka
  'tragedy-of-commons',  // 7  Tragedy of the Commons
  'baal-diwas',          // 8  Bal Divas
  'making-of-jayanti',   // 9  Making of Jayanti
];

const ROLE_FILTERS = [
  { key: 'director', label: 'Director', films: [1, 2, 3, 4, 5, 6, 7] },
  { key: 'writer', label: 'Writer', films: [1, 2] },
  { key: 'research', label: 'Research', films: [3] },
  { key: 'cinematographer', label: 'Cinematographer', films: [1, 2, 5, 6, 7, 8] },
  { key: 'editor', label: 'Editor', films: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { key: 'producer', label: 'Producer', films: [1, 2, 4, 5, 6] },
  { key: 'csr-ngo', label: 'CSR / NGO', films: [4, 5] },
  { key: 'lifeskais', label: 'LifeSkais', films: [1, 2, 4, 5, 6] },
].map((f) => ({ ...f, slugs: f.films.map((n) => FILM_ORDER[n - 1]) }));

const PHOTO_SERIES = [
  {
    slug: 'food-archive',
    title: 'Food Archive',
    blurb: 'A growing index of meals, hands and small kitchens. Food as document.',
    cover: 'https://picsum.photos/seed/food-archive/1400/1750',
    images: [
      'https://picsum.photos/seed/food-1/1200/1500',
      'https://picsum.photos/seed/food-2/1200/900',
      'https://picsum.photos/seed/food-3/1200/1500',
      'https://picsum.photos/seed/food-4/1200/900',
    ],
  },
  {
    slug: 'childhood-archive',
    title: 'Childhood Archive',
    blurb: 'Why I started photography. Reflections on the day, the frame, the boy holding the camera.',
    cover: 'https://picsum.photos/seed/childhood/1400/1750',
    images: [
      'https://picsum.photos/seed/child-1/1200/1500',
      'https://picsum.photos/seed/child-2/1200/900',
      'https://picsum.photos/seed/child-3/1200/1500',
    ],
  },
  {
    slug: 'chikoo-at-13',
    title: 'Chikoo at 13',
    blurb: 'A portrait series, a dog, an age, a household witnessed across one year.',
    cover: 'https://picsum.photos/seed/chikoo/1400/1750',
    images: [
      'https://picsum.photos/seed/chikoo-1/1200/1500',
      'https://picsum.photos/seed/chikoo-2/1200/900',
      'https://picsum.photos/seed/chikoo-3/1200/1500',
    ],
  },
  {
    slug: 'pankaj-at-work',
    title: 'Pankaj at Work',
    blurb: 'On set with documentary filmmaker Pankaj Rishi Kumar · Nagpur, Digras, Khammam.',
    cover: 'https://picsum.photos/seed/pankaj/1400/1750',
    images: [
      'https://picsum.photos/seed/pankaj-1/1200/900',
      'https://picsum.photos/seed/pankaj-2/1200/1500',
      'https://picsum.photos/seed/pankaj-3/1200/900',
    ],
  },
];

const WORDS = [
  {
    slug: 'kabir-and-a-perfect-day',
    title: 'Kabir & A Perfect Day',
    category: 'On Cinema',
    excerpt:
      'On the long shadow of Kabir’s couplets, and the patience required to find a perfect day inside a working week.',
    date: '2025-02-12',
    body: [
      'There is a couplet of Kabir that I have been folding into my pocket for the last few months. It begins with a question and ends with a longer one. I want to write here about how that couplet sat next to me through a film I tried to watch on a Tuesday afternoon, the kind of afternoon that has no business being remembered.',
      'A perfect day is not the day you imagine. It is the day that happens when you stop imagining. The film I watched was not perfect. The afternoon was. I take that as a small lesson, and I hand it to you now: keep your couplets close, keep your Tuesdays loose.',
      'The work continues. The questions remain. Kabir was right to leave them open.',
    ],
  },
  {
    slug: 'diary-of-a-young-filmmaker',
    title: 'Diary of a Young Filmmaker',
    category: 'Notes',
    excerpt:
      'Field notes between schedules, what stays after a shoot wraps, and what refuses to be edited out.',
    date: '2025-01-04',
    body: [
      'A shoot ends. The dust on the bag has a different colour from the dust at home. You sit on a low stool in someone else’s kitchen and drink a tea you did not order. The tape is still rolling somewhere in your head.',
      'These notes are written in the gap between schedules. They will not become a film. They are the lining of the film, the inside of the coat.',
      'I write them down so they do not become small ghosts in the next edit room.',
    ],
  },
  {
    slug: 'whats-coming-tall-guy-bad-girl',
    title: 'What’s Coming · tall guy, bad girl',
    category: 'Short Stories',
    excerpt:
      'Drafts of two interlocking stories. A man who cannot sit. A woman who will not stand. The room they share.',
    date: '2024-11-21',
    body: [
      'There is a man in the story who cannot sit. There is a woman in the story who will not stand. They share a room which is also a corridor which is also a memory.',
      'I am not sure yet which of them is telling the story. Maybe both of them, in turns. Maybe neither.',
      'This piece is in draft. I am leaving it here so I do not lose its temperature.',
    ],
  },
  {
    slug: 'the-varun-grover-problem',
    title: 'The Varun Grover Problem',
    category: 'Ideas',
    excerpt:
      'Why does the writer-comedian make us nervous? On craft, conscience, and the new Hindi audience.',
    date: '2024-09-08',
    body: [
      'There is a particular nervousness that rises in the room when a writer-comedian decides to be a filmmaker. It is the nervousness of an audience that has stopped trusting the seriousness of comedy.',
      'I want to argue that this is a productive nervousness. The audience that laughs at a joke about the state is the same audience that will sit through a film about it.',
      'Craft and conscience are not enemies. They are the same person at different times of the day.',
    ],
  },
  {
    slug: 'connections',
    title: 'Connections',
    category: 'Poetry',
    excerpt:
      'A short poem on the small wires between strangers, donkeys, cycle stores and the long Nagpur afternoon.',
    date: '2024-06-30',
    body: [
      'between strangers, a wire',
      'between a donkey and a busy street, a wire',
      'between the old cycle store and the long afternoon, a wire',
      'the wires sing only when no one is listening',
    ],
  },
  {
    slug: 'on-absurdity',
    title: 'On Absurdity',
    category: 'Art',
    excerpt:
      'Notes on the absurd as a working method, not as despair, but as a tool for staying honest with the image.',
    date: '2024-03-18',
    body: [
      'Absurdity is not the opposite of meaning. It is the residue of meaning that did not fit.',
      'When I am stuck on an image, I ask myself: what would the absurd version of this be? Not as a joke. As a tool. The absurd version is often the honest one.',
      'These are working notes. They are not finished. They will probably never be.',
    ],
  },
];

const TIMELINE = [
  {
    year: '2026',
    body: 'Pursuing Diploma in Indian Aesthetics at Jnanpravaha, Mumbai. Working on a new documentary, while wondering, writing.',
  },
  {
    year: '2024-25',
    body: 'Managed Social Media and Outreach for the Nagpur edition of the Pune International Film Festival.',
  },
  {
    year: '2023-24',
    body: 'Worked with documentary filmmaker Pankaj Rishi Kumar across schedules as cinematographer and location sound recordist · Nagpur, Digras, Khammam. Fellow at Auroville Film Institute: audio-visual archiving, study circles, workshops.',
  },
  {
    year: '2021-22',
    body: 'Filmmaking workshops and on-field documentary productions in Auroville, Ladakh and the Rann of Kutch. Curated 25+ film screenings and Q&As with filmmakers at Meraki Theatre, Nagpur. Observer at Let’s Doc, Kolkata; PSBT Doccommune with a work-in-progress film.',
  },
  {
    year: '2019',
    body: 'Bachelor’s in Mass Media, St. Xavier’s College, Mumbai. Film Appreciation Course, FTII, Pune.',
  },
];

// ============================================================
// HOOKS
// ============================================================

const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold ?? 0, rootMargin: options.rootMargin ?? '0px 0px -2% 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, visible];
};

const Reveal = ({ as: Tag = 'div', variant = 'reveal', className = '', children, ...rest }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`${variant} ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

// Letter cascade: fades each glyph in with stagger
const LetterCascade = ({ text, startDelay = 0, perChar = 55, className = '' }) => (
  <span className={className} aria-label={text}>
    {[...text].map((ch, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="letter"
        style={{ animationDelay: `${startDelay + i * perChar}ms` }}
      >
        {ch === ' ' ? ' ' : ch}
      </span>
    ))}
  </span>
);

// Lowercase word with its last two letters blurred for a beat
// (india.docs profile-picture treatment); blur clears after ~1s.
const HeroBlurWord = ({ word }) => (
  <span className="inline-block">
    {word.slice(0, -2)}
    <span className="hero-blur-soft">{word.slice(-2, -1)}</span>
    <span className="hero-blur-hard">{word.slice(-1)}</span>
  </span>
);

// ============================================================
// SHARED
// ============================================================

// Default: Devanagari "स्वा" only (main site). Variation pages keep the
// original wordmark logo via the `wordmark` prop.
const Logo = ({ size = 'md', wordmark = false }) => {
  if (wordmark) {
    const cls = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-[1rem]' : 'text-xl';
    return (
      <Link to="/" className="group flex items-center gap-2.5 select-none">
        <span className={`deva ${cls} text-ink leading-none`} aria-hidden>स्व</span>
        <span className="eyebrow text-ink/70 group-hover:text-ink transition-colors duration-500">Swanand Kottewar</span>
      </Link>
    );
  }
  const cls = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
  return (
    <Link to="/" className="group flex items-center select-none" aria-label="Swanand Kottewar — home">
      <span className={`deva ${cls} text-ink leading-none`} aria-hidden>स्व</span>
    </Link>
  );
};

const NAV_ITEMS = [
  { id: 'films', label: 'Films' },
  { id: 'photographs', label: 'Photographs' },
  { id: 'words', label: 'Words' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const Nav = ({ scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const linkFor = (id) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ease-out ${
        scrolled ? 'bg-base/80 backdrop-blur-xl border-b border-rule' : 'bg-transparent'
      }`}
    >
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={linkFor(n.id)}
              className="text-sm lg:text-base text-ink/65 hover:text-ink transition-colors duration-500 underline-grow"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span className={`block h-px w-6 bg-ink transition-transform duration-500 ${mobileOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-ink transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block h-px w-6 bg-ink transition-transform duration-500 ${mobileOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out bg-base border-b border-rule ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-8 flex flex-col gap-6">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={linkFor(n.id)}
              onClick={() => setMobileOpen(false)}
              className="display text-4xl text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

// ============================================================
// HERO: typewriter + parallax + full-bleed
// ============================================================

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL || ''}/cover.JPG')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(${1 + scrollY * 0.0003})`,
          willChange: 'transform',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-base/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base/50 via-base/10 to-base" />

      <div className="relative px-6 sm:px-10 lg:px-16 xl:px-24 pt-36 lg:pt-44 pb-28 min-h-screen flex flex-col items-center justify-center text-center">
        {/* Static name, india.docs style: lowercase inline, tail letters blurred briefly */}
        <h1
          className="display font-light text-[clamp(2rem,4.5vw,2.625rem)] leading-[1.1] text-ink tracking-tight"
          aria-label="Swanand Kottewar"
        >
          <span aria-hidden="true">
            <HeroBlurWord word="swanand" /> <HeroBlurWord word="kottewar" />
          </span>
        </h1>

        <p className="eyebrow text-ink/65 mt-9">Filmmaker · Nagpur, IN</p>

        <Reveal>
          <a
            href="#films"
            className="mt-14 group inline-flex items-center text-ink underline-grow"
          >
            <span className="eyebrow">Enter the work</span>
          </a>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="eyebrow text-ink/50">Scroll</span>
        <span className="block h-12 w-px bg-ink/25 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-ink" style={{ animation: 'scrollHint 2.4s ease-in-out infinite' }} />
        </span>
      </div>
    </section>
  );
};

// ============================================================
// SECTION HEADER
// ============================================================

const SectionHeader = ({ index, eyebrow, title, deva, lead, aside }) => (
  <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end mb-20 lg:mb-28">
    <div className="col-span-12 md:col-span-6">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-5">
          <span className="eyebrow text-muted">{index}</span>
          <span className="h-px flex-1 bg-rule" />
          <span className="eyebrow text-muted">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal variant="reveal-blur">
        <h2 className="display text-[2rem] lg:text-[2.625rem] text-ink leading-[1.05]">
          {title}
        </h2>
        {deva && <span className="deva block text-xl text-muted mt-4">{deva}</span>}
      </Reveal>
    </div>
    {lead && (
      <div className="col-span-12 md:col-span-5 md:col-start-8">
        <Reveal>
          <p className="text-base lg:text-lg text-ink/70 leading-relaxed text-pretty">
            {lead}
          </p>
        </Reveal>
      </div>
    )}
    {aside && (
      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <Reveal>{aside}</Reveal>
      </div>
    )}
  </div>
);

// ============================================================
// FILMS
// ============================================================

const FilmCard = ({ film }) => (
  <Link
    to={`/films/${film.slug}`}
    className="group text-left lift block w-full"
  >
    <div className="img-zoom img-grayscale relative overflow-hidden aspect-[3/4] bg-surface">
      <img
        src={film.poster}
        alt={film.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <span className="eyebrow text-ink bg-base/60 backdrop-blur-md px-2.5 py-1 border border-rule2">{film.type}</span>
        <span className="eyebrow text-ink bg-base/60 backdrop-blur-md px-2.5 py-1 border border-rule2">{film.year}</span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <span className="eyebrow text-ink/90">{film.language}</span>
        <span className="eyebrow text-ink/90">View →</span>
      </div>
    </div>
    <div className="mt-3 sm:mt-5 flex items-baseline justify-between gap-2 sm:gap-4">
      <div className="min-w-0">
        <h3 className="display text-xl lg:text-2xl text-ink leading-tight font-normal break-words">
          {film.title}
        </h3>
        {film.subtitle && (
          <p className="text-[10px] sm:text-xs text-muted italic mt-0.5">{film.subtitle}</p>
        )}
      </div>
      <span className="text-[10px] sm:text-sm text-muted shrink-0 tabular-nums">{film.runtime}</span>
    </div>
  </Link>
);

const FilmsSection = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const rowRef = useRef(null);

  const toggleFilter = (key) =>
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  // Multi-select union: a film shows if it belongs to any selected role.
  const visibleFilms = (() => {
    if (activeFilters.length === 0) return FILMS;
    const slugs = new Set(
      ROLE_FILTERS.filter((f) => activeFilters.includes(f.key)).flatMap((f) => f.slugs)
    );
    return FILMS.filter((film) => slugs.has(film.slug));
  })();

  // Snap the row back to the start whenever the selection changes
  useEffect(() => {
    if (rowRef.current) rowRef.current.scrollTo({ left: 0 });
  }, [activeFilters]);

  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="films" className="relative py-32 lg:py-44 bg-base">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <SectionHeader
          index="01"
          eyebrow="Filmography"
          title="Films"
          deva="फ़िल्में"
          aside={
            <div className="flex flex-wrap gap-2 sm:gap-2.5 md:justify-end" role="group" aria-label="Filter films by role">
              {ROLE_FILTERS.map((f) => {
                const on = activeFilters.includes(f.key);
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => toggleFilter(f.key)}
                    aria-pressed={on}
                    className={`film-filter px-3.5 sm:px-4 py-2 sm:py-2.5 border transition-colors duration-300 ${
                      on ? 'is-active border-ink' : 'border-rule'
                    }`}
                  >
                    <span className="eyebrow whitespace-nowrap text-[10px] tracking-[0.12em] sm:tracking-[0.2em]">{f.label}</span>
                  </button>
                );
              })}
            </div>
          }
        />

        <div className="flex items-center justify-between mb-8">
          <p className="eyebrow text-muted" aria-live="polite">
            {visibleFilms.length} {visibleFilms.length === 1 ? 'Film' : 'Films'}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollRow(-1)}
              aria-label="Scroll films left"
              className="w-11 h-11 border border-rule text-ink/70 hover:text-ink hover:border-ink/60 transition-colors duration-300 flex items-center justify-center"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollRow(1)}
              aria-label="Scroll films right"
              className="w-11 h-11 border border-rule text-ink/70 hover:text-ink hover:border-ink/60 transition-colors duration-300 flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={rowRef}
          className="films-row flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x pb-2"
        >
          {visibleFilms.map((film) => (
            <div key={film.slug} className="w-[62vw] sm:w-[290px] lg:w-[320px] xl:w-[340px] shrink-0 snap-start">
              <FilmCard film={film} />
            </div>
          ))}
        </div>

        <Reveal>
        <div className="mt-28 pt-12 border-t border-rule grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-muted">In Development</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="display text-xl lg:text-2xl text-ink/85 leading-snug text-pretty font-light">
              Orchestra of Grief · Bhimgeet Film · Gowari Film · Silent Revolution · A Life to Live <span className="italic text-muted">(work in progress)</span>
            </p>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
};

// ============================================================
// FILM DETAIL OVERLAY
// ============================================================

const DetailNav = ({ backTo = '/', backLabel = 'Index' }) => (
  <header className="fixed top-0 inset-x-0 z-40 bg-base/85 backdrop-blur-xl border-b border-rule">
    <div className="px-6 sm:px-10 lg:px-16 xl:px-24 h-16 flex items-center justify-between">
      <Logo size="sm" />
      <Link
        to={backTo}
        className="group flex items-center gap-3 text-sm text-ink"
        aria-label={`Back to ${backLabel}`}
      >
        <span className="eyebrow">{backLabel}</span>
        <span className="relative w-6 h-6">
          <span className="absolute inset-x-0 top-1/2 h-px bg-ink rotate-45 transition-transform duration-500 group-hover:rotate-[225deg]" />
          <span className="absolute inset-x-0 top-1/2 h-px bg-ink -rotate-45 transition-transform duration-500 group-hover:-rotate-[225deg]" />
        </span>
      </Link>
    </div>
  </header>
);

// Video preview box: click-to-play embed (YouTube nocookie / Drive preview)
// plus an external redirect link to the original video URL.
const VideoPreview = ({ film }) => {
  const [playing, setPlaying] = useState(false);
  const { video } = film;
  const cover = film.stills[0] || film.poster;

  return (
    <div>
      <div className="relative aspect-[16/9] bg-surface overflow-hidden group">
        {video && playing ? (
          <iframe
            src={videoEmbedUrl(video, { autoplay: true })}
            title={`${film.title} — video`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <img src={cover} alt={film.title} className="absolute inset-0 w-full h-full object-cover" />
            {video && (
              <>
                <div className="absolute inset-0 bg-base/40 group-hover:bg-base/50 transition-colors" />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Play ${film.title}`}
                >
                  <span className="flex items-center gap-4 text-ink">
                    <span className="relative w-20 h-20 rounded-full border border-ink/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                      <span className="block w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-ink ml-1" />
                    </span>
                    <span className="eyebrow">{video.label || 'Play'}</span>
                  </span>
                </button>
              </>
            )}
          </>
        )}
      </div>
      {(video || film.stillsUrl) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-3">
          {video && (
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="eyebrow text-ink/70 hover:text-ink transition-colors underline-grow"
            >
              {video.platform === 'youtube' ? 'Watch on YouTube ↗' : 'Open video on Drive ↗'}
            </a>
          )}
          {film.stillsUrl && (
            <a
              href={film.stillsUrl}
              target="_blank"
              rel="noreferrer"
              className="eyebrow text-ink/70 hover:text-ink transition-colors underline-grow"
            >
              Film stills ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const FilmPage = () => {
  const { slug } = useParams();
  const film = FILMS.find((f) => f.slug === slug);

  if (!film) return <Navigate to="/" replace />;

  // index of film for prev/next
  const idx = FILMS.findIndex((f) => f.slug === slug);
  const prev = FILMS[(idx - 1 + FILMS.length) % FILMS.length];
  const next = FILMS[(idx + 1) % FILMS.length];

  return (
    <div className="bg-base min-h-screen">
      <DetailNav backTo="/#films" backLabel="All Films" />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 lg:pt-36 pb-24">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-20 lg:mb-24">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="eyebrow text-muted mb-6">{film.type} · {film.year} · {film.runtime} · {film.language}</p>
            </Reveal>
            <Reveal variant="reveal-blur">
              <h1 className="display text-xl md:text-2xl text-ink leading-[1.1] text-balance">
                {film.title}
              </h1>
              {film.subtitle && (
                <p className="display italic text-lg text-muted mt-4 font-light">{film.subtitle}</p>
              )}
              <span className="deva block text-xl text-muted mt-5">{film.titleDeva}</span>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 self-end">
            <Reveal>
              <p className="eyebrow text-muted mb-3">Role</p>
              <p className="text-lg text-ink/85 leading-relaxed">{film.role}</p>
            </Reveal>
          </div>
        </div>

        <Reveal variant="reveal-img">
          <div className="mb-20 lg:mb-24">
            <VideoPreview film={film} />
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-24 lg:mb-32">
          <div className="col-span-12 md:col-span-3">
            <Reveal><p className="eyebrow text-muted">Synopsis</p></Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <p className="display text-base lg:text-lg text-ink leading-relaxed text-pretty font-light">
                {film.synopsis}
              </p>
            </Reveal>
          </div>
        </div>

        {(film.stills.length > 0 || film.stillsUrl) && (
          <div className="mb-24 lg:mb-32">
            <Reveal><p className="eyebrow text-muted mb-10">Stills</p></Reveal>
            {film.stills.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-10">
                {film.stills.map((src, i) => (
                  <Reveal key={i} variant="reveal-img" className={i === 0 ? 'md:col-span-2' : ''}>
                    <div className="aspect-[16/10] overflow-hidden bg-surface img-grayscale">
                      <img src={src} alt={`${film.title} still ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
            {film.stillsUrl && (
              <Reveal>
                <a
                  href={film.stillsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border-y border-rule py-6 text-ink/85 hover:text-ink transition-colors"
                >
                  <span className="text-lg">Browse all stills on Drive</span>
                  <span className="text-sm text-muted group-hover:text-ink group-hover:translate-x-1 transition-all">↗</span>
                </a>
              </Reveal>
            )}
          </div>
        )}

        {film.achievements && film.achievements.length > 0 && (
          <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-24 lg:mb-32">
            <div className="col-span-12 md:col-span-3">
              <Reveal><p className="eyebrow text-muted">Achievements</p></Reveal>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Reveal variant="reveal stagger">
                <ul className="divide-y divide-rule">
                  {film.achievements.map((a, i) => (
                    <li key={i} className="py-5 text-ink/85 text-lg flex gap-6">
                      <span className="text-muted tabular-nums shrink-0 w-10">{String(i + 1).padStart(2, '0')}</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        )}

        {film.links && film.links.length > 0 && (
          <div className="grid grid-cols-12 gap-6 lg:gap-12">
            <div className="col-span-12 md:col-span-3">
              <Reveal><p className="eyebrow text-muted">Press · Links</p></Reveal>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Reveal variant="reveal stagger">
                <ul className="divide-y divide-rule">
                  {film.links.map((l, i) => (
                    <li key={i} className="py-5">
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-4 text-ink/85 hover:text-ink transition-colors"
                      >
                        <span className="text-lg">{l.label}</span>
                        <span className="text-sm text-muted group-hover:text-ink group-hover:translate-x-1 transition-all">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        )}

        <div className="mt-28 pt-10 border-t border-rule grid grid-cols-2 gap-6">
          <Link to={`/films/${prev.slug}`} className="group block">
            <p className="eyebrow text-muted mb-3">← Previous</p>
            <p className="display text-xl lg:text-2xl text-ink/85 group-hover:text-ink transition-colors">{prev.title}</p>
          </Link>
          <Link to={`/films/${next.slug}`} className="group block text-right">
            <p className="eyebrow text-muted mb-3">Next →</p>
            <p className="display text-xl lg:text-2xl text-ink/85 group-hover:text-ink transition-colors">{next.title}</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ============================================================
// PHOTOGRAPHS
// ============================================================

const PhotographsSection = () => (
  <section id="photographs" className="relative py-32 lg:py-44 bg-surface border-t border-rule">
    <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
      <SectionHeader
        index="02"
        eyebrow="Photographs"
        title="Photo Series"
        deva="फ़ोटो"
        lead="Bringing together ongoing archives: food, childhood, a household dog, a filmmaker at work. Photographs as a way of building memory, slowly."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
        {PHOTO_SERIES.map((s, i) => (
          <Reveal key={s.slug} className={i % 2 === 1 ? 'md:mt-16' : ''}>
            <Link
              to={`/photographs/${s.slug}`}
              className="group text-left block w-full lift"
            >
              <div className="img-zoom img-grayscale relative overflow-hidden aspect-[3/4] bg-surface2">
                <img src={s.cover} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-base/0 group-hover:bg-base/10 transition-colors duration-700" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="display text-xl lg:text-2xl text-ink font-normal leading-tight">{s.title}</h3>
                <span className="text-xs text-muted tabular-nums shrink-0">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-2 text-sm text-ink/60 text-pretty leading-relaxed">{s.blurb}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SeriesPage = () => {
  const { slug } = useParams();
  const series = PHOTO_SERIES.find((s) => s.slug === slug);

  if (!series) return <Navigate to="/" replace />;

  const idx = PHOTO_SERIES.findIndex((s) => s.slug === slug);
  const prev = PHOTO_SERIES[(idx - 1 + PHOTO_SERIES.length) % PHOTO_SERIES.length];
  const next = PHOTO_SERIES[(idx + 1) % PHOTO_SERIES.length];

  return (
    <div className="bg-base min-h-screen">
      <DetailNav backTo="/#photographs" backLabel="All Series" />
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 lg:pt-36 pb-24">
        <Reveal><p className="eyebrow text-muted mb-6">Photo Series</p></Reveal>
        <Reveal variant="reveal-blur">
          <h1 className="display text-[2rem] md:text-[2.625rem] text-ink leading-[1.05] font-light tracking-tight">{series.title}</h1>
        </Reveal>
        <Reveal>
          <p className="text-lg text-ink/70 max-w-2xl mt-8 text-pretty">{series.blurb}</p>
        </Reveal>

        <div className="mt-20 lg:mt-28 space-y-12 lg:space-y-20">
          {series.images.map((src, i) => (
            <Reveal key={i} variant="reveal-img">
              <div className={`overflow-hidden bg-surface img-grayscale ${i % 3 === 1 ? 'aspect-[16/9]' : 'aspect-[4/5]'} ${i % 3 === 2 ? 'md:max-w-4xl md:ml-auto' : ''} ${i % 3 === 0 ? 'md:max-w-5xl' : ''}`}>
                <img src={src} alt={`${series.title} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-28 pt-10 border-t border-rule grid grid-cols-2 gap-6">
          <Link to={`/photographs/${prev.slug}`} className="group block">
            <p className="eyebrow text-muted mb-3">← Previous</p>
            <p className="display text-xl lg:text-2xl text-ink/85 group-hover:text-ink transition-colors">{prev.title}</p>
          </Link>
          <Link to={`/photographs/${next.slug}`} className="group block text-right">
            <p className="eyebrow text-muted mb-3">Next →</p>
            <p className="display text-xl lg:text-2xl text-ink/85 group-hover:text-ink transition-colors">{next.title}</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ============================================================
// WORDS
// ============================================================

const WordsSection = () => (
  <section id="words" className="relative py-32 lg:py-44 bg-base border-t border-rule">
    <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
      <SectionHeader
        index="03"
        eyebrow="Writing"
        title="Words"
        deva="शब्द"
        lead="Notes, poems and essays on cinema, art, absurdity, and the small connections between things. Slowly written, slowly read."
      />

      <Reveal variant="reveal stagger" className="kothri-journal">
        {WORDS.map((w) => (
          <Link key={w.slug} to={`/words/${w.slug}`} className="kothri-page">
            <span>{w.category} / {new Date(w.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</span>
            <h3>{w.title}</h3>
            <p>{w.excerpt}</p>
          </Link>
        ))}
      </Reveal>
    </div>
  </section>
);

const WordsPage = () => {
  const { slug } = useParams();
  const piece = WORDS.find((w) => w.slug === slug);

  if (!piece) return <Navigate to="/" replace />;

  const idx = WORDS.findIndex((w) => w.slug === slug);
  const prev = WORDS[(idx - 1 + WORDS.length) % WORDS.length];
  const next = WORDS[(idx + 1) % WORDS.length];

  return (
    <div className="bg-base min-h-screen">
      <DetailNav backTo="/#words" backLabel="All Writing" />
      <article className="px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 lg:pt-36 pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="eyebrow text-muted">{piece.category}</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="eyebrow text-muted tabular-nums">
                {new Date(piece.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })}
              </span>
            </div>
          </Reveal>
          <Reveal variant="reveal-blur">
            <h1 className="display text-[2rem] md:text-[2.625rem] text-ink leading-[1.1] font-light tracking-tight text-balance">
              {piece.title}
            </h1>
          </Reveal>
          <div className="mt-16 space-y-7">
            {piece.body.map((para, i) => (
              <Reveal key={i}>
                <p className={`text-ink/85 text-base lg:text-lg leading-relaxed text-pretty ${piece.category === 'Poetry' ? 'italic font-light' : ''}`}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-28 pt-10 border-t border-rule grid grid-cols-2 gap-6">
            <Link to={`/words/${prev.slug}`} className="group block">
              <p className="eyebrow text-muted mb-3">← Previous</p>
              <p className="display text-[1rem] lg:text-lg text-ink/85 group-hover:text-ink transition-colors leading-tight">{prev.title}</p>
            </Link>
            <Link to={`/words/${next.slug}`} className="group block text-right">
              <p className="eyebrow text-muted mb-3">Next →</p>
              <p className="display text-[1rem] lg:text-lg text-ink/85 group-hover:text-ink transition-colors leading-tight">{next.title}</p>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

// ============================================================
// ABOUT
// ============================================================

const AboutSection = () => (
  <section id="about" className="relative py-32 lg:py-44 bg-surface border-t border-rule">
    <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end mb-20 lg:mb-28">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-5">
              <span className="eyebrow text-muted">04</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="eyebrow text-muted">Profile</span>
            </div>
          </Reveal>
          <Reveal variant="reveal-blur">
            <h2 className="display text-[2rem] lg:text-[2.625rem] text-ink leading-[1.05]">About</h2>
            <span className="deva block text-xl text-muted mt-4">परिचय</span>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-28 lg:mb-36">
        <div className="col-span-12 md:col-span-4">
          <Reveal variant="reveal-img">
            <div className="aspect-[4/5] overflow-hidden bg-surface2 img-grayscale">
              <img src={media('swanand-portrait.jpg')} alt="Swanand Kottewar" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="text-base lg:text-lg text-ink/85 leading-relaxed text-pretty max-w-3xl">
              Hello! I am a filmmaker based out of Nagpur with 10 years of experience in filmmaking. I like engaging in films, as a medium to empathise and connect with people and places. I see it as a way of storytelling, rooted in observation and reflection. My films have stemmed from either a personal emotion or a quest about the surroundings.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-base lg:text-lg text-ink/70 leading-relaxed text-pretty max-w-3xl">
              Some of my films have been screened at various international film festivals like IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Film Festival, Switzerland; and won awards at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.
            </p>
          </Reveal>
          <Reveal>
            <a href="#contact" className="display text-xl lg:text-2xl text-ink underline-grow inline-block mt-10 font-light">
              Let’s connect <span className="italic">:)</span>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 md:col-span-3">
          <Reveal><p className="eyebrow text-muted">Timeline</p></Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal variant="reveal stagger">
            <ul>
              {TIMELINE.map((t, i) => (
                <li key={i} className="py-10 lg:py-12 border-t border-rule grid grid-cols-12 gap-4 lg:gap-8">
                  <span className="col-span-12 md:col-span-3 display text-2xl text-ink font-normal tabular-nums">{t.year}</span>
                  <p className="col-span-12 md:col-span-9 text-ink/75 text-lg leading-relaxed text-pretty">{t.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================
// CONTACT
// ============================================================

const ContactSection = () => (
  <section id="contact" className="relative py-32 lg:py-44 bg-base border-t border-rule">
    <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
      <Reveal>
        <p className="eyebrow text-muted mb-10">05 / Contact</p>
      </Reveal>
      <Reveal variant="reveal-blur">
        <h2 className="display text-[clamp(2rem,4.5vw,2.625rem)] leading-[1.05] text-ink text-balance font-light tracking-tight">
          Let’s connect
          <span className="italic"> :)</span>
        </h2>
      </Reveal>

      <div className="mt-20 lg:mt-28 grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <p className="eyebrow text-muted mb-5">Email</p>
            <a
              href="mailto:lifeskaisart@gmail.com"
              className="display text-xl lg:text-2xl text-ink underline-grow inline-block font-normal tracking-tight"
            >
              lifeskaisart@gmail.com
            </a>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <p className="eyebrow text-muted mb-5">Phone</p>
            <a href="tel:+918956126016" className="display text-xl lg:text-2xl text-ink underline-grow inline-block tabular-nums font-normal tracking-tight">
              +91 89561 26016
            </a>
          </Reveal>
        </div>
      </div>

      <div className="mt-28 grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <p className="eyebrow text-muted mb-4">Available for</p>
            <p className="text-ink/75 text-lg max-w-md text-pretty leading-relaxed">
              Documentary collaborations, cinematography, editing and screening curation. Open to commissions, conversations, and screenings.
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <Reveal>
            <p className="eyebrow text-muted mb-4">Based in</p>
            <p className="text-ink/75 text-lg">Nagpur, Maharashtra · India</p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================
// CONCENTRIC ARCS EXPERIENCE
// ============================================================

const ARC_STAGES = [
  { id: 'swanand', hindi: 'स', name: 'Swanand', tone: 'Filmmaker · Photographer · Nagpur' },
  { id: 'films', hindi: 'फ', name: 'Films', tone: 'Filmography · Documentary · Fiction' },
  { id: 'photographs', hindi: 'प', name: 'Pictures', tone: 'Photo Series · Archives' },
  { id: 'words', hindi: 'श', name: 'Words', tone: 'Essays · Poetry · Notes' },
  { id: 'about', hindi: 'अ', name: 'About', tone: 'Profile · Timeline' },
  { id: 'contact', hindi: 'स', name: 'Contact', tone: 'Collaborations · Commissions' },
];

const ArcLabel = ({
  radius,
  hindi,
  name,
  fontSize,
  strokeOpacity = 0.18,
  strokeWidth = 0.6,
  uid,
}) => {
  const r = radius;
  const arcPath = `M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`;
  const pathId = `arc-path-${uid}`;
  return (
    <g>
      <defs>
        <path id={pathId} d={arcPath} />
      </defs>
      <path
        d={arcPath}
        fill="none"
        stroke="currentColor"
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <text className="arc-name-text" fontSize={fontSize} fill="currentColor">
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {hindi} {name}
        </textPath>
      </text>
    </g>
  );
};

// eslint-disable-next-line no-unused-vars
const ConcentricArcs = ({ activeId = ARC_STAGES[0].id, uidPrefix = 'intro' }) => {
  const arcs = ARC_STAGES.map((stage, i) => ({
    ...stage,
    radius: 400 - i * 58,
    fontSize: i < 3 ? 12 : 11,
    isActive: stage.id === activeId,
    uid: `${uidPrefix}-${stage.id}`,
  }));
  return (
    <svg
      className="concentric-arcs-svg"
      viewBox="-440 -440 880 460"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      <g transform="translate(0, 20)">
        {arcs.map((a) => (
          <g key={a.uid} className={`semi-concentric-line ${a.isActive ? 'is-active' : ''}`}>
            <ArcLabel
              radius={a.radius}
              hindi={a.hindi}
              name={a.name}
              fontSize={a.fontSize}
              hindiSize={a.hindiSize}
              strokeOpacity={a.isActive ? 0.52 : 0.16}
              strokeWidth={a.isActive ? 0.9 : 0.6}
              uid={a.uid}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

const SwanandStageContent = () => (
  <div className="arc-stage-content">
    <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
      <div className="col-span-12 md:col-span-5">
        <Reveal variant="reveal-img">
          <div className="aspect-[4/5] overflow-hidden bg-surface2 img-grayscale">
            <img
              src={media('swanand-portrait.jpg')}
              alt="Swanand Kottewar"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <Reveal>
          <p className="display text-2xl lg:text-3xl text-ink/90 leading-snug font-light text-pretty">
            Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places.
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-8 text-lg text-ink/70 leading-relaxed text-pretty">
            Storytelling rooted in observation and reflection. Films have stemmed from either a personal emotion or a quest about the surroundings. Screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland, and awarded at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div>
              <p className="eyebrow text-muted mb-2">Based in</p>
              <p className="text-ink/85">Nagpur, Maharashtra</p>
            </div>
            <div>
              <p className="eyebrow text-muted mb-2">Practice</p>
              <p className="text-ink/85">Films · Photographs · Words</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
);

const FilmsArc = ({ items }) => {
  const positions = [
    { top: '60%', left: '15%' },
    { top: '14%', left: '50%' },
    { top: '60%', left: '85%' },
  ];
  return (
    <div className="films-arc-wrap">
      <div className="films-arc">
        <svg
          className="films-arc-svg"
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 15 60 A 45 45 0 0 1 85 60"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="0.4"
          />
          <path
            d="M 5 60 A 55 55 0 0 1 95 60"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="0.3"
          />
        </svg>
        {items.map((film, i) => (
          <Link
            key={film.slug}
            to={`/films/${film.slug}`}
            className="films-arc-tile"
            style={positions[i]}
          >
            <div className="tile-poster">
              <img src={film.poster} alt={film.title} loading="lazy" />
            </div>
            <div className="tile-meta">
              <h3>{film.title}</h3>
              <span>{film.year} · {film.runtime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FilmsStageContent = () => {
  const featured = FILMS.slice(0, 3);
  return (
    <div className="arc-stage-content">
      <Reveal>
        <FilmsArc items={featured} />
      </Reveal>
      <Reveal>
        <div className="v6-complete-film-list" aria-label="Complete filmography">
          {FILMS.map((film, i) => (
            <Link key={film.slug} to={`/films/${film.slug}`} className="v6-complete-film-row">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{film.title}</h3>
                <p>{film.synopsis}</p>
              </div>
              <small>{film.type} · {film.year} · {film.runtime} · {film.language}</small>
            </Link>
          ))}
        </div>
      </Reveal>
      <Reveal>
        <div id="films-in-development" className="mt-20 pt-8 border-t border-rule grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-muted">In Development</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="text-[1rem] lg:text-lg text-ink leading-snug text-pretty">
              Orchestra of Grief · Bhimgeet Film · Gowari Film · Silent Revolution · A Life to Live <span className="italic text-muted">(work in progress)</span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const PicturesStageContent = () => {
  const featured = PHOTO_SERIES;
  return (
    <div className="arc-stage-content">
      <Reveal>
        <div className="pictures-3">
          {featured.map((s, i) => (
            <Link key={s.slug} to={`/photographs/${s.slug}`} className="tile">
              <div className="tile-cover">
                <img src={s.cover} alt={s.title} loading="lazy" />
              </div>
              <div className="tile-label">
                <h3>{s.title}</h3>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--secondary)' }}>{s.blurb}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

const WordsFloatingGraphic = ({ className, style, size = 90, accent = false }) => (
  <svg
    className={`words-float-graphic ${accent ? 'tertiary' : ''} ${className || ''}`}
    style={style}
    width={size}
    height={size}
    viewBox="-50 -50 100 100"
    aria-hidden
  >
    <circle cx="0" cy="0" r="44" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.55" />
    <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.65" />
    <circle cx="0" cy="0" r="16" fill="none" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.85" />
    <circle cx="0" cy="0" r="3" fill="currentColor" />
  </svg>
);

const WordsStageContent = () => (
  <div className="arc-stage-content words-floating">
    <WordsFloatingGraphic className="delay-1" style={{ top: '-30px', right: '4%' }} size={130} />
    <WordsFloatingGraphic className="delay-2" style={{ bottom: '20%', left: '-40px' }} size={170} />
    <WordsFloatingGraphic accent className="delay-1" style={{ top: '40%', right: '-20px' }} size={90} />
    <Reveal variant="reveal stagger">
      <ul className="divide-y divide-rule border-y border-rule relative" style={{ zIndex: 2 }}>
        {WORDS.map((w, i) => (
          <li key={w.slug}>
            <Link
              to={`/words/${w.slug}`}
              className="group block py-10 lg:py-12 grid grid-cols-12 gap-4 lg:gap-8 items-baseline hover:bg-surface/40 -mx-4 lg:-mx-6 px-4 lg:px-6 transition-colors duration-500"
            >
              <span className="col-span-12 md:col-span-2 text-sm text-muted tabular-nums">
                {String(i + 1).padStart(2, '0')} · {new Date(w.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}
              </span>
              <div className="col-span-12 md:col-span-7">
                <h3 className="display text-2xl lg:text-3xl text-ink leading-tight font-normal group-hover:italic transition-all duration-500" style={{ color: 'var(--ink-strong)' }}>
                  {w.title}
                </h3>
                <p className="text-ink/65 mt-3 max-w-xl text-pretty">{w.excerpt}</p>
              </div>
              <span className="col-span-12 md:col-span-2 md:col-start-11 eyebrow text-muted md:text-right">{w.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  </div>
);

const RECOGNITION_URLS = {
  'CHINH Youth Film Festival': 'https://www.chinh.in/cyff',
  'CHINH Silver Award, CHINH Youth Film Festival (2020)': 'https://www.chinh.in/cyff',
  'Jury Award, Quarantine International Film Festival (2020)': null,
};

const buildRecognition = () => {
  const seen = new Set();
  const items = [];
  FILMS.forEach((f) => {
    (f.achievements || []).forEach((a) => {
      const key = a.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      let url = RECOGNITION_URLS[a];
      if (!url && /chinh/i.test(a)) url = 'https://www.chinh.in/cyff';
      items.push({ label: a, url, film: f.title });
    });
  });
  return items;
};

const buildNews = () =>
  FILMS.flatMap((f) =>
    (f.links || [])
      .filter((l) => l.url && l.url !== '#')
      .map((l) => ({ label: l.label, url: l.url, film: f.title }))
  );

const AboutStageContent = () => {
  const recognition = buildRecognition();
  const news = buildNews();
  return (
    <div className="arc-stage-content">
      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 md:col-span-4">
          <Reveal variant="reveal-img">
            <div className="aspect-[4/5] overflow-hidden bg-surface2">
              <img src={media('swanand-portrait.jpg')} alt="Swanand Kottewar" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="text-xl lg:text-2xl leading-[1.45] text-pretty" style={{ color: 'var(--ink-strong)' }}>
              Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-[1rem] lg:text-lg leading-relaxed text-pretty max-w-3xl text-ink">
              Filmmaking as storytelling rooted in observation and reflection. Work stems from either a personal emotion or a quest about the surroundings. Screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="recognition-block">
        <div className="recognition-grid">
          <div>
            <p className="eyebrow text-muted">Recognition</p>
            <ul className="recognition-list">
              {recognition.map((r, i) => (
                <li key={r.label}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer">{r.label}</a>
                  ) : (
                    <span>{r.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted">News & Articles</p>
            <ul className="news-list">
              {news.map((n, i) => (
                <li key={`${n.url}-${i}`}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <a href={n.url} target="_blank" rel="noreferrer">{n.label}</a>
                    <span className="source">{n.film}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="timeline-compact">
        <p className="eyebrow text-muted mb-3">Timeline</p>
        {TIMELINE.map((t) => (
          <div key={t.year} className="row">
            <span className="year">{t.year}</span>
            <span className="body">{t.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactStageContent = () => (
  <div className="arc-stage-content">
    <div className="grid grid-cols-12 gap-6 lg:gap-12">
      <div className="col-span-12 md:col-span-7">
        <Reveal>
          <p className="eyebrow text-muted mb-5">Email</p>
          <a href="mailto:lifeskaisart@gmail.com" className="display text-2xl lg:text-4xl text-ink underline-grow inline-block font-normal tracking-tight">
            lifeskaisart@gmail.com
          </a>
        </Reveal>
      </div>
      <div className="col-span-12 md:col-span-5">
        <Reveal>
          <p className="eyebrow text-muted mb-5">Phone</p>
          <a href="tel:+918956126016" className="display text-2xl lg:text-4xl text-ink underline-grow inline-block tabular-nums font-normal tracking-tight">
            +91 89561 26016
          </a>
        </Reveal>
      </div>
      <div className="col-span-12 md:col-span-6 mt-16">
        <Reveal>
          <p className="eyebrow text-muted mb-4">Available for</p>
          <p className="text-ink/75 text-lg max-w-md text-pretty leading-relaxed">
            Documentary collaborations, cinematography, editing and screening curation. Open to commissions, conversations, and screenings.
          </p>
        </Reveal>
      </div>
      <div className="col-span-12 md:col-span-5 md:col-start-8 mt-16">
        <Reveal>
          <p className="eyebrow text-muted mb-4">Based in</p>
          <p className="text-ink/75 text-lg">Nagpur, Maharashtra · India</p>
        </Reveal>
      </div>
    </div>
  </div>
);

const STAGE_RENDERERS = {
  swanand: SwanandStageContent,
  films: FilmsStageContent,
  photographs: PicturesStageContent,
  words: WordsStageContent,
  about: AboutStageContent,
  contact: ContactStageContent,
};

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const ARC_K = 0.5522847498;

const MorphArcText = ({ text, progress, uid, fontSize = 22, radius = 140 }) => {
  const r = radius;
  const a = 1 - progress;
  const k = ARC_K;
  const c1y = -k * r * a;
  const c2y = -r * a;
  const midY = -r * a;
  const c3y = -r * a;
  const c4y = -k * r * a;
  const d = `M ${-r} 0 C ${-r} ${c1y} ${-k * r} ${c2y} 0 ${midY} C ${k * r} ${c3y} ${r} ${c4y} ${r} 0`;
  const pathId = `morph-path-${uid}`;
  const pad = 28;
  const vbTop = lerp(-(r + pad), -pad * 1.8, progress);
  const vbHeight = lerp(r + pad * 2, pad * 3.2, progress);
  return (
    <svg
      className="morph-svg"
      viewBox={`${-r - pad} ${vbTop} ${2 * r + 2 * pad} ${vbHeight}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      <defs>
        <path id={pathId} d={d} />
      </defs>
      <text className="morph-text" fontSize={fontSize} fill="currentColor">
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
};

const MENU_H = 64;

const MorphScene = ({ stage, index, total, coverUrl, topOffset, activeId }) => {
  const StageContent = STAGE_RENDERERS[stage.id];
  const sectionRef = useRef(null);
  const [scene, setScene] = useState({ title: 0, content: 0, height: 720 });
  const label = `${stage.hindi}  ${stage.name}`;
  const isActive = activeId === stage.id;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const sceneHeight = Math.max(430, vh - topOffset);
        const titleProgress = clamp((topOffset - rect.top) / (vh * 0.58), 0, 1);
        const contentProgress = clamp((topOffset - rect.top - vh * 0.18) / (vh * 0.36), 0, 1);
        setScene((prev) => {
          const next = {
            title: titleProgress,
            content: contentProgress,
            height: sceneHeight,
          };
          const titleDelta = Math.abs(prev.title - next.title);
          const contentDelta = Math.abs(prev.content - next.content);
          const heightDelta = Math.abs(prev.height - next.height);
          return titleDelta > 0.005 || contentDelta > 0.005 || heightDelta > 2 ? next : prev;
        });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [topOffset]);

  const titleProgress = easeInOutCubic(scene.title);
  const contentProgress = easeInOutCubic(scene.content);
  const titleHeight = lerp(Math.min(scene.height * 0.92, 760), 72, titleProgress);
  const titleShift = lerp(scene.height * 0.04, 0, titleProgress);
  const radius = lerp(Math.min(320, scene.height * 0.42), 86, titleProgress);
  const fontSize = lerp(24, 12.5, titleProgress);
  const contentOffset = lerp(36, 0, contentProgress);
  const arcOpacity = clamp((1 - titleProgress) / 0.16, 0, 1);

  return (
    <section
      ref={sectionRef}
      id={stage.id}
      className={`morph-section ${isActive ? 'is-active' : ''}`}
      data-stage={stage.id}
      style={{
        '--scene-top': `${topOffset}px`,
        '--title-progress': titleProgress,
        '--content-progress': contentProgress,
      }}
    >
      <div className="morph-sticky">
        {index === 0 && (
          <div
            className="morph-section-photo"
            style={{
              backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
            }}
            aria-hidden
          />
        )}
        <div className="morph-section-veil" aria-hidden />
        <div
          className="morph-title-bar"
          style={{
            height: `${titleHeight}px`,
            transform: `translateY(${titleShift}px)`,
          }}
        >
          <div className="morph-title-inner" style={{ opacity: arcOpacity }}>
            <MorphArcText
              text={label}
              progress={titleProgress}
              uid={stage.id}
              fontSize={fontSize}
              radius={radius}
            />
          </div>
          <div className="morph-flat-title" style={{ opacity: titleProgress }}>
            <span>{stage.hindi}</span>
            <span>{stage.name}</span>
          </div>
          <div className="morph-title-meta">
            <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <span className="morph-title-tone">{stage.tone}</span>
          </div>
        </div>
        <div
          className="morph-content-shell"
          style={{
            opacity: contentProgress,
            transform: `translateY(${contentOffset}px)`,
          }}
        >
          <div className="morph-content">
            {StageContent ? <StageContent /> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

const TopArcMenu = ({ items, openId, onOpen }) => (
  <div className="top-arc-menu" role="navigation" aria-label="Sections">
    {items.map((s) => (
      <button
        key={s.id}
        type="button"
        className={`top-arc-menu-item ${openId === s.id ? 'is-active' : ''}`}
        onClick={() => onOpen(s.id)}
      >
        <span className="top-arc-menu-hindi">{s.hindi}</span>
        <span className="top-arc-menu-name">{s.name}</span>
      </button>
    ))}
  </div>
);

const ConcentricArcsExperience = ({ embedded = false }) => {
  const [activeId, setActiveId] = useState(ARC_STAGES[0].id);
  const location = useLocation();
  const coverUrl = `${process.env.PUBLIC_URL || ''}/cover.JPG`;
  const chromeOffset = embedded ? 72 : 0;
  const topOffset = chromeOffset + MENU_H;

  useEffect(() => {
    document.documentElement.classList.add('has-morph-page');
    document.body.classList.add('has-morph-page');
    return () => {
      document.documentElement.classList.remove('has-morph-page');
      document.body.classList.remove('has-morph-page');
    };
  }, []);

  useEffect(() => {
    const hash = (location.hash || '').replace('#', '');
    if (hash && ARC_STAGES.some((s) => s.id === hash)) {
      setActiveId(hash);
    }
  }, [location.hash]);

  useEffect(() => {
    const updateActiveStage = () => {
      const anchor = window.innerHeight * 0.42;
      const current = ARC_STAGES.reduce((selected, stage) => {
        const el = document.getElementById(stage.id);
        if (!el) return selected;
        const rect = el.getBoundingClientRect();
        return rect.top <= anchor && rect.bottom > 120 ? stage.id : selected;
      }, ARC_STAGES[0].id);
      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActiveStage();
    window.addEventListener('scroll', updateActiveStage, { passive: true });
    window.addEventListener('resize', updateActiveStage);
    return () => {
      window.removeEventListener('scroll', updateActiveStage);
      window.removeEventListener('resize', updateActiveStage);
    };
  }, []);

  const handleOpen = (id) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = topOffset + 4;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'auto' });
    }
  };

  return (
    <div className={`morph-page-shell arc-variation-page ${embedded ? 'is-embedded' : 'is-standalone'}`}>
      <div className="morph-experience">
        <TopArcMenu items={ARC_STAGES} openId={activeId} onOpen={handleOpen} />
        <div className="morph-stack">
          {ARC_STAGES.map((stage, i) => (
            <MorphScene
              key={stage.id}
              stage={stage}
              index={i}
              total={ARC_STAGES.length}
              coverUrl={coverUrl}
              activeId={activeId}
              topOffset={topOffset}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const V6Variation = () => (
  <VariationShell active="v6" className="v6-page arc-variation-page">
    <main>
      <ConcentricArcsExperience embedded />
    </main>
  </VariationShell>
);

// ============================================================
// WEBSITE VARIATIONS
// ============================================================

const VARIATION_LINKS = [
  {
    slug: 'v1',
    path: '/v1',
    name: 'V1',
    title: 'Swara / The Resonant Chamber',
    signal: 'Stillness, circular gateways, soft entry.',
    accent: '#C99E5B',
  },
  {
    slug: 'v2',
    path: '/v2',
    name: 'V2',
    title: 'Chakra / The Reel of Reels',
    signal: 'A filmography built as a controlled orbit.',
    accent: '#8C3D2E',
  },
  {
    slug: 'v3',
    path: '/v3',
    name: 'V3',
    title: 'Darpan / Inside the Frame',
    signal: 'Film detail as a projector, not a poster.',
    accent: '#5B96A7',
  },
  {
    slug: 'v4',
    path: '/v4',
    name: 'V4',
    title: 'Kothri / The Filmmaker Room',
    signal: 'Biography as a quiet room of objects.',
    accent: '#7A6F5F',
  },
  {
    slug: 'v5',
    path: '/v5',
    name: 'V5',
    title: 'Jharokha / The Open Window',
    signal: 'Contact as an aperture opening to light.',
    accent: '#E8DFC9',
  },
  {
    slug: 'v6',
    path: '/v6',
    name: 'V6',
    title: 'Ardha Chakra / Scroll Semicircles',
    signal: 'Devanagari initials, concentric arcs, complete section reveals.',
    accent: '#D8B36B',
  },
];

const variantBySlug = (slug) => VARIATION_LINKS.find((v) => v.slug === slug);

const VariationLocalNav = ({ accent, active, showIndex = true }) => {
  const items = [
    { id: 'films', label: 'Films' },
    { id: 'photographs', label: active === 'v6' ? 'Pictures' : 'Photographs' },
    { id: 'words', label: 'Words' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <header className="variant-nav" style={{ '--accent': accent }}>
      <Logo size="sm" wordmark />
      <nav className="variant-nav-links" aria-label="Sections">
        {items.map((n) => (
          <a key={n.id} href={`#${n.id}`}>
            <span>{n.label}</span>
          </a>
        ))}
      </nav>
      {showIndex && (
        <Link to="/" className="variant-original-link">
          <span className="eyebrow">Index</span>
        </Link>
      )}
    </header>
  );
};

const VariationShell = ({ active, className = '', showIndex = true, children }) => {
  const variant = variantBySlug(active);
  return (
    <div
      className={`variation-shell ${className}`}
      style={{ '--accent': variant.accent }}
    >
      <div className="variation-grain" aria-hidden />
      <VariationLocalNav accent={variant.accent} active={active} showIndex={showIndex} />
      {children}
    </div>
  );
};

const VariantMeta = ({ index, slug, tone }) => (
  <div className="variant-meta-row">
    <span>{index}</span>
    <span>{slug}</span>
    <span>{tone}</span>
  </div>
);

const CineSectionHead = ({ index, deva }) => (
  <div className="cine-section-head">
    <span>{index}</span>
    <em />
    <span>{deva}</span>
  </div>
);

// ====== V1 — SWARA ======================================================
const SwaraVariation = () => {
  const ringFilms = FILMS.slice(0, 8);
  const stride = 360 / ringFilms.length;

  return (
    <VariationShell active="v1" className="swara-page">
      <main>
        <section id="top" className="swara-hero">
          <div className="swara-orbit" aria-hidden>
            <span className="swara-core" />
            <span className="orbit-ring orbit-ring-one" />
            <span className="orbit-ring orbit-ring-two" />
            <span className="orbit-dot orbit-dot-one" />
            <span className="orbit-dot orbit-dot-two" />
            <span className="orbit-dot orbit-dot-three" />
          </div>
          <div className="variant-hero-copy swara-hero-copy">
            <VariantMeta index="01" slug="/v1" tone="Shanta / chamber" />
            <h1 className="swara-name">
              <span className="cascade-line">
                <LetterCascade text="Swanand" startDelay={300} perChar={55} />
              </span>
              <span className="cascade-line">
                <LetterCascade text="Kottewar" startDelay={730} perChar={55} />
              </span>
            </h1>
            <p className="swara-tag">Filmmaker · Photographer · Nagpur</p>
          </div>
        </section>

        <section id="films" className="swara-section swara-chamber">
          <CineSectionHead index="01" title="Films" deva="फ़िल्में" />
          <h2>Films</h2>
          <div className="swara-orbit-stage">
            {ringFilms.map((film, i) => (
              <Link
                key={film.slug}
                to={`/films/${film.slug}`}
                className="swara-orbit-card"
                style={{
                  transform: `rotateY(${i * stride}deg) translateZ(280px)`,
                }}
              >
                <img src={film.poster} alt={film.title} loading="lazy" />
                <span>{film.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section id="photographs" className="swara-section">
          <CineSectionHead index="02" title="Photographs" deva="छवियाँ" />
          <h2>Photographs</h2>
          <div className="swara-photo-strip">
            {PHOTO_SERIES.map((s, i) => (
              <Link
                key={s.slug}
                to={`/photographs/${s.slug}`}
                className="swara-photo-card"
                style={{ '--idx': i }}
              >
                <img src={s.cover} alt={s.title} loading="lazy" />
                <span>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <small>{s.title}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="words" className="swara-section">
          <CineSectionHead index="03" title="Words" deva="शब्द" />
          <h2>Words</h2>
          <div className="swara-words-cosmos">
            {WORDS.map((w, i) => {
              const positions = [
                { top: '10%', left: '8%', z: 60 },
                { top: '24%', left: '52%', z: -20 },
                { top: '52%', left: '12%', z: 30 },
                { top: '40%', left: '70%', z: -40 },
                { top: '70%', left: '40%', z: 80 },
                { top: '18%', left: '78%', z: 0 },
              ];
              const pos = positions[i % positions.length];
              return (
                <Link
                  key={w.slug}
                  to={`/words/${w.slug}`}
                  className="swara-word-orb"
                  style={{
                    '--top': pos.top,
                    '--left': pos.left,
                    '--z': `${pos.z}px`,
                    '--delay': `${i * 0.4}s`,
                  }}
                >
                  <small>{w.category}</small>
                  {w.title}
                </Link>
              );
            })}
          </div>
        </section>

        <section id="about" className="swara-section">
          <CineSectionHead index="04" title="About" deva="परिचय" />
          <h2>About</h2>
          <div className="swara-about">
            <div className="swara-about-portrait">
              <img src={media('swanand-portrait.jpg')} alt="Swanand Kottewar" loading="lazy" />
            </div>
            <div className="swara-about-text">
              <p>Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places.</p>
              <p>Storytelling rooted in observation and reflection. Films screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland, and awarded at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.</p>
            </div>
          </div>
          <div className="swara-timeline">
            {TIMELINE.map((t) => (
              <Reveal key={t.year}>
                <article>
                  <h3>{t.year}</h3>
                  <p>{t.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="swara-section">
          <CineSectionHead index="05" title="Contact" deva="संपर्क" />
          <h2>Contact</h2>
          <div className="swara-contact">
            <a href="mailto:lifeskaisart@gmail.com">lifeskaisart@gmail.com</a>
            <a href="tel:+918956126016">+91 89561 26016</a>
          </div>
        </section>
      </main>
    </VariationShell>
  );
};

// ====== V2 — CHAKRA ======================================================
const ChakraVariation = () => {
  const focus = FILMS[1];
  const legoPhotos = PHOTO_SERIES.flatMap((s) => s.images.slice(0, 3)).slice(0, 12);
  const brickColors = [
    '#C99E5B', '#8C3D2E', '#5B96A7', '#7A6F5F',
    '#6E8B5A', '#A8754E', '#3F5C68', '#A38C4E',
  ];

  return (
    <VariationShell active="v2" className="chakra-page">
      <main>
        <section id="top" className="chakra-hero">
          <div className="chakra-copy">
            <VariantMeta index="02" slug="/v2" tone="Adbhuta / reel" />
            <h1>
              <span className="cascade-line">
                <LetterCascade text="Swanand" startDelay={300} perChar={55} />
              </span>
              <span className="cascade-line">
                <LetterCascade text="Kottewar" startDelay={730} perChar={55} />
              </span>
            </h1>
            <div className="chakra-feature">
              <span>Focused frame</span>
              <strong>{focus.title}</strong>
              <small>{focus.type} / {focus.year} / {focus.runtime}</small>
            </div>
          </div>
          <div className="chakra-stage" aria-label="Film reel preview">
            <div className="chakra-halo" aria-hidden />
            {FILMS.slice(0, 8).map((film, i) => {
              const angle = (360 / 8) * i;
              return (
                <Link
                  key={film.slug}
                  to={`/films/${film.slug}`}
                  className="chakra-frame"
                  style={{
                    backgroundImage: `url(${film.poster})`,
                    transform: `rotate(${angle}deg) translateX(19rem) rotate(${-angle}deg)`,
                  }}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <strong>{film.title}</strong>
                </Link>
              );
            })}
            <Link to={`/films/${focus.slug}`} className="chakra-center">
              <img src={focus.poster} alt={focus.title} />
              <span>Open film</span>
            </Link>
          </div>
        </section>

        <section id="films" className="chakra-section">
          <CineSectionHead index="01" title="Films" deva="फ़िल्में" />
          <h2>Films</h2>
          <div className="chakra-filmstrip">
            <div className="chakra-strip-track">
              {[...FILMS, ...FILMS].map((film, i) => (
                <Link key={`${film.slug}-${i}`} to={`/films/${film.slug}`} className="chakra-strip-frame">
                  <img src={film.poster} alt={film.title} loading="lazy" />
                  <div className="chakra-strip-meta">
                    <strong>{film.title}</strong>
                    <small>{film.year} / {film.runtime}</small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="photographs" className="chakra-section">
          <CineSectionHead index="02" title="Photographs" deva="छवियाँ" />
          <h2>Photographs</h2>
          <div className="chakra-lego">
            {legoPhotos.map((src, i) => {
              const series = PHOTO_SERIES[Math.floor(i / 3) % PHOTO_SERIES.length];
              const brick = brickColors[i % brickColors.length];
              return (
                <Link
                  key={i}
                  to={`/photographs/${series.slug}`}
                  className="chakra-lego-tile"
                  style={{ '--idx': i, '--brick': brick }}
                >
                  <img src={src} alt={series.title} loading="lazy" />
                  <span>
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    <small>{series.title}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="words" className="chakra-section">
          <CineSectionHead index="03" title="Words" deva="शब्द" />
          <h2>Words</h2>
          <div className="chakra-credits">
            <div className="chakra-credits-track">
              {[...WORDS, ...WORDS].map((w, i) => (
                <Link key={`${w.slug}-${i}`} to={`/words/${w.slug}`} className="chakra-credits-row">
                  <span>{w.category}</span>
                  <strong>{w.title}</strong>
                  <small>{new Date(w.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</small>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="chakra-section">
          <CineSectionHead index="04" title="About" deva="परिचय" />
          <h2>About</h2>
          <div className="chakra-about">
            <div>
              <p>Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places.</p>
              <p>Films screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland, and awarded at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.</p>
            </div>
            <div className="chakra-about-portrait">
              <img src={media('swanand-portrait.jpg')} alt="Swanand Kottewar" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="contact" className="chakra-section">
          <CineSectionHead index="05" title="Contact" deva="संपर्क" />
          <h2>Contact</h2>
          <div className="swara-contact">
            <a href="mailto:lifeskaisart@gmail.com">lifeskaisart@gmail.com</a>
            <a href="tel:+918956126016">+91 89561 26016</a>
          </div>
        </section>
      </main>
    </VariationShell>
  );
};

// ====== V3 — DARPAN ======================================================
const DarpanVariation = () => {
  const film = FILMS[0];
  const stills = film.stills.length > 0 ? film.stills : [film.poster];
  // Build a contact sheet from photo series images
  const contactCells = PHOTO_SERIES.flatMap((s) => s.images.slice(0, 3)).slice(0, 12);

  return (
    <VariationShell active="v3" className="darpan-page">
      <main className="darpan-bg">
        <section id="top" className="darpan-hero">
          <div className="darpan-title">
            <VariantMeta index="03" slug="/v3" tone="Karuna / projector" />
            <h1>
              <span className="cascade-line">
                <LetterCascade text="Swanand" startDelay={300} perChar={55} />
              </span>
              <span className="cascade-line">
                <LetterCascade text="Kottewar" startDelay={730} perChar={55} />
              </span>
            </h1>
          </div>
          <div className="darpan-layout">
            <div className="projector-frame">
              <img src={stills[0]} alt={`${film.title} projected still`} />
              <span className="projector-burn" aria-hidden />
              <div className="projector-caption">
                <span>{film.title}</span>
                <small>{film.type} / {film.year} / {film.runtime}</small>
              </div>
            </div>
            <aside className="darpan-panel">
              <p className="variant-kicker">Synopsis</p>
              <h2>{film.title}</h2>
              <p>{film.synopsis}</p>
              <div className="darpan-still-strip">
                {stills.map((src, i) => (
                  <img key={src} src={src} alt={`${film.title} still ${i + 1}`} loading="lazy" />
                ))}
              </div>
              <Link to={`/films/${film.slug}`} className="variant-cta">View full detail</Link>
            </aside>
          </div>
        </section>

        <section id="films" className="darpan-section">
          <CineSectionHead index="01" title="Films" deva="फ़िल्में" />
          <h2>Films</h2>
          <div className="darpan-stack">
            {FILMS.map((f, i) => {
              const center = (FILMS.length - 1) / 2;
              const offset = i - center;
              const rot = Math.max(-18, Math.min(18, offset * 4));
              return (
                <Link
                  key={f.slug}
                  to={`/films/${f.slug}`}
                  className="darpan-frame"
                  style={{ '--rot': rot }}
                >
                  <img src={f.poster} alt={f.title} loading="lazy" />
                  <div className="darpan-frame-meta">
                    <strong>{f.title}</strong>
                    <small>{f.year}</small>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="photographs" className="darpan-section">
          <CineSectionHead index="02" title="Photographs" deva="छवियाँ" />
          <h2>Photographs</h2>
          <div className="darpan-contact-sheet">
            {contactCells.map((src, i) => {
              const series = PHOTO_SERIES[Math.floor(i / 3) % PHOTO_SERIES.length];
              return (
                <Link
                  key={i}
                  to={`/photographs/${series.slug}`}
                  className="darpan-sheet-cell"
                  data-num={String(i + 1).padStart(2, '0')}
                >
                  <img src={src} alt={series.title} loading="lazy" />
                </Link>
              );
            })}
          </div>
        </section>

        <section id="words" className="darpan-section">
          <CineSectionHead index="03" title="Words" deva="शब्द" />
          <h2>Words</h2>
          <div className="darpan-subtitles">
            {WORDS.map((w, i) => (
              <Link key={w.slug} to={`/words/${w.slug}`} className="darpan-sub-row">
                <span>{String(i + 1).padStart(2, '0')} / {w.category}</span>
                <strong>{w.title}</strong>
                <small>{new Date(w.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</small>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className="darpan-section">
          <CineSectionHead index="04" title="About" deva="परिचय" />
          <h2>About</h2>
          <div className="chakra-about">
            <div>
              <p>Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places.</p>
              <p>Storytelling rooted in observation and reflection. Films screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland, and awarded at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.</p>
            </div>
            <div className="darpan-still-strip">
              {FILMS.slice(0, 3).map((f) => (
                <img key={f.slug} src={f.poster} alt={f.title} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="darpan-section">
          <CineSectionHead index="05" title="Contact" deva="संपर्क" />
          <h2>Contact</h2>
          <div className="swara-contact">
            <a href="mailto:lifeskaisart@gmail.com">lifeskaisart@gmail.com</a>
            <a href="tel:+918956126016">+91 89561 26016</a>
          </div>
        </section>
      </main>
    </VariationShell>
  );
};

// ====== V4 — KOTHRI ======================================================
const KothriVariation = () => {
  return (
    <VariationShell active="v4" className="kothri-page">
      <main className="kothri-floor">
        <section id="top" className="kothri-hero">
          <div className="kothri-copy">
            <VariantMeta index="04" slug="/v4" tone="Shanta / room" />
            <h1>
              <span className="cascade-line">
                <LetterCascade text="Swanand" startDelay={300} perChar={55} />
              </span>
              <span className="cascade-line">
                <LetterCascade text="Kottewar" startDelay={730} perChar={55} />
              </span>
            </h1>
          </div>
          <div className="room-scene" aria-label="Filmmaker room composition">
            <span className="room-window" />
            <span className="room-poster" />
            <span className="room-lamp" />
            <span className="room-desk" />
            <span className="room-reel" />
            <span className="room-cup" />
            <div className="room-books">
              {TIMELINE.map((t, i) => (
                <span key={t.year} style={{ height: `${86 + i * 10}px` }}>
                  {t.year}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="films" className="kothri-section">
          <CineSectionHead index="01" title="Films" deva="फ़िल्में" />
          <h2>Films</h2>
          <div className="kothri-shelf">
            {FILMS.map((f) => (
              <Link key={f.slug} to={`/films/${f.slug}`} className="kothri-book">
                <img src={f.poster} alt={f.title} loading="lazy" />
                <div className="kothri-book-meta">
                  <strong>{f.title}</strong>
                  <small>{f.year} / {f.runtime}</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="photographs" className="kothri-section">
          <CineSectionHead index="02" title="Photographs" deva="छवियाँ" />
          <h2>Photographs</h2>
          <div className="kothri-pile">
            {PHOTO_SERIES.map((s, i) => {
              const tilts = [-9, 4, -2, 8];
              const xs = [-60, 80, -120, 150];
              const ys = [-40, 30, 60, -50];
              const zs = [10, 20, 0, 30];
              return (
                <Link
                  key={s.slug}
                  to={`/photographs/${s.slug}`}
                  className="kothri-polaroid"
                  style={{
                    '--tilt': `${tilts[i]}deg`,
                    '--x': `${xs[i]}px`,
                    '--y': `${ys[i]}px`,
                    '--z': `${zs[i]}px`,
                    '--depth-z': i + 1,
                  }}
                >
                  <img src={s.cover} alt={s.title} loading="lazy" />
                  <figcaption>{s.title}</figcaption>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="words" className="kothri-section">
          <CineSectionHead index="03" title="Words" deva="शब्द" />
          <h2>Words</h2>
          <div className="kothri-journal">
            {WORDS.map((w) => (
              <Link key={w.slug} to={`/words/${w.slug}`} className="kothri-page">
                <span>{w.category} / {new Date(w.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</span>
                <h3>{w.title}</h3>
                <p>{w.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className="kothri-section">
          <CineSectionHead index="04" title="About" deva="परिचय" />
          <h2>About</h2>
          <article className="kothri-letter">
            <h3>To whoever is reading,</h3>
            <p>Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places. Storytelling rooted in observation and reflection. Films stem from a personal emotion or a quest about the surroundings.</p>
            <p>Screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland. Awarded at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.</p>
            <p>Currently pursuing the Diploma in Indian Aesthetics at Jnanpravaha, Mumbai. Working on a documentary, while wondering, writing.</p>
            <p className="signature">— Swanand</p>
          </article>
        </section>

        <section id="contact" className="kothri-section">
          <CineSectionHead index="05" title="Contact" deva="संपर्क" />
          <h2>Contact</h2>
          <div className="swara-contact">
            <a href="mailto:lifeskaisart@gmail.com">lifeskaisart@gmail.com</a>
            <a href="tel:+918956126016">+91 89561 26016</a>
          </div>
        </section>
      </main>
    </VariationShell>
  );
};

// ====== V5 — JHAROKHA ====================================================
const JharokhaVariation = () => {
  const paneImages = PHOTO_SERIES.flatMap((s) => s.images.slice(0, 2)).slice(0, 9);
  const driftCards = [
    ...FILMS.slice(0, 4).map((f) => ({ src: f.poster, label: f.title, sub: f.year })),
    ...PHOTO_SERIES.map((s) => ({ src: s.cover, label: s.title, sub: 'Series' })),
    ...FILMS.slice(4, 8).map((f) => ({ src: f.poster, label: f.title, sub: f.year })),
  ];
  const driftTrack = [...driftCards, ...driftCards];
  const stats = [
    { num: '01', label: '10 yrs', value: 'Of filmmaking practice across Nagpur, Mumbai, Auroville, Ladakh, and Kutch.' },
    { num: '02', label: '10 films', value: 'Documentary, fiction, CSR, NGO profile, and field notes since 2020.' },
    { num: '03', label: '4 archives', value: 'Ongoing photo series — food, childhood, Chikoo at 13, Pankaj at work.' },
    { num: '04', label: '6 essays', value: 'Writing on cinema, art, absurdity, ideas, poetry, and connections.' },
  ];
  const festivals = [
    'IDSFFK Kerala', 'MIFF Mumbai', 'IFFSA Toronto', 'Cinemasala Switzerland',
    'CHINH Delhi', 'Quarantine IFF', 'Madurai IFF', 'South Asian FF Kolkata',
  ];

  return (
    <VariationShell active="v5" className="jharokha-page">
      <main className="jharokha-bg">
        <section id="top" className="jharokha-hero">
          <div className="jharokha-copy">
            <VariantMeta index="05" slug="/v5" tone="Adbhuta / aperture" />
            <h1>
              <span className="cascade-line">
                <LetterCascade text="Swanand" startDelay={300} perChar={55} />
              </span>
              <span className="cascade-line">
                <LetterCascade text="Kottewar" startDelay={730} perChar={55} />
              </span>
            </h1>
            <div className="jharokha-contact">
              <a href="mailto:lifeskaisart@gmail.com">lifeskaisart@gmail.com</a>
              <a href="tel:+918956126016">+91 89561 26016</a>
            </div>
          </div>
          <div className="iris-stage" aria-hidden>
            <div className="iris-sky">
              <span className="iris-cloud iris-cloud-one" />
              <span className="iris-cloud iris-cloud-two" />
            </div>
            <div className="iris">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="iris-blade"
                  style={{ transform: `rotate(${i * 40}deg) translateY(-42%)` }}
                />
              ))}
            </div>
            <span className="iris-email">Open to work</span>
          </div>
        </section>

        <section className="jharokha-section">
          <div className="jharokha-drift" aria-label="Featured drift">
            <div className="jharokha-drift-track">
              {driftTrack.map((item, i) => {
                const series = PHOTO_SERIES[i % PHOTO_SERIES.length];
                const film = FILMS[i % FILMS.length];
                const target = item.sub === 'Series' ? `/photographs/${series.slug}` : `/films/${film.slug}`;
                const rot = (i % 4 === 0 ? -8 : i % 3 === 0 ? 4 : 0);
                const y = (i % 2 === 0 ? -12 : 12);
                return (
                  <Link
                    key={i}
                    to={target}
                    className="jharokha-drift-card"
                    style={{ '--idx': i, '--rot': `${rot}deg`, '--y': `${y}px` }}
                  >
                    <img src={item.src} alt={item.label} loading="lazy" />
                    <span>
                      <small>{item.sub}</small>
                      <small>{item.label}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="jharokha-glass-row">
            {stats.map((s) => (
              <Reveal key={s.num}>
                <article className="jharokha-glass">
                  <span className="jharokha-glass-num">{s.num}</span>
                  <p className="jharokha-glass-label">{s.label}</p>
                  <p className="jharokha-glass-value">{s.value}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="films" className="jharokha-section">
          <CineSectionHead index="01" title="Films" deva="फ़िल्में" />
          <h2>Films</h2>
          <div className="jharokha-shafts">
            {FILMS.slice(0, 8).map((f, i) => (
              <Link
                key={f.slug}
                to={`/films/${f.slug}`}
                className="jharokha-shaft"
                style={{ '--idx': i }}
              >
                <img src={f.poster} alt={f.title} loading="lazy" />
                <div className="jharokha-shaft-meta">
                  <strong>{f.title}</strong>
                  <small>{f.year} / {f.runtime}</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="photographs" className="jharokha-section">
          <CineSectionHead index="02" title="Photographs" deva="छवियाँ" />
          <h2>Photographs</h2>
          <div className="jharokha-window">
            {paneImages.map((src, i) => {
              const series = PHOTO_SERIES[Math.floor(i / 2) % PHOTO_SERIES.length];
              return (
                <Link
                  key={i}
                  to={`/photographs/${series.slug}`}
                  className="jharokha-pane"
                >
                  <img src={src} alt={series.title} loading="lazy" />
                  <span>
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    <small>{series.title}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="words" className="jharokha-section">
          <CineSectionHead index="03" title="Words" deva="शब्द" />
          <h2>Words</h2>
          <div className="jharokha-fragments">
            {WORDS.map((w) => (
              <Link key={w.slug} to={`/words/${w.slug}`} className="jharokha-fragment">
                <span>{w.category}</span>
                <h3>{w.title}</h3>
                <p>{w.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className="jharokha-section">
          <CineSectionHead index="04" title="About" deva="परिचय" />
          <h2>About</h2>
          <div className="jharokha-aperture">
            <div className="jharokha-aperture-portal">
              <img src={media('swanand-portrait.jpg')} alt="Swanand Kottewar" loading="lazy" />
            </div>
            <div className="jharokha-aperture-text">
              <p>Filmmaker based out of Nagpur. Ten years of work in films, as a medium to empathise and connect with people and places.</p>
              <p>Films screened at IDSFFK Kerala, MIFF Mumbai, IFFSA Toronto, Cinemasala Switzerland, and awarded at CHINH Youth Film Festival, Delhi and Quarantine International Film Festival.</p>
            </div>
          </div>
        </section>

        <div className="jharokha-marquee" aria-hidden>
          <div className="jharokha-marquee-track">
            {[...festivals, ...festivals].map((f, i) => (
              <span key={i} className="jharokha-marquee-item">{f}</span>
            ))}
          </div>
        </div>

        <section id="contact" className="jharokha-section">
          <CineSectionHead index="05" title="Contact" deva="संपर्क" />
          <h2>Contact</h2>
          <div className="jharokha-call">
            <a href="mailto:lifeskaisart@gmail.com">lifeskaisart@gmail.com</a>
            <a href="tel:+918956126016">+91 89561 26016</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram / lifeskaisart</a>
          </div>
        </section>
      </main>
    </VariationShell>
  );
};

// ============================================================
// FOOTER
// ============================================================

const Footer = () => (
  <footer className="relative bg-base border-t border-rule">
    <div className="overflow-hidden border-b border-rule">
      <div className="marquee-track flex whitespace-nowrap py-12">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-16 px-8 shrink-0">
            {['स्व', 'Films', 'Photographs', 'Words', 'Filmmaker', 'Photographer', 'Nagpur', '↗'].map((t, j) => (
              <span key={j} className={`display font-light tracking-tight ${t === '↗' ? 'text-ink/30' : 'text-ink/90'} text-5xl lg:text-7xl ${t === 'स्व' ? 'deva' : ''} ${j % 2 === 1 ? 'italic' : ''}`}>
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="px-6 sm:px-10 lg:px-16 xl:px-24 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <span className="deva text-2xl text-ink">स्वानंद</span>
        <span className="text-sm text-muted">© {new Date().getFullYear()} Swanand Kottewar. All rights reserved.</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted">
        <a href="#films" className="hover:text-ink transition-colors duration-500 underline-grow">Films</a>
        <a href="#photographs" className="hover:text-ink transition-colors duration-500 underline-grow">Photographs</a>
        <a href="#words" className="hover:text-ink transition-colors duration-500 underline-grow">Words</a>
        <a href="#about" className="hover:text-ink transition-colors duration-500 underline-grow">About</a>
        <a href="#contact" className="hover:text-ink transition-colors duration-500 underline-grow">Contact</a>
      </div>
    </div>
  </footer>
);

// ============================================================
// APP
// ============================================================

const ScrollManager = () => {
  const location = useLocation();
  useEffect(() => {
    const { hash } = location;
    if (hash) {
      // Defer to allow target render
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0 });
        }
      });
    } else {
      window.scrollTo({ top: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);
  return null;
};


const HomePage = () => (
  <main>
    <Hero />
    <FilmsSection />
    <PhotographsSection />
    <WordsSection />
    <AboutSection />
    <ContactSection />
  </main>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-base text-ink">
      <ScrollManager />
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-50 origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav scrolled={scrolled} />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route path="/v" element={<Navigate to="/v1" replace />} />
        <Route path="/v1" element={React.createElement(SwaraVariation)} />
        <Route path="/v2" element={React.createElement(ChakraVariation)} />
        <Route path="/v3" element={React.createElement(DarpanVariation)} />
        <Route path="/v4" element={React.createElement(KothriVariation)} />
        <Route path="/v5" element={React.createElement(JharokhaVariation)} />
        <Route path="/v6" element={React.createElement(V6Variation)} />
        <Route path="/films/:slug" element={<FilmPage />} />
        <Route path="/photographs/:slug" element={<SeriesPage />} />
        <Route path="/words/:slug" element={<WordsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
