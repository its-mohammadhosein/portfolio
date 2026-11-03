import type { Category, Media, Project } from '@/payload-types'

import { PROJECT_LIVE_URL, PROJECT_OVERVIEW, categoryTitles, projectsContent } from './content'
import { mediaOr } from './defaults'
import { dysonMedia } from './media'

const withAlt = (media: Media, alt: string): Media => ({ ...media, alt: media.alt || alt })

const builtInCategory = (slug: keyof typeof categoryTitles, index: number): Category =>
  ({ id: -(index + 1), title: categoryTitles[slug], slug }) as Category

/** The html base projects as Project documents (media from public/dyson). */
export const builtInProjects: Project[] = projectsContent.map((p, i) => {
  const [hero, ...gallery] = p.images
  return {
    id: -(i + 1),
    title: p.title,
    slug: p.slug,
    heroTitle: p.heroTitle,
    heroImage: withAlt(dysonMedia[hero], p.title),
    cover: withAlt(dysonMedia[p.cover], p.title),
    overviewLabel: 'Overview',
    overview: PROJECT_OVERVIEW,
    year: p.year,
    client: p.title,
    services: 'Branding / Design',
    liveUrl: PROJECT_LIVE_URL,
    gallery: gallery.map((file, j) => ({
      id: `${p.slug}-${j}`,
      image: withAlt(dysonMedia[file], p.title),
      speed: 0.9,
    })),
    moreTitle: 'Discover\nmore Works',
    moreProjects: [],
    categories: p.categories.map((slug) =>
      builtInCategory(slug, Object.keys(categoryTitles).indexOf(slug)),
    ),
    meta: { title: p.title, description: PROJECT_OVERVIEW.slice(0, 150) },
    publishedAt: new Date(Date.UTC(2026, 2, 6 - i)).toISOString(),
    updatedAt: '',
    createdAt: '',
    _status: 'published',
  } as Project
})

export const builtInProject = (slug?: string | null) =>
  builtInProjects.find((p) => p.slug === slug) ?? null

/** html base "more works" slugs for a project */
export const builtInMoreSlugs = (slug?: string | null) =>
  projectsContent.find((p) => p.slug === slug)?.more ?? []

/**
 * Fill what a Payload project is missing (deleted or never uploaded images, empty gallery)
 * from the built-in project with the same slug.
 */
export const withProjectDefaults = <T extends Partial<Project>>(project: T): T => {
  const fallback = builtInProject(project.slug)
  if (!fallback) return project
  const gallery = project.gallery?.length
    ? project.gallery.map((item, i) => ({
        ...item,
        image: mediaOr(item.image, fallback.gallery?.[i]?.image as Media | undefined) ?? item.image,
      }))
    : project.gallery === undefined
      ? undefined
      : fallback.gallery
  return {
    ...project,
    ...('cover' in project || 'heroImage' in project
      ? {
          cover: mediaOr(project.cover, fallback.cover as Media) ?? project.cover,
          heroImage: mediaOr(project.heroImage, fallback.heroImage as Media) ?? project.heroImage,
        }
      : {}),
    ...(gallery !== undefined ? { gallery } : {}),
  }
}
