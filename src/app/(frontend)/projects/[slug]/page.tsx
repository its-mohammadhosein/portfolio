import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Project } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ProjectTemplate } from '@/components/ProjectTemplate'
import { generateMeta } from '@/utilities/generateMeta'
import {
  builtInMoreSlugs,
  builtInProject,
  builtInProjects,
  withProjectDefaults,
} from '@/dyson/projects'
import { type ProjectCard, getProjectCards } from '@/utilities/getProjects'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  // Payload projects + the built-in html base projects (shown when Payload doesn't have them)
  const slugs = new Set([
    ...projects.docs.map(({ slug }) => slug),
    ...builtInProjects.map((p) => p.slug),
  ])
  return Array.from(slugs).map((slug) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/projects/' + decodedSlug
  const fromPayload = await queryProjectBySlug({ slug: decodedSlug })
  const project = fromPayload ? withProjectDefaults(fromPayload) : builtInProject(decodedSlug)

  if (!project) return <PayloadRedirects url={url} />

  const moreProjects = await getMoreProjects(project)

  return (
    <article>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ProjectTemplate moreProjects={moreProjects} project={project} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const project = (await queryProjectBySlug({ slug: decodedSlug })) ?? builtInProject(decodedSlug)

  return generateMeta({ doc: project })
}

/** Hand-picked "more works", else the html base picks, else the latest two other projects */
const getMoreProjects = async (project: Project): Promise<ProjectCard[]> => {
  const picked = (project.moreProjects ?? []).filter(
    (item): item is Project => typeof item === 'object' && item !== null,
  )
  if (picked.length) return picked.map(withProjectDefaults)
  const builtInPicks = builtInMoreSlugs(project.slug)
  if (builtInPicks.length) {
    const cards = await getProjectCards({ populateBy: 'selection', projectSlugs: builtInPicks })
    if (cards.length) return cards
  }
  return getProjectCards({ populateBy: 'latest', limit: 2, excludeSlug: project.slug })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
