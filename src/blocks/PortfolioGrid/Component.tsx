import type { Category, PortfolioGridBlock as PortfolioGridBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ProjectCard } from '@/components/ProjectCard'
import { TitleMarkup } from '@/components/TitleMarkup'
import { animAttributes } from '@/motion/attributes'
import { getProjectCards } from '@/utilities/getProjects'
import { cn } from '@/utilities/ui'
import React from 'react'

import { PortfolioTabs } from './Tabs'

const ids = (items?: (number | { id: number })[] | null) =>
  (items ?? []).map((item) => (typeof item === 'object' ? item.id : item))

/**
 * Portfolio grid (bb--portfolio). `staggered`: home "Work" — three cards at 50% / 25% / 25% with
 * offsets and parallax (0.9 / 0.8). `grid`: Work page, optional category tabs.
 */
export const PortfolioGridBlock: React.FC<PortfolioGridBlockProps> = async ({
  animation,
  categories,
  enableLink,
  intro,
  layout,
  limit,
  link,
  populateBy,
  projects,
  showTabs,
  title,
}) => {
  const cards = await getProjectCards({
    populateBy,
    categoryIds: ids(categories as (number | Category)[]),
    projectIds: ids(projects as (number | { id: number })[]),
    limit,
  })
  const anim = animAttributes({ ...animation, preset: animation?.preset ?? 'stagger' })

  return (
    <div
      className={cn(
        'overflow-hidden',
        layout === 'staggered'
          ? 'px-6 py-40 max-md:my-28 md:px-8 min-[1025px]:py-60'
          : 'px-6 pb-24 md:px-8 md:pb-40',
      )}
    >
      {(title || intro) && (
        <div className="flex flex-row flex-wrap items-start justify-start overflow-hidden md:flex-nowrap">
          {title && (
            <h2
              className="type-wordmark display-text max-md:text-left max-md:text-[19vw]"
              data-anim="text-reveal"
              data-anim-delay="0.15"
              data-anim-duration="0.7"
              data-anim-stagger="0.1"
              data-anim-text=""
            >
              <TitleMarkup asLines={false} text={title} />
            </h2>
          )}
          {intro && <p className="type-lead whitespace-pre-line md:pl-8">{intro}</p>}
        </div>
      )}

      {layout === 'staggered' ? (
        <div
          className="mt-40 mb-40 flex flex-col gap-[30px] max-md:pb-20 md:flex-row md:max-[1024px]:pt-24 md:max-[1024px]:pb-16"
          {...anim}
        >
          {cards.slice(0, 3).map((card, i) => (
            <div
              className={cn(
                'flex',
                i === 0 && 'md:w-1/2',
                i === 1 && 'mt-28 md:w-1/4',
                i === 2 && 'mt-8 md:w-1/4',
              )}
              data-anim-item=""
              key={card.id}
              {...(i === 1 ? { 'data-speed': '0.9' } : i === 2 ? { 'data-speed': '0.8' } : {})}
            >
              <ProjectCard
                project={card}
                sizes={
                  i === 0 ? '(max-width: 767px) 100vw, 50vw' : '(max-width: 767px) 100vw, 25vw'
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <PortfolioTabs anim={anim} cards={cards} showTabs={Boolean(showTabs)} />
      )}

      {enableLink && link && (
        <div className="flex items-center justify-center overflow-hidden">
          <CMSLink {...link} />
        </div>
      )}
    </div>
  )
}
