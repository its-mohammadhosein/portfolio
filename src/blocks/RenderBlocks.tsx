import React, { Fragment } from 'react'

import type { AnimationSettings, Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Section } from '@/components/ui/section'
import { animAttributes } from '@/motion/attributes'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

// Dyson blocks lay out their own spacing; template blocks keep their original vertical rhythm
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
              return (
                <Section
                  className={templateBlocks.has(blockType) ? 'py-16' : undefined}
                  data-block={blockType}
                  key={block.id ?? index}
                  theme={theme ?? 'light'}
                  {...animAttributes(animation)}
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
