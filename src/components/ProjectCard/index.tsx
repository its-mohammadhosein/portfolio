import type { Category } from '@/payload-types'

import { Media } from '@/components/Media'
import type { ProjectCard as ProjectCardData } from '@/utilities/getProjects'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden
    className={cn('size-[18px] text-[#111] md:size-[20px]', className)}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="7" x2="17" y1="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

const ROLL =
  'transition-transform duration-[450ms] ease-[cubic-bezier(0.8,0,0.2,1)] motion-reduce:transition-none'

/**
 * Portfolio card (bb--portfolio skin "brandberry-portfolio-three", style_2): image with category
 * pills, darkened on hover; title that rolls up and a round arrow that slides diagonally.
 */
export const ProjectCard: React.FC<{
  project: ProjectCardData
  className?: string
  sizes?: string
}> = ({ project, className, sizes = '(max-width: 767px) 100vw, 50vw' }) => {
  const categories = (project.categories ?? []).filter(
    (c): c is Category => typeof c === 'object' && c !== null,
  )
  return (
    <Link
      aria-label={project.title}
      className={cn('group block w-full', className)}
      href={`/projects/${project.slug}`}
    >
      <div className="relative aspect-[1/0.8064] overflow-hidden bg-line after:absolute after:inset-0 after:bg-black after:opacity-0 after:transition-opacity after:duration-[250ms] group-hover:after:opacity-35">
        <Media
          fill
          imgClassName="object-cover"
          pictureClassName="absolute inset-0"
          resource={project.cover}
          size={sizes}
        />
        {categories.length > 0 && (
          <ul className="absolute top-4 left-4 z-[2] flex flex-wrap gap-[0.4375rem]">
            {categories.map((category) => (
              <li
                className="rounded-full bg-white/75 px-[3px] pt-[4px] pb-[1px] text-ink backdrop-blur-[5px] md:px-0"
                key={category.id}
              >
                <span className="block px-[1em] pt-[0.35em] pb-[0.55em] font-display text-[0.85rem] leading-[0.8] font-medium md:text-base">
                  {category.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="relative -mt-[0.2rem] overflow-hidden">
          <h3
            className={cn(
              'font-display text-base leading-[1.2] font-medium uppercase md:text-[0.9rem] min-[1025px]:text-[1.0625rem]',
              ROLL,
              'group-hover:-translate-y-full',
            )}
          >
            {project.title}
          </h3>
          <span
            aria-hidden
            className={cn(
              'absolute inset-0 translate-y-full font-display text-base leading-[1.2] font-medium uppercase md:text-[0.9rem] min-[1025px]:text-[1.0625rem]',
              ROLL,
              'group-hover:translate-y-0',
            )}
          >
            {project.title}
          </span>
        </div>
        <span className="flex size-[2.375rem] shrink-0 items-center justify-center rounded-full border border-line bg-paper">
          <span className="relative flex size-6 items-center justify-center overflow-hidden">
            <span
              className={cn(
                'flex',
                ROLL,
                'group-hover:translate-x-full group-hover:-translate-y-full',
              )}
            >
              <Arrow />
            </span>
            <span
              className={cn(
                'absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center',
                ROLL,
                'group-hover:translate-x-0 group-hover:translate-y-0',
              )}
            >
              <Arrow />
            </span>
          </span>
        </span>
      </div>
    </Link>
  )
}
