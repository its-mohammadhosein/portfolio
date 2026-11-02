import type { SeedArgs } from '../helpers'
import { upsertBySlug, upsertMedia } from '../helpers'

/** Home page from the html base (migration/content/home.json), section by section. */
export const seedHome = async (args: SeedArgs, projectIds: Record<string, number>) => {
  const heroImage = await upsertMedia(args, 'hero-image.webp', 'Ricky Dyson portrait')
  const marqueeBg = await upsertMedia(args, '1-3.webp', 'Studio work background')
  const heightsVideo = await upsertMedia(args, 'video2.mp4', 'Reaching new heights video')

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
      {
        blockType: 'featureList',
        label: 'Benefits',
        pinned: true,
        theme: 'dark',
        items: [
          {
            icon: 'creativeExcellence',
            title: 'Creative Excellence',
            text: 'We combine imagination with expertise to craft bold and innovative ideas that elevate your brand’s identity and make a lasting impression.',
          },
          {
            icon: 'professionalTeam',
            title: 'Professional Team',
            text: 'Our dedicated team of designers, developers, and strategists bring years of experience and a passion for excellence to deliver outstanding results.',
          },
          {
            icon: 'collaborativeApproach',
            title: 'Collaborative Approach',
            text: 'Your input is invaluable. We work closely with you, maintaining open communication and refining ideas to ensure the final product exceeds expectations.',
          },
          {
            icon: 'onTimeDelivery',
            title: 'On-Time Delivery',
            text: 'We respect your deadlines and commit to delivering high-quality work on schedule, ensuring your project’s success without compromise.',
          },
        ],
        animation: { preset: 'fade-up' },
      },
      {
        blockType: 'statement',
        title: 'Reaching\nNew Heights',
        titleSize: 'large',
        align: 'bottomLeft',
        text: 'Each project is a chance to explore new possibilities, challenge conventions, and design experiences that resonate deeply. For me, reaching new heights means constantly evolving brands do the same through design.',
        backgroundMedia: heightsVideo,
        overlayOpacity: 0.25,
        enableLink: true,
        link: { type: 'custom', url: '/about', label: 'More about me', appearance: 'underline' },
        theme: 'dark',
        animation: { preset: 'text-reveal', delay: 0.15, duration: 0.7, stagger: 0.1 },
      },
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
