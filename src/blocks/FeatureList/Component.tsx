import type { FeatureListBlock as FeatureListBlockProps } from '@/payload-types'

import {
  CollaborativeApproachIcon,
  CreativeExcellenceIcon,
  OnTimeDeliveryIcon,
  ProfessionalTeamIcon,
} from '@/components/icons/feature-icons'
import { Marquee } from '@/components/Marquee'
import { animAttributes } from '@/motion/attributes'
import { cn } from '@/utilities/ui'
import React from 'react'

const icons = {
  creativeExcellence: CreativeExcellenceIcon,
  professionalTeam: ProfessionalTeamIcon,
  collaborativeApproach: CollaborativeApproachIcon,
  onTimeDelivery: OnTimeDeliveryIcon,
} as const

/**
 * "Benefits" (home c9bb459 .pin-benefits): black full-height section; a giant marquee word stays
 * pinned while white framed cards (23rem, alternating right/left) scroll over it.
 */
export const FeatureListBlock: React.FC<FeatureListBlockProps> = ({
  animation,
  items,
  label,
  pinned,
}) => {
  const anim = animAttributes({ ...animation, preset: animation?.preset ?? 'fade-up' })

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink pt-4 pb-16 md:p-0">
      {label && (
        <div aria-hidden className="absolute inset-0">
          <div
            className={cn('h-screen pt-[5rem] md:pt-[15rem]', pinned && 'sticky top-0')}
            {...(pinned ? { 'data-pin': '' } : {})}
          >
            <Marquee
              gap={50}
              itemClassName="font-display text-[19vw] font-normal uppercase leading-[0.8] tracking-[-0.02em] text-paper md:text-[16.875vw]"
              speed={9000}
              text={label}
            />
          </div>
        </div>
      )}
      {label && <h2 className="sr-only">{label}</h2>}

      <div className="relative z-[2] mx-auto mt-[13rem] flex max-w-[1100px] flex-col px-6 md:mt-[35rem] md:px-0">
        {items.map((item, i) => {
          const Icon = item.icon && item.icon !== 'none' ? icons[item.icon] : null
          return (
            <article
              className={cn(
                'mb-24 w-full bg-paper text-ink md:w-[23rem]',
                i % 2 === 0 ? 'self-end' : 'self-start',
              )}
              key={item.id ?? i}
              {...anim}
            >
              <div className="m-[2%] w-[96%] border-x border-ink">
                <div className="flex flex-col gap-5 border-y border-ink p-10">
                  {Icon && <Icon className="size-[54px] md:size-[65px]" />}
                  <h3 className="font-display text-[1.5rem] leading-none font-medium tracking-[-0.019em] md:text-[1.69vw] md:leading-[1.25]">
                    {item.title}
                  </h3>
                </div>
                {item.text && (
                  <p className="mt-8 border-y border-ink px-10 pt-10 pb-5 font-sans text-[1.1rem] leading-[1.33] font-medium tracking-[-0.01em] md:text-[1.125rem]">
                    {item.text}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
