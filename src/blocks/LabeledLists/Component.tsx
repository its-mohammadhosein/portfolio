import type { LabeledListsBlock as LabeledListsBlockProps } from '@/payload-types'

import { Caption } from '@/components/ui/caption'
import React from 'react'

/**
 * About lists (b2078a2): a 40% area with two columns of (LABEL) + stacked entries, and a 60%
 * paragraph; entries reveal with the html base timing (delay 0.15, duration 0.75, stagger 0.01).
 */
export const LabeledListsBlock: React.FC<LabeledListsBlockProps> = ({ animation, lists, text }) => {
  const half = Math.ceil(lists.length / 2)
  const columns = [lists.slice(0, half), lists.slice(half)].filter((col) => col.length)
  const reveal = animation?.preset && animation.preset !== 'none'

  return (
    <div className="flex flex-col py-[13vw] md:flex-row md:justify-end md:py-[10vw]">
      <div className="flex flex-row max-md:pb-8 md:w-[40%]">
        {columns.map((column, c) => (
          <div className="flex w-[46%] flex-col gap-10 px-[15px] md:w-1/2 md:px-gutter" key={c}>
            {column.map((list, i) => (
              <div className="flex flex-col gap-2" key={list.id ?? i}>
                <Caption
                  as="h3"
                  className="font-sans text-[0.8rem] leading-[1.25] font-semibold uppercase"
                >
                  {list.label}
                </Caption>
                <ul
                  className="font-sans text-base leading-[1.45] font-semibold tracking-[-0.02em] md:text-[1.375rem]"
                  {...(reveal
                    ? {
                        'data-anim': animation!.preset!,
                        'data-anim-text': '',
                        'data-anim-delay': String(animation?.delay ?? 0.15),
                        'data-anim-duration': String(animation?.duration ?? 0.75),
                        'data-anim-stagger': String(animation?.stagger ?? 0.01),
                      }
                    : {})}
                >
                  {list.entries
                    .split(/\r?\n/)
                    .map((entry) => entry.trim())
                    .filter(Boolean)
                    .map((entry, j) => (
                      <li key={j}>{entry}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      {text && (
        <div className="max-md:pr-6 md:w-[60%]">
          {text
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, i) => (
              <p
                className="mb-5 pl-[15px] font-sans text-[1.1rem] leading-[1.45] font-semibold tracking-[-0.02em] md:pr-[2vw] md:pl-[5vw] md:text-[1.375rem] min-[1025px]:pr-0 min-[1025px]:pl-[11vw]"
                key={i}
              >
                {paragraph}
              </p>
            ))}
        </div>
      )}
    </div>
  )
}
