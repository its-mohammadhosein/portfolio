import type {
  CollectionSlug,
  Payload,
  PayloadRequest,
  RequiredDataFromCollectionSlug,
} from 'payload'

import path from 'path'

import { getServerSideURL } from '@/utilities/getURL'

// The html base images/videos live in public/dyson (also served statically as the built-in
// defaults). Resolved from the project root: next.config.ts bundles them with the seed route.
const ASSETS_DIR = path.join(process.cwd(), 'public', 'dyson')

/** Seed writes skip Next revalidation (no server running) — pages are rebuilt/revalidated after. */
export const seedContext = { disableRevalidate: true }

export type SeedArgs = { payload: Payload; req?: PayloadRequest }

/**
 * True only when the server answers 404 for the record's file (an upload that never reached
 * storage). Any other outcome — including no server running for `pnpm seed:dyson` — keeps it.
 */
const fileIsMissing = async (url?: string | null): Promise<boolean> => {
  if (!url) return false
  try {
    const res = await fetch(new URL(url, getServerSideURL()), { method: 'HEAD' })
    return res.status === 404
  } catch {
    return false
  }
}

/**
 * Media from public/dyson, reused when a file with the same name was already uploaded. A record
 * whose file is missing from storage is deleted and uploaded again (the seed re-links it).
 */
export const upsertMedia = async (
  { payload, req }: SeedArgs,
  filename: string,
  alt: string,
): Promise<number> => {
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    pagination: false,
    req,
    where: { filename: { equals: filename } },
  })
  const found = existing.docs[0]
  if (found) {
    if (!(await fileIsMissing(found.url))) return found.id
    payload.logger.warn(`Media ${filename} has no file in storage; uploading it again`)
    await payload.delete({ collection: 'media', context: seedContext, id: found.id, req })
  }

  // The cloud-storage plugin sets req.context.skipCloudStorage after each upload and never resets
  // it; with one shared req (the /next/seed-dyson route) every later upload would be skipped.
  if (req?.context) delete req.context.skipCloudStorage

  const doc = await payload.create({
    collection: 'media',
    context: seedContext,
    data: { alt },
    filePath: path.join(ASSETS_DIR, filename),
    req,
  })
  return doc.id
}

/** Create or update a document matched by slug. */
export const upsertBySlug = async <T extends 'pages' | 'projects' | 'categories'>(
  { payload, req }: SeedArgs,
  collection: T,
  slug: string,
  data: RequiredDataFromCollectionSlug<T>,
): Promise<number> => {
  const existing = await payload.find({
    collection: collection as CollectionSlug,
    depth: 0,
    draft: true,
    limit: 1,
    pagination: false,
    req,
    where: { slug: { equals: slug } },
  })
  const id = existing.docs[0]?.id as number | undefined
  if (id) {
    await payload.update({
      collection,
      context: seedContext,
      data: data as never,
      id,
      req,
    })
    return id
  }
  const doc = await payload.create({
    collection,
    context: seedContext,
    data: data as never,
    req,
  })
  return doc.id as number
}
