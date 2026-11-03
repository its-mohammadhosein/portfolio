import type { Metadata } from 'next'

import React from 'react'

import { defaults } from '@/dyson/defaults'
import { FixedPage } from '@/dyson/FixedPage'
import { workBlocks, pageMeta } from '@/dyson/pages'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

/**
 * Work page — layout fixed in code (html base structure); content from the "Work page" global in
 * Payload, or the built-in html base content for any section left empty.
 */
export default async function Page() {
  const content = await getCachedGlobal('work-page', 1)()
  return <FixedPage blocks={workBlocks(content)} />
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCachedGlobal('work-page', 1)()
  return generateMeta({ doc: pageMeta(content.meta, defaults.work.meta) })
}
