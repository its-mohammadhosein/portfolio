import type {
  CollectionSlug,
  Payload,
  PayloadRequest,
  RequiredDataFromCollectionSlug,
} from 'payload'

import path from 'path'

// From the project root, not import.meta.url: inside a deployed route that points into the build
// output. next.config.ts bundles this folder with the /next/seed-dyson route.
const ASSETS_DIR = path.join(process.cwd(), 'src', 'endpoints', 'seed', 'dyson', 'assets')

/** Seed writes skip Next revalidation (no server running) — pages are rebuilt/revalidated after. */
export const seedContext = { disableRevalidate: true }

export type SeedArgs = { payload: Payload; req?: PayloadRequest }

/** Media from `assets/`, reused when a file with the same name was already uploaded. */
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
  if (existing.docs[0]) return existing.docs[0].id

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
