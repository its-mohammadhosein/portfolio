import type { DataTableBlock as DataTableBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { TitleMarkup, titleLines } from '@/components/TitleMarkup'
import { Caption } from '@/components/ui/caption'
import React from 'react'

const align = ['text-start', 'text-center', 'text-end'] as const

/**
 * Ruled three-column table (home "Awards / Recognitions" 8aff84c, about "Work experience"):
 * centred title lines, black header row of (Captions), rows that fill black from the bottom on
 * hover (`.award-background`).
 */
export const DataTableBlock: React.FC<DataTableBlockProps> = ({
  animation,
  columns,
  enableLink,
  link,
  rows,
  title,
}) => {
  const headers = [columns?.first, columns?.second, columns?.third]
  const hasHeaders = headers.some(Boolean)

  return (
    <div className="flex min-h-[50vh] flex-col items-center overflow-hidden px-4 py-24 md:px-8 md:py-60">
      {title && (
        <h2 className="flex flex-col items-center text-center">
          {titleLines(title).map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && ' '}
              <span className="block overflow-hidden">
                <span
                  className="block font-display text-[2rem] leading-none font-medium uppercase md:text-[5.5vw] min-[1025px]:text-[4.5vw]"
                  data-anim={
                    animation?.preset && animation.preset !== 'none' ? animation.preset : undefined
                  }
                  data-anim-delay={String(animation?.delay ?? 0.5)}
                  data-anim-duration={String(animation?.duration ?? 1)}
                  data-anim-stagger={String(animation?.stagger ?? 0.02)}
                  data-anim-text=""
                >
                  <TitleMarkup asLines={false} text={line} />
                </span>
              </span>
            </React.Fragment>
          ))}
        </h2>
      )}

      <div className="mt-24 w-full md:w-[80%] min-[1025px]:w-[60%]" role="table">
        {hasHeaders && (
          <div className="mb-[10px] flex flex-row bg-ink px-[15px] py-[5px] text-paper" role="row">
            {headers.map((header, i) => (
              <div className={`w-1/3 ${align[i]}`} key={i} role="columnheader">
                {header && <Caption>{header}</Caption>}
              </div>
            ))}
          </div>
        )}
        {rows?.map((row, i) => (
          <div
            className="type-row flex flex-row bg-[linear-gradient(#000,#000)] bg-[length:100%_0] bg-bottom bg-no-repeat px-[15px] py-[4px] transition-all duration-500 hover:bg-[length:100%_100%] hover:text-paper max-md:mb-[10px]"
            key={row.id ?? i}
            role="row"
          >
            {[row.first, row.second, row.third].map((cell, j) => (
              <div className={`w-1/3 ${align[j]}`} key={j} role="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {enableLink && link && (
        <div className="mt-16">
          <CMSLink {...link} />
        </div>
      )}
    </div>
  )
}
