import type { Project } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'

export type ProjectCard = Pick<Project, 'id' | 'title' | 'slug' | 'categories' | 'cover'>

const cardSelect = {
  title: true,
  slug: true,
  categories: true,
  cover: true,
} as const

/**
 * Published projects for portfolio grids. Cached under the `projects` tag, which the Projects
 * collection hooks revalidate, so every page showing a grid refreshes when a project changes.
 */
export const getProjectCards = ({
  populateBy = 'latest',
  categoryIds = [],
  projectIds = [],
  limit = 6,
  excludeSlug,
}: {
  populateBy?: 'latest' | 'category' | 'selection' | null
  categoryIds?: number[]
  projectIds?: number[]
  limit?: number | null
  excludeSlug?: string
}) =>
  unstable_cache(
    async (): Promise<ProjectCard[]> => {
      const payload = await getPayload({ config: configPromise })
      const and: Where[] = []

      if (populateBy === 'selection') {
        if (!projectIds.length) return []
        and.push({ id: { in: projectIds } })
      }
      if (populateBy === 'category' && categoryIds.length) {
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
        limit: populateBy === 'selection' ? projectIds.length : (limit ?? 6),
        pagination: false,
        select: cardSelect,
        sort: '-publishedAt',
        where: and.length ? { and } : undefined,
      })

      const docs = result.docs as ProjectCard[]
      // Keep the editor's hand-picked order
      if (populateBy === 'selection') {
        return projectIds
          .map((id) => docs.find((doc) => doc.id === id))
          .filter((doc): doc is ProjectCard => Boolean(doc))
      }
      return docs
    },
    [
      'project-cards',
      populateBy ?? 'latest',
      categoryIds.join(','),
      projectIds.join(','),
      String(limit),
      excludeSlug ?? '',
    ],
    { tags: ['projects'] },
  )()
