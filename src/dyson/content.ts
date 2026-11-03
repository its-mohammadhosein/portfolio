/**
 * The html base content (migration/content), in one place. Used two ways:
 *   - as the built-in defaults of the fixed pages (src/dyson/defaults.ts), media from public/dyson
 *   - by the Dyson seed (src/endpoints/seed/dyson), which uploads the media and fills Payload
 * Media are referenced as `media('file.webp')` and resolved by whoever reads this.
 */
import type { DysonMediaFile } from './media'

export type MediaRef = { __media: DysonMediaFile; alt?: string }

export const media = (file: DysonMediaFile, alt?: string): MediaRef => ({ __media: file, alt })

export const isMediaRef = (value: unknown): value is MediaRef =>
  typeof value === 'object' && value !== null && '__media' in value

// ---------------------------------------------------------------------------------------------
// Shared sections

const benefits = {
  label: 'Benefits',
  pinned: true,
  theme: 'dark' as const,
  items: [
    {
      icon: 'creativeExcellence' as const,
      title: 'Creative Excellence',
      text: 'We combine imagination with expertise to craft bold and innovative ideas that elevate your brand’s identity and make a lasting impression.',
    },
    {
      icon: 'professionalTeam' as const,
      title: 'Professional Team',
      text: 'Our dedicated team of designers, developers, and strategists bring years of experience and a passion for excellence to deliver outstanding results.',
    },
    {
      icon: 'collaborativeApproach' as const,
      title: 'Collaborative Approach',
      text: 'Your input is invaluable. We work closely with you, maintaining open communication and refining ideas to ensure the final product exceeds expectations.',
    },
    {
      icon: 'onTimeDelivery' as const,
      title: 'On-Time Delivery',
      text: 'We respect your deadlines and commit to delivering high-quality work on schedule, ensuring your project’s success without compromise.',
    },
  ],
  animation: { preset: 'fade-up' as const },
}

const reaching = {
  title: 'Reaching\nNew Heights',
  titleSize: 'large' as const,
  align: 'bottomLeft' as const,
  text: 'Each project is a chance to explore new possibilities, challenge conventions, and design experiences that resonate deeply. For me, reaching new heights means constantly evolving brands do the same through design.',
  backgroundMedia: media('video2.mp4', 'Reaching new heights video'),
  overlayOpacity: 0.25,
  enableLink: true,
  link: {
    type: 'custom' as const,
    url: '/about',
    label: 'More about me',
    appearance: 'underline' as const,
  },
  theme: 'dark' as const,
  animation: { preset: 'text-reveal' as const, delay: 0.15, duration: 0.7, stagger: 0.1 },
}

// ---------------------------------------------------------------------------------------------
// Pages

export const homeContent = {
  meta: {
    title: 'Artist, Designer, Creator',
    description:
      'I am a passionate and experienced web designer dedicated to crafting stunning and functional digital spaces.',
  },
  hero: {
    title: 'R*i*cky\nDyson',
    image: media('hero-image.webp', 'Ricky Dyson portrait'),
    imageSpeed: 1.5,
    roles: [{ text: 'Artist' }, { text: 'Designer' }, { text: 'Creator' }],
    caption: 'Scroll to explore',
    showSocials: true,
    animation: { preset: 'text-reveal' as const, delay: 0.45, duration: 0.7, stagger: 0.1 },
  },
  statement: {
    title:
      'I am a passionate and experienced web designer dedicated to crafting stunning and functional digital spaces.',
    titleSize: 'statement' as const,
    align: 'center' as const,
    animation: { preset: 'text-reveal' as const, delay: 0.25, duration: 2, stagger: 0.02 },
  },
  marquee: {
    layout: 'crossed' as const,
    rows: [
      { text: 'Branding' },
      { text: 'Development' },
      { text: 'Art Direction' },
      { text: 'Design' },
    ],
    backgroundImage: media('1-3.webp', 'Studio work background'),
    overlayOpacity: 0.75,
    speed: 5000,
    gap: 50,
    theme: 'dark' as const,
  },
  work: {
    layout: 'staggered' as const,
    title: 'Work',
    intro: 'Projects of years\n©2021 — 2025',
    populateBy: 'selection' as const,
    // Hand-picked by slug (resolved to Payload projects, or to the built-in ones)
    projectSlugs: ['reimagining-reality', 'the-first-brand', 'medium-scene'],
    enableLink: true,
    link: {
      type: 'custom' as const,
      url: '/work',
      label: 'All Projects',
      appearance: 'underline' as const,
    },
    animation: { preset: 'stagger' as const },
  },
  benefits,
  reaching,
  awards: {
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
    animation: { preset: 'text-reveal' as const, delay: 0.5, duration: 1, stagger: 0.02 },
  },
}

export const workContent = {
  meta: { title: 'Work', description: 'Selected projects by Ricky Dyson.' },
  title: {
    title: 'WORK',
    size: 'xxl' as const,
    align: 'center' as const,
    animation: { preset: 'text-reveal' as const, delay: 0.15, duration: 0.7, stagger: 0.1 },
  },
  grid: {
    layout: 'grid' as const,
    populateBy: 'latest' as const,
    limit: 12,
    showTabs: false,
    animation: { preset: 'fade-up' as const },
  },
}

const ABOUT_INTRO = [
  'I am a passionate and experienced web designer dedicated to crafting stunning and functional websites. With a keen eye for detail and a deep understanding of user experience, I strive to create digital experiences that captivate and engage users. My expertise lies in combining cutting-edge design trends with intuitive navigation, ensuring that each website I create not only looks impressive but also provides a seamless user journey.',
  'In addition to my technical expertise, I place a strong emphasis on collaboration and communication. I firmly believe that the most successful websites are born from a collaborative partnership between designer and client. Collaboration is at the heart of my creative process. I work closely with clients, developers, and content creators to bring ideas to life, ensuring that every website is not only visually compelling but also strategically designed to meet business goals. My mission is to transform concepts into engaging digital experiences that leave a lasting impression.',
].join('\n\n')

export const aboutContent = {
  meta: { title: 'About', description: ABOUT_INTRO.slice(0, 150) },
  title: {
    title: "I'M R*i*cky",
    size: 'xxl' as const,
    align: 'center' as const,
    animation: { preset: 'text-reveal' as const, delay: 0.15, duration: 0.7, stagger: 0.1 },
  },
  video: {
    media: media('about-dyson-1.mp4', 'Ricky Dyson at work'),
    width: 'full' as const,
    animation: { preset: 'fade-up' as const },
  },
  lists: {
    lists: [
      { label: 'Services', entries: 'Branding\nDesign\nAnimation\nDevelopment\nArt Direction' },
      { label: 'Clients', entries: 'Nike\nAdobe\nGoogle\nCoca Cola\nSony' },
      { label: 'Skills', entries: 'Figma\nPhotoshop\nWebflow\nFramer\nHTML/CSS' },
      {
        label: 'Awards',
        entries: 'Awwwards (5)\nThe Webby Awards (1)\nThe FWA (2)\nLovie Awards (1)\nCSSDA (7)',
      },
    ],
    text: ABOUT_INTRO,
    animation: { preset: 'text-reveal' as const, delay: 0.15, duration: 0.75, stagger: 0.01 },
  },
  benefits,
  reaching,
  experience: {
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
    link: {
      type: 'custom' as const,
      url: '#',
      label: 'Download CV',
      appearance: 'underline' as const,
    },
    animation: { preset: 'text-reveal' as const, delay: 0.5, duration: 1, stagger: 0.02 },
  },
}

export const contactContent = {
  meta: { title: 'Contact', description: 'Have a question? Just drop me a line.' },
  title: {
    title: 'Let’s Talk',
    size: 'xxl' as const,
    align: 'center' as const,
    animation: { preset: 'text-reveal' as const, delay: 0.15, duration: 0.7, stagger: 0.1 },
  },
  image: {
    media: media('1.webp', 'Studio workspace'),
    width: 'full' as const,
    speed: 0.9,
    animation: { preset: 'fade-up' as const },
  },
  info: {
    text: 'Have a question? Just drop me a line via email or make a WhatsApp call. I am available for new projects and interesting opportunities.',
    showEmail: true,
    showPhone: true,
    showSocials: true,
    animation: { preset: 'chars' as const, delay: 0, duration: 0.75, stagger: 0.02 },
  },
  form: {
    title: 'I’d love to\nhear from you',
    animation: { preset: 'text-reveal' as const, delay: 0.5, duration: 1, stagger: 0.02 },
  },
}

// ---------------------------------------------------------------------------------------------
// Projects

export const PROJECT_OVERVIEW =
  'Tasked with revamping the branding and corporate website for Reimagining Reality, a forward-thinking creative agency, our team delved deep into their ethos, distilling their essence into a kaleidoscope of colors, shapes, and narratives. Seamlessly blending innovative design with user-centric functionality, we transformed their online presence into an immersive journey, reflecting their diverse talents and imaginative approach. From the fluidity of the logo to the intricacies of the interface, every element was meticulously crafted, resulting in a captivating showcase of Reimagining Reality creativity and our studio’s design finesse.'

export const PROJECT_LIVE_URL = 'https://themeforest.net/user/treethemes/portfolio'

export const categoryTitles = {
  branding: 'Branding',
  design: 'Design',
  development: 'Development',
} as const

export type CategorySlug = keyof typeof categoryTitles

/** html base projects in Work page order (newest first); images: hero first, then gallery */
export const projectsContent: {
  slug: string
  title: string
  heroTitle: string
  year: string
  categories: CategorySlug[]
  cover: DysonMediaFile
  images: DysonMediaFile[]
  more: string[]
}[] = [
  {
    slug: 'reimagining-reality',
    title: 'Reimagining Reality',
    heroTitle: 'Reimagining\nReality',
    year: '@2025',
    categories: ['branding', 'design'],
    cover: 'preview-4.webp',
    images: ['1-4.webp', '2-4.webp', '3-4.webp'],
    more: ['the-first-brand', 'visual-symphony'],
  },
  {
    slug: 'beyond-the-screen',
    title: 'Beyond the Screen',
    heroTitle: 'Beyond the\nScreen',
    year: '@2025',
    categories: ['branding'],
    cover: 'preview-3.webp',
    images: ['1-3.webp', '2-3.webp', '3-3.webp'],
    more: ['pixel-playground', 'reimagining-reality'],
  },
  {
    slug: 'the-first-brand',
    title: 'The First Brand',
    heroTitle: 'The First\nBrand',
    year: '@2024',
    categories: ['design'],
    cover: 'preview-2.webp',
    images: ['1-2.webp', '3-2.webp', '4-1.webp', '2-2.webp'],
    more: ['medium-scene', 'reimagining-reality'],
  },
  {
    slug: 'pixel-playground',
    title: 'Pixel Playground',
    heroTitle: 'Pixel\nPlayground',
    year: '@2023',
    categories: ['branding', 'design'],
    cover: 'preview-1.webp',
    images: ['1-1.webp', '2-1.webp', '3-1.webp'],
    more: ['medium-scene', 'reimagining-reality'],
  },
  {
    slug: 'medium-scene',
    title: 'Medium Scene',
    heroTitle: 'Medium\nScene',
    year: '@2022',
    categories: ['design', 'development'],
    cover: 'preview.webp',
    images: ['1.webp', '2.webp', '4.webp'],
    more: ['pixel-playground', 'reimagining-reality'],
  },
  {
    slug: 'visual-symphony',
    title: 'Visual Symphony',
    heroTitle: 'Visual\nSymphony',
    year: '@2021',
    categories: ['branding'],
    cover: 'visualpreview.webp',
    images: ['visual1a.webp', 'visual3.webp', 'visual2.webp'],
    more: ['beyond-the-screen', 'reimagining-reality'],
  },
]

// ---------------------------------------------------------------------------------------------
// Globals

export const siteSettingsContent = {
  email: 'welcome@rckydayson.com',
  phone: '+1 837 652 8800',
  socials: [
    { platform: 'facebook' as const, label: 'Facebook', url: '#' },
    { platform: 'instagram' as const, label: 'Instagram', url: '#' },
    { platform: 'x' as const, label: 'X.com', url: '#' },
  ],
  smoothScroll: true,
  scrollToTop: true,
}

export const headerContent = {
  logo: media('logo.svg', 'Ricky Dyson'),
  availability: { enabled: true, text: 'Available May 2026' },
  showSearch: true,
  navItems: [
    { link: { type: 'page' as const, page: 'home' as const, label: 'Home' } },
    { link: { type: 'page' as const, page: 'work' as const, label: 'Work' } },
    { link: { type: 'page' as const, page: 'about' as const, label: 'About' } },
    { link: { type: 'page' as const, page: 'contact' as const, label: 'Contact' } },
  ],
}

export const footerContent = {
  cta: {
    eyebrow: 'Have a project in mind?',
    enableLink: true,
    link: { type: 'page' as const, page: 'contact' as const, label: "Let's Talk" },
  },
  showSocials: true,
  wordmark: 'R*i*cky\nDyson',
  credit: 'Designed by Treethemes.',
  navItems: [
    { link: { type: 'custom' as const, url: '#', label: 'Instructions' } },
    { link: { type: 'custom' as const, url: '#', label: 'Style Guide' } },
    { link: { type: 'custom' as const, url: '#', label: 'Licenses' } },
    { link: { type: 'custom' as const, url: '#', label: 'Changelog' } },
  ],
}
