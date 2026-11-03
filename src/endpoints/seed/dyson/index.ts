import type { SeedArgs } from './helpers'

import { ensureContactForm } from '@/dyson/contactForm'
import {
  PROJECT_LIVE_URL,
  PROJECT_OVERVIEW,
  aboutContent,
  categoryTitles,
  contactContent,
  footerContent,
  headerContent,
  homeContent,
  isMediaRef,
  projectsContent,
  siteSettingsContent,
  workContent,
} from '@/dyson/content'

import { seedContext, upsertBySlug, upsertMedia } from './helpers'

/** Replace MediaRef markers with uploaded Media ids (uploads each file once). */
const withUploads = async (args: SeedArgs, value: unknown): Promise<unknown> => {
  if (isMediaRef(value)) return upsertMedia(args, value.__media, value.alt ?? '')
  if (Array.isArray(value)) {
    const out = []
    for (const item of value) out.push(await withUploads(args, item))
    return out
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = await withUploads(args, v)
    return out
  }
  return value
}

const updateGlobal = async (args: SeedArgs, slug: string, data: unknown) => {
  await args.payload.updateGlobal({
    slug: slug as never,
    context: seedContext,
    data: (await withUploads(args, data)) as never,
    req: args.req,
  })
}

/**
 * Dyson content from the html base (src/dyson/content.ts — the same data the fixed pages use as
 * built-in defaults). Fills Payload so editors see and edit the real content. Upserts by
 * slug / filename / title: safe to re-run, doesn't touch other content, and runs next to the
 * template seed, not instead of it.
 */
export const seedDyson = async (args: SeedArgs) => {
  const { payload, req } = args
  payload.logger.info('Seeding Dyson content...')

  // Globals
  await updateGlobal(args, 'site-settings', siteSettingsContent)
  await updateGlobal(args, 'header', headerContent)
  await updateGlobal(args, 'footer', footerContent)
  payload.logger.info('— header, footer, site settings')

  // Categories + projects
  const categoryIds: Record<string, number> = {}
  for (const [slug, title] of Object.entries(categoryTitles)) {
    categoryIds[slug] = await upsertBySlug(args, 'categories', slug, { title, slug })
  }
  const projectIds: Record<string, number> = {}
  const now = Date.now()
  for (const [i, p] of projectsContent.entries()) {
    const [heroFile, ...galleryFiles] = p.images
    const gallery = []
    for (const file of galleryFiles) {
      gallery.push({ image: await upsertMedia(args, file, p.title), speed: 0.9 })
    }
    projectIds[p.slug] = await upsertBySlug(args, 'projects', p.slug, {
      title: p.title,
      slug: p.slug,
      heroTitle: p.heroTitle,
      heroImage: await upsertMedia(args, heroFile, p.title),
      cover: await upsertMedia(args, p.cover, p.title),
      overviewLabel: 'Overview',
      overview: PROJECT_OVERVIEW,
      year: p.year,
      client: p.title,
      services: 'Branding / Design',
      liveUrl: PROJECT_LIVE_URL,
      gallery,
      moreTitle: 'Discover\nmore Works',
      categories: p.categories.map((c) => categoryIds[c]),
      // Newest first, one day apart, so "latest" keeps the html base order
      publishedAt: new Date(now - i * 86_400_000).toISOString(),
      meta: { title: p.title, description: PROJECT_OVERVIEW.slice(0, 150) },
      _status: 'published',
    })
  }
  for (const p of projectsContent) {
    await payload.update({
      collection: 'projects',
      context: seedContext,
      data: { moreProjects: p.more.map((slug) => projectIds[slug]) },
      id: projectIds[p.slug],
      req,
    })
  }
  payload.logger.info('— categories and projects')

  // Fixed pages: their content globals
  const { projectSlugs, ...homeWork } = homeContent.work
  await updateGlobal(args, 'home-page', {
    ...homeContent,
    work: { ...homeWork, projects: projectSlugs.map((slug) => projectIds[slug]) },
  })
  await updateGlobal(args, 'work-page', workContent)
  await updateGlobal(args, 'about-page', aboutContent)
  const form = await ensureContactForm(payload, req, { update: true })
  await updateGlobal(args, 'contact-page', {
    ...contactContent,
    form: { ...contactContent.form, form },
  })
  payload.logger.info('— home, work, about and contact page content')

  payload.logger.info('Dyson content seeded.')
}
