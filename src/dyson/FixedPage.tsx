import type { Page } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import React from 'react'

/** A fixed Dyson page: its sections, rendered by the block components. */
export const FixedPage: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => (
  <article>
    <RenderBlocks blocks={blocks} />
  </article>
)

/** Slugs served by the fixed routes; Pages with these slugs are not rendered by [slug] */
export const FIXED_PAGE_SLUGS = ['home', 'work', 'about', 'contact']
