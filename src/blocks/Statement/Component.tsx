import type { StatementBlock as StatementBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { TitleMarkup } from '@/components/TitleMarkup'
import { Caption } from '@/components/ui/caption'
import { animAttributes } from '@/motion/attributes'
import { cn } from '@/utilities/ui'
import React from 'react'

const titleSizes = {
  // home f6bc5bf "I am a passionate…": 4.5vw / 5.5vw tablet / 1.5rem mobile, 500, uppercase
  statement:
    'font-display font-medium uppercase text-[1.5rem] leading-[1.2] md:text-[5.5vw] md:leading-none min-[1025px]:text-[4.5vw]',
  // home 342497b "Reaching New Heights": 5vw / 11.5vw mobile, 500, uppercase
  large:
    'font-display font-medium uppercase leading-none tracking-[-0.02em] text-[11.5vw] md:text-[5vw]',
  heading: 'type-heading',
  display: 'type-wordmark max-md:text-[19vw]',
} as const

/**
 * Text section. `center`: the home intro statement (big padding, centred). `bottomLeft`: content
 * at the bottom-left over a background image/video with a black overlay ("Reaching New Heights").
 */
export const StatementBlock: React.FC<StatementBlockProps> = ({
  align,
  animation,
  backgroundMedia,
  caption,
  enableLink,
  link,
  overlayOpacity,
  text,
  title,
  titleSize,
}) => {
  const hasMedia = backgroundMedia && typeof backgroundMedia === 'object'
  const bottomLeft = align === 'bottomLeft'
  const titleClass = titleSizes[titleSize ?? 'statement']

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden',
        bottomLeft
          ? 'min-h-screen justify-end pb-24 md:max-[1024px]:min-h-[80vh]'
          : 'items-center px-4 pt-24 pb-16 text-center md:px-8 md:py-40 min-[1025px]:px-28 min-[1025px]:pt-[22.5rem] min-[1025px]:pb-[18.5rem]',
        hasMedia && 'text-paper',
      )}
    >
      {hasMedia && (
        <>
          <Media
            className="absolute inset-0"
            fill
            imgClassName="object-cover"
            resource={backgroundMedia}
            size="100vw"
            videoClassName="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-ink"
            style={{ opacity: overlayOpacity ?? 0.25 }}
          />
        </>
      )}

      <div
        className={cn(
          'relative z-[2]',
          bottomLeft && 'mb-20 px-[15px] md:mb-8 md:w-[90%] md:px-gutter min-[1025px]:w-1/2',
        )}
        {...(bottomLeft ? { 'data-anim': 'fade-up' } : {})}
      >
        {caption && (
          <Caption as="p" className="mb-6" size="lg">
            {caption}
          </Caption>
        )}
        {title && (
          <div className="overflow-hidden max-md:mb-4">
            <h2
              className={titleClass}
              data-anim-text=""
              {...animAttributes({ ...animation, preset: animation?.preset ?? 'text-reveal' })}
            >
              <TitleMarkup text={title} />
            </h2>
          </div>
        )}
        {text && (
          <p
            className={cn(
              'font-sans text-[1.125rem] leading-[1.5] tracking-[-0.01em] whitespace-pre-line',
              title && 'mt-6',
              !bottomLeft && 'mx-auto max-w-3xl',
            )}
          >
            {text}
          </p>
        )}
        {enableLink && link && (
          <div className={cn('mt-8', !bottomLeft && 'flex justify-center')}>
            <CMSLink {...link} />
          </div>
        )}
      </div>
    </div>
  )
}
