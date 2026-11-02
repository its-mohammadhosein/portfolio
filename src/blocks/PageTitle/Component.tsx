import type { PageTitleBlock as PageTitleBlockProps } from '@/payload-types'

import { TitleMarkup, titleLines, titlePlainText } from '@/components/TitleMarkup'
import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'

const sizes = {
  // work c40fd0d "WORK": 16.87vw / 12vw tablet / 13vw mobile, line height 0.85
  xxl: 'text-[13vw] md:text-[12vw] min-[1025px]:text-[16.87vw] leading-[0.85] tracking-[-0.025em] font-normal',
  xl: 'type-display-xl',
  l: 'type-display-l',
  m: 'type-display-m',
} as const

/** Big page title section (work fc9ed11): centred, padded by viewport width, revealed line by line. */
export const PageTitleBlock: React.FC<PageTitleBlockProps> = ({
  align,
  animation,
  size,
  title,
}) => {
  const reveal = animation?.preset && animation.preset !== 'none'
  return (
    <div
      className={cn(
        'flex flex-col justify-center pt-[30vw] pb-[15vw] md:px-[2vw] md:pt-[15vw] md:pb-[11vw]',
        align === 'left' ? 'items-start' : 'items-center text-center',
      )}
    >
      <h1 aria-label={titlePlainText(title)} className="flex flex-col">
        {titleLines(title).map((line, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="block overflow-hidden">
              <span
                aria-hidden
                className={cn('display-text block font-display uppercase', sizes[size ?? 'xxl'])}
                {...(reveal
                  ? {
                      'data-anim': animation!.preset!,
                      'data-anim-text': '',
                      'data-anim-delay': String((animation?.delay ?? 0.15) + i * 0.3),
                      'data-anim-duration': String(animation?.duration ?? 0.7),
                      'data-anim-stagger': String(animation?.stagger ?? 0.1),
                    }
                  : {})}
              >
                <TitleMarkup asLines={false} text={line} />
              </span>
            </span>
          </Fragment>
        ))}
      </h1>
    </div>
  )
}
