import React, { Fragment } from 'react'

import type { AnimationSettings, Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { DataTableBlock } from '@/blocks/DataTable/Component'
import { FeatureListBlock } from '@/blocks/FeatureList/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroDisplayBlock } from '@/blocks/HeroDisplay/Component'
import { LabeledListsBlock } from '@/blocks/LabeledLists/Component'
import { MarqueeBlock } from '@/blocks/Marquee/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PageTitleBlock } from '@/blocks/PageTitle/Component'
import { PortfolioGridBlock } from '@/blocks/PortfolioGrid/Component'
import { StatementBlock } from '@/blocks/Statement/Component'
import { Section } from '@/components/ui/section'
import { animAttributes } from '@/motion/attributes'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  dataTable: DataTableBlock,
  featureList: FeatureListBlock,
  formBlock: FormBlock,
  heroDisplay: HeroDisplayBlock,
  labeledLists: LabeledListsBlock,
  marquee: MarqueeBlock,
  mediaBlock: MediaBlock,
  pageTitle: PageTitleBlock,
  portfolioGrid: PortfolioGridBlock,
  statement: StatementBlock,
}

// Template blocks keep their original vertical rhythm and are animated as a whole section.
// Dyson blocks lay out their own spacing and animate their inner elements (titles, cards…)
// from the `animation` settings passed in, matching the html base timings.
const templateBlocks = new Set(['archive', 'content', 'cta', 'formBlock', 'mediaBlock'])

type StyledBlock = {
  theme?: 'light' | 'dark' | null
  animation?: AnimationSettings | null
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          // Block types without a component yet (Dyson blocks until P5) render nothing
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              const { animation, theme } = block as StyledBlock
              // Full-width media animates itself like the Dyson blocks
              const isTemplate =
                templateBlocks.has(blockType) &&
                !(blockType === 'mediaBlock' && 'width' in block && block.width === 'full')
              return (
                <Section
                  className={isTemplate ? 'py-16' : undefined}
                  data-block={blockType}
                  key={block.id ?? index}
                  theme={theme ?? 'light'}
                  {...(isTemplate ? animAttributes(animation) : {})}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </Section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
