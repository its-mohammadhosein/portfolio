'use client'

import type { Category } from '@/payload-types'

import { ProjectCard } from '@/components/ProjectCard'
import type { ProjectCard as ProjectCardData } from '@/utilities/getProjects'
import { cn } from '@/utilities/ui'
import React, { useLayoutEffect, useRef, useState } from 'react'

const slugOf = (c: Category) => c.slug ?? String(c.id)

/**
 * Grid of project cards with optional category tabs (bb-brave-portfolio-tabs). Filtering runs on
 * the statically rendered cards in client state — no requests — and animates with GSAP Flip.
 */
export const PortfolioTabs: React.FC<{
  cards: ProjectCardData[]
  showTabs: boolean
  anim: Record<string, string>
}> = ({ cards, showTabs, anim }) => {
  const [active, setActive] = useState<string>('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const flipState = useRef<unknown>(null)

  const categories = Array.from(
    new Map(
      cards
        .flatMap((card) => card.categories ?? [])
        .filter((c): c is Category => typeof c === 'object' && c !== null)
        .map((c) => [slugOf(c), c.title]),
    ),
  )

  const matches = (card: ProjectCardData) =>
    active === 'all' ||
    (card.categories ?? []).some((c) => typeof c === 'object' && c !== null && slugOf(c) === active)

  const select = async (slug: string) => {
    if (slug === active) return
    // Capture positions before the change, animate from them after React renders
    const items = gridRef.current?.querySelectorAll('[data-flip-item]')
    if (items?.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const { Flip } = await import('@/motion/gsap')
      flipState.current = Flip.getState(items)
    }
    setActive(slug)
  }

  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    void import('@/motion/gsap').then(({ Flip, gsap, ScrollTrigger }) => {
      Flip.from(state as ReturnType<typeof Flip.getState>, {
        duration: 0.6,
        ease: 'power4.out',
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.95, duration: 0.3 }),
        onComplete: () => ScrollTrigger.refresh(),
      })
    })
  }, [active])

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
              onClick={() => void select(slug)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      )}
      {/* .projects-grid: 2 columns, 1.875rem gap (1rem on small screens) */}
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[1.875rem]"
        ref={gridRef}
        {...anim}
      >
        {cards.map((card) => (
          <div
            className={cn(!matches(card) && 'hidden')}
            data-anim-item=""
            data-flip-id={card.id}
            data-flip-item=""
            key={card.id}
          >
            <ProjectCard project={card} />
          </div>
        ))}
      </div>
    </div>
  )
}
