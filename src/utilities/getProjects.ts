import type { Project } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'

import { builtInProjects, withProjectDefaults } from '@/dyson/projects'

export type ProjectCard = Pick<Project, 'id' | 'title' | 'slug' | 'categories' | 'cover'>

const cardSelect = {
  title: true,
  slug: true,
  categories: true,
  cover: true,
} as const

const toCard = ({ id, title, slug, categories, cover }: Project): ProjectCard => ({
  id,
  title,
  slug,
  categories,
  cover,
})

/** Built-in html base projects for the same query, when Payload has no projects. */
const builtInCards = ({
  populateBy,
  categorySlugs,
  projectSlugs,
  limit,
  excludeSlug,
}: {
  populateBy: 'latest' | 'category' | 'selection'
  categorySlugs: string[]
  projectSlugs: string[]
  limit: number
  excludeSlug?: string
}): ProjectCard[] => {
  let list = builtInProjects.filter((p) => p.slug !== excludeSlug)
  if (populateBy === 'selection') {
    list = projectSlugs
      .map((slug) => list.find((p) => p.slug === slug))
      .filter((p): p is Project => Boolean(p))
  } else if (populateBy === 'category' && categorySlugs.length) {
    list = list.filter((p) =>
      (p.categories ?? []).some(
        (c) => typeof c === 'object' && categorySlugs.includes(c.slug ?? ''),
      ),
    )
  }
  return list.slice(0, populateBy === 'selection' ? undefined : limit).map(toCard)
}

/**
 * Published projects for portfolio grids. Cached under the `projects` tag, which the Projects
 * collection hooks revalidate, so every page showing a grid refreshes when a project changes.
 * Falls back to the built-in html base projects when Payload has none, and fills missing cover
 * images from them.
 */
export const getProjectCards = ({
  populateBy = 'latest',
  categoryIds = [],
  categorySlugs = [],
  projectIds = [],
  projectSlugs = [],
  limit = 6,
  excludeSlug,
}: {
  populateBy?: 'latest' | 'category' | 'selection' | null
  categoryIds?: number[]
  categorySlugs?: string[]
  projectIds?: number[]
  /** Hand-picked by slug (fixed pages); used when projectIds is empty */
  projectSlugs?: string[]
  limit?: number | null
  excludeSlug?: string
}) =>
  unstable_cache(
    async (): Promise<ProjectCard[]> => {
      const payload = await getPayload({ config: configPromise })
      const by = populateBy ?? 'latest'
      const bySlug = by === 'selection' && !projectIds.length && projectSlugs.length > 0
      const and: Where[] = []

      if (by === 'selection') {
        if (!projectIds.length && !projectSlugs.length) return []
        and.push(bySlug ? { slug: { in: projectSlugs } } : { id: { in: projectIds } })
      }
      if (by === 'category' && categoryIds.length) {
        and.push({ categories: { in: categoryIds } })
      }
      if (excludeSlug) {
        and.push({ slug: { not_equals: excludeSlug } })
      }

      const result = await payload.find({
        collection: 'projects',
        depth: 1,
        draft: false,
        overrideAccess: false,
        limit: by === 'selection' ? Math.max(projectIds.length, projectSlugs.length) : (limit ?? 6),
        pagination: false,
        select: cardSelect,
        sort: '-publishedAt',
        where: and.length ? { and } : undefined,
      })

      let docs = (result.docs as ProjectCard[]).map(withProjectDefaults)

      if (!docs.length) {
        // No projects in Payload (e.g. a fresh database): show the built-in ones
        const total = await payload.count({ collection: 'projects', overrideAccess: false })
        if (total.totalDocs === 0) {
          return builtInCards({
            populateBy: by,
            categorySlugs,
            projectSlugs,
            limit: limit ?? 6,
            excludeSlug,
          })
        }
      }

      // Keep the editor's hand-picked order
      if (by === 'selection') {
        docs = bySlug
          ? projectSlugs
              .map((slug) => docs.find((doc) => doc.slug === slug))
              .filter((doc): doc is ProjectCard => Boolean(doc))
          : projectIds
              .map((id) => docs.find((doc) => doc.id === id))
              .filter((doc): doc is ProjectCard => Boolean(doc))
      }
      return docs
    },
    [
      'project-cards',
      populateBy ?? 'latest',
      categoryIds.join(','),
      categorySlugs.join(','),
      projectIds.join(','),
      projectSlugs.join(','),
      String(limit),
      excludeSlug ?? '',
    ],
    { tags: ['projects'] },
  )()
