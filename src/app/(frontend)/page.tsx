import type { Metadata } from 'next'

import React from 'react'

import { defaults } from '@/dyson/defaults'
import { FixedPage } from '@/dyson/FixedPage'
import { homeBlocks, pageMeta } from '@/dyson/pages'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

/**
 * Home page — layout fixed in code (html base structure); content from the "Home page" global in
 * Payload, or the built-in html base content for any section left empty.
 */
export default async function Page() {
  const content = await getCachedGlobal('home-page', 1)()
  return <FixedPage blocks={homeBlocks(content)} />
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCachedGlobal('home-page', 1)()
  return generateMeta({ doc: pageMeta(content.meta, defaults.home.meta) })
}
