'use client'

import type { Category } from '@/payload-types'

import { ProjectCard } from '@/components/ProjectCard'
import type { ProjectCard as ProjectCardData } from '@/utilities/getProjects'
import { cn } from '@/utilities/ui'
import React, { useState } from 'react'

/**
 * Grid of project cards with optional category tabs (bb-brave-portfolio-tabs). Filtering runs on
 * the statically rendered cards in client state — no requests.
 */
export const PortfolioTabs: React.FC<{
  cards: ProjectCardData[]
  showTabs: boolean
  anim: Record<string, string>
}> = ({ cards, showTabs, anim }) => {
  const [active, setActive] = useState<string>('all')

  const categories = Array.from(
    new Map(
      cards
        .flatMap((card) => card.categories ?? [])
        .filter((c): c is Category => typeof c === 'object' && c !== null)
        .map((c) => [c.slug ?? String(c.id), c.title]),
    ),
  )

  const visible =
    active === 'all'
      ? cards
      : cards.filter((card) =>
          (card.categories ?? []).some(
            (c) => typeof c === 'object' && c !== null && (c.slug ?? String(c.id)) === active,
          ),
        )

  return (
    <div>
      {showTabs && categories.length > 0 && (
        <div
          aria-label="Filter projects"
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="tablist"
        >
          {[['all', 'All'] as const, ...categories].map(([slug, label]) => (
            <button
              aria-selected={active === slug}
              className={cn(
                'rounded-full border border-ink px-5 py-2 font-display text-base font-medium uppercase transition-colors',
                active === slug
                  ? 'bg-ink text-paper'
                  : 'bg-transparent text-ink hover:bg-ink hover:text-paper',
              )}
              key={slug}
              onClick={() => setActive(slug)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {/* .projects-grid: 2 columns, 1.875rem gap (1rem on small screens) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[1.875rem]" {...anim}>
        {visible.map((card) => (
          <div data-anim-item="" key={card.id}>
            <ProjectCard project={card} />
          </div>
        ))}
      </div>
    </div>
  )
}
