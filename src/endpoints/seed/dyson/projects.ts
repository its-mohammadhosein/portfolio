import type { SeedArgs } from './helpers'
import { seedContext, upsertBySlug, upsertMedia } from './helpers'

const OVERVIEW =
  'Tasked with revamping the branding and corporate website for Reimagining Reality, a forward-thinking creative agency, our team delved deep into their ethos, distilling their essence into a kaleidoscope of colors, shapes, and narratives. Seamlessly blending innovative design with user-centric functionality, we transformed their online presence into an immersive journey, reflecting their diverse talents and imaginative approach. From the fluidity of the logo to the intricacies of the interface, every element was meticulously crafted, resulting in a captivating showcase of Reimagining Reality creativity and our studio’s design finesse.'

const LIVE_URL = 'https://themeforest.net/user/treethemes/portfolio'

/** html base projects, in Work page order (newest first); images: hero first, then gallery */
const projects = [
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

const categoryTitles: Record<string, string> = {
  branding: 'Branding',
  design: 'Design',
  development: 'Development',
}

/** Categories + the 6 projects; returns project ids by slug (for grids and links). */
export const seedProjects = async (args: SeedArgs): Promise<Record<string, number>> => {
  const categoryIds: Record<string, number> = {}
  for (const [slug, title] of Object.entries(categoryTitles)) {
    categoryIds[slug] = await upsertBySlug(args, 'categories', slug, { title, slug })
  }

  const ids: Record<string, number> = {}
  // Newest first; one day apart so "latest" sorting keeps this order
  const now = Date.now()
  for (const [i, p] of projects.entries()) {
    const [heroFile, ...galleryFiles] = p.images
    const heroImage = await upsertMedia(args, heroFile, p.title)
    const cover = await upsertMedia(args, p.cover, p.title)
    const gallery = []
    for (const file of galleryFiles) {
      gallery.push({ image: await upsertMedia(args, file, p.title), speed: 0.9 })
    }
    ids[p.slug] = await upsertBySlug(args, 'projects', p.slug, {
      title: p.title,
      slug: p.slug,
      heroTitle: p.heroTitle,
      heroImage,
      cover,
      overviewLabel: 'Overview',
      overview: OVERVIEW,
      year: p.year,
      client: p.title,
      services: 'Branding / Design',
      liveUrl: LIVE_URL,
      gallery,
      moreTitle: 'Discover\nmore Works',
      categories: p.categories.map((c) => categoryIds[c]),
      publishedAt: new Date(now - i * 86_400_000).toISOString(),
      meta: { title: p.title, description: OVERVIEW.slice(0, 150) },
      _status: 'published',
    })
  }

  // Second pass: hand-picked "more works" (needs every project's id)
  for (const p of projects) {
    await args.payload.update({
      collection: 'projects',
      context: seedContext,
      data: { moreProjects: p.more.map((slug) => ids[slug]) },
      id: ids[p.slug],
      req: args.req,
    })
  }

  args.payload.logger.info('— Dyson categories and projects seeded')
  return ids
}
