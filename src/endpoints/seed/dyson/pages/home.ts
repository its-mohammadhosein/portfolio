import type { SeedArgs } from '../helpers'
import { upsertBySlug, upsertMedia } from '../helpers'
import { benefitsBlock, reachingBlock } from './shared'

/** Home page from the html base (migration/content/home.json), section by section. */
export const seedHome = async (args: SeedArgs, projectIds: Record<string, number>) => {
  const heroImage = await upsertMedia(args, 'hero-image.webp', 'Ricky Dyson portrait')
  const marqueeBg = await upsertMedia(args, '1-3.webp', 'Studio work background')

  await upsertBySlug(args, 'pages', 'home', {
    title: 'Home',
    slug: 'home',
    hero: { type: 'none' },
    _status: 'published',
    meta: {
      title: 'Ricky Dyson — Artist, Designer, Creator',
      description:
        'I am a passionate and experienced web designer dedicated to crafting stunning and functional digital spaces.',
    },
    layout: [
      {
        blockType: 'heroDisplay',
        title: 'R*i*cky\nDyson',
        image: heroImage,
        imageSpeed: 1.5,
        roles: [{ text: 'Artist' }, { text: 'Designer' }, { text: 'Creator' }],
        caption: 'Scroll to explore',
        showSocials: true,
        animation: { preset: 'text-reveal', delay: 0.45, duration: 0.7, stagger: 0.1 },
      },
      {
        blockType: 'statement',
        title:
          'I am a passionate and experienced web designer dedicated to crafting stunning and functional digital spaces.',
        titleSize: 'statement',
        align: 'center',
        animation: { preset: 'text-reveal', delay: 0.25, duration: 2, stagger: 0.02 },
      },
      {
        blockType: 'marquee',
        layout: 'crossed',
        rows: [
          { text: 'Branding' },
          { text: 'Development' },
          { text: 'Art Direction' },
          { text: 'Design' },
        ],
        backgroundImage: marqueeBg,
        overlayOpacity: 0.75,
        speed: 5000,
        gap: 50,
        theme: 'dark',
      },
      {
        blockType: 'portfolioGrid',
        layout: 'staggered',
        title: 'Work',
        intro: 'Projects of years\n©2021 — 2025',
        populateBy: 'selection',
        projects: [
          projectIds['reimagining-reality'],
          projectIds['the-first-brand'],
          projectIds['medium-scene'],
        ],
        enableLink: true,
        link: { type: 'custom', url: '/work', label: 'All Projects', appearance: 'underline' },
        animation: { preset: 'stagger' },
      },
      benefitsBlock(),
      await reachingBlock(args),
      {
        blockType: 'dataTable',
        title: 'Awards /\nRecognitions',
        columns: { first: 'Featured by', second: 'Award', third: 'Year' },
        rows: [
          { first: 'Awwwards', second: 'Site of the day', third: '2025' },
          { first: 'Awwwards', second: 'Developer Award', third: '2025' },
          { first: 'The Webby Awards', second: 'Site of the Month', third: '2024' },
          { first: 'The FWA', second: 'Site of the day', third: '2023' },
          { first: 'Lovie Awards', second: 'The Best Website', third: '2022' },
          { first: 'Awwwards', second: 'Honorable Mention', third: '2021' },
          { first: 'CSS Design Awards', second: 'Site of the day', third: '2021' },
        ],
        animation: { preset: 'text-reveal', delay: 0.5, duration: 1, stagger: 0.02 },
      },
    ],
  })
  args.payload.logger.info('— Dyson home page seeded')
}
