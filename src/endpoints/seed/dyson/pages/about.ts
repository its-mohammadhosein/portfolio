import type { SeedArgs } from '../helpers'
import { upsertBySlug, upsertMedia } from '../helpers'
import { benefitsBlock, reachingBlock } from './shared'

const INTRO = [
  'I am a passionate and experienced web designer dedicated to crafting stunning and functional websites. With a keen eye for detail and a deep understanding of user experience, I strive to create digital experiences that captivate and engage users. My expertise lies in combining cutting-edge design trends with intuitive navigation, ensuring that each website I create not only looks impressive but also provides a seamless user journey.',
  'In addition to my technical expertise, I place a strong emphasis on collaboration and communication. I firmly believe that the most successful websites are born from a collaborative partnership between designer and client. Collaboration is at the heart of my creative process. I work closely with clients, developers, and content creators to bring ideas to life, ensuring that every website is not only visually compelling but also strategically designed to meet business goals. My mission is to transform concepts into engaging digital experiences that leave a lasting impression.',
].join('\n\n')

/** About page (migration/content/about.json). */
export const seedAbout = async (args: SeedArgs) => {
  const video = await upsertMedia(args, 'about-dyson-1.mp4', 'Ricky Dyson at work')

  await upsertBySlug(args, 'pages', 'about', {
    title: 'About',
    slug: 'about',
    hero: { type: 'none' },
    _status: 'published',
    meta: { title: 'About', description: INTRO.slice(0, 150) },
    layout: [
      {
        blockType: 'pageTitle',
        title: "I'M R*i*cky",
        size: 'xxl',
        align: 'center',
        animation: { preset: 'text-reveal', delay: 0.15, duration: 0.7, stagger: 0.1 },
      },
      { blockType: 'mediaBlock', media: video, width: 'full', animation: { preset: 'fade-up' } },
      {
        blockType: 'labeledLists',
        lists: [
          { label: 'Services', entries: 'Branding\nDesign\nAnimation\nDevelopment\nArt Direction' },
          { label: 'Clients', entries: 'Nike\nAdobe\nGoogle\nCoca Cola\nSony' },
          { label: 'Skills', entries: 'Figma\nPhotoshop\nWebflow\nFramer\nHTML/CSS' },
          {
            label: 'Awards',
            entries: 'Awwwards (5)\nThe Webby Awards (1)\nThe FWA (2)\nLovie Awards (1)\nCSSDA (7)',
          },
        ],
        text: INTRO,
        animation: { preset: 'text-reveal', delay: 0.15, duration: 0.75, stagger: 0.01 },
      },
      benefitsBlock(),
      await reachingBlock(args),
      {
        blockType: 'dataTable',
        title: 'Work\nexperience',
        columns: { first: 'Position', second: 'Company', third: 'Years' },
        rows: [
          { first: 'Head of Design', second: 'Spotify', third: '2025 — Present' },
          { first: 'Art Director', second: 'Spotify', third: '2023 — 2025' },
          { first: 'Senior Designer', second: 'Netflix', third: '2022 — 2023' },
          { first: 'UI Designer', second: 'Youtube', third: '2020 — 2022' },
          { first: 'Graphic Designer', second: 'Facebook', third: '2019 — 2020' },
          { first: 'Junior Designer', second: 'Google', third: '2018 — 2019' },
          { first: 'Design Intern', second: 'Facebook', third: '2017 — 2018' },
        ],
        enableLink: true,
        link: { type: 'custom', url: '#', label: 'Download CV', appearance: 'underline' },
        animation: { preset: 'text-reveal', delay: 0.5, duration: 1, stagger: 0.02 },
      },
    ],
  })
  args.payload.logger.info('— Dyson about page seeded')
}
