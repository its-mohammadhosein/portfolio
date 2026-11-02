import type { MarqueeBlock as MarqueeBlockProps } from '@/payload-types'

import { Marquee } from '@/components/Marquee'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Crossed strips (home fc9a96f): white rows rotated across a dark background. Transforms per row
 * from the page CSS, in Elementor's order (rotate → translateX → translateY), per breakpoint.
 */
const crossed = [
  // 517ee5d
  '[--r:-30deg] [--x:-30vw] [--y:0vh] md:w-[max(120vh,120vw)]',
  // ae383d5
  '[--r:30deg] [--x:21vw] [--y:58vh] w-[300%] md:[--x:0vw] md:[--y:40vh] md:w-[max(120vh,120vw)] min-[1025px]:[--y:60vh]',
  // 424c3d2
  '[--r:-75deg] [--x:-263px] [--y:-212px] w-[300%] mt-[5vw] mb-[-1vw] mx-[4vw] md:[--x:5vw] md:[--y:0vh] md:w-[max(160vh,160vw)] min-[1025px]:m-0 min-[1025px]:[--x:-5vw] min-[1025px]:[--y:22vh] min-[1025px]:w-[max(140vh,140vw)]',
  // 02ae28f
  '[--r:-15deg] [--x:-40vw] [--y:35vh] w-[200%] md:[--x:-15vw] md:[--y:48vh] md:w-[max(120vh,120vw)] min-[1025px]:[--y:60vh]',
]

const stripText =
  'font-display text-[1.3rem] leading-none font-semibold tracking-[-0.012em] uppercase md:text-[1.675rem]'

export const MarqueeBlock: React.FC<MarqueeBlockProps> = ({
  backgroundImage,
  gap,
  layout,
  overlayOpacity,
  rows,
  speed,
}) => {
  if (layout === 'crossed') {
    return (
      <div className="relative z-[2] flex min-h-[80vh] flex-col overflow-hidden min-[1025px]:min-h-screen">
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media
            className="absolute inset-0"
            fill
            imgClassName="object-cover object-top md:object-center"
            resource={backgroundImage}
            size="100vw"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-ink"
          style={{ opacity: overlayOpacity ?? 0.75 }}
        />
        {rows.map((row, i) => (
          <div
            className={cn(
              'relative w-full bg-paper py-[0.8vw] text-ink [transform:rotate(var(--r))_translateX(var(--x))_translateY(var(--y))]',
              crossed[i % crossed.length],
            )}
            key={row.id ?? i}
          >
            <Marquee
              gap={gap}
              itemClassName={stripText}
              reverse={row.reverse}
              speed={speed}
              text={row.text}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 py-8">
      {rows.map((row, i) => (
        <Marquee
          gap={gap}
          itemClassName={stripText}
          key={row.id ?? i}
          reverse={row.reverse}
          speed={speed}
          text={row.text}
        />
      ))}
    </div>
  )
}
