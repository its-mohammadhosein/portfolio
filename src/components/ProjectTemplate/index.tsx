import type { Project } from '@/payload-types'

import { Marquee } from '@/components/Marquee'
import { Media } from '@/components/Media'
import { ProjectCard } from '@/components/ProjectCard'
import { TitleMarkup, titleLines, titlePlainText } from '@/components/TitleMarkup'
import { FlipButton } from '@/components/ui/flip-button'
import { Section } from '@/components/ui/section'
import type { ProjectCard as ProjectCardData } from '@/utilities/getProjects'
import { cn } from '@/utilities/ui'
import React from 'react'

/** Title lines that reveal one after another (html base: delays 0.25 / 1, duration 0.6, stagger 0.1) */
const RevealLines: React.FC<{
  text: string
  as: 'h1' | 'h2'
  className: string
  delays: number[]
  duration: number
}> = ({ text, as: Tag, className, delays, duration }) => (
  <Tag aria-label={titlePlainText(text)} className="flex flex-col items-center text-center">
    {titleLines(text).map((line, i) => (
      <span className={cn('block overflow-hidden', i > 0 && 'max-md:mt-[5px]')} key={i}>
        <span
          aria-hidden
          className={cn('display-text block', className)}
          data-anim="text-reveal"
          data-anim-delay={String(delays[i] ?? delays[delays.length - 1] + 0.3 * i)}
          data-anim-duration={String(duration)}
          data-anim-stagger="0.1"
          data-anim-text=""
        >
          <TitleMarkup asLines={false} text={line} />
        </span>
      </span>
    ))}
  </Tag>
)

/**
 * Project page, as the html base project template (e.g. post-32 "Medium Scene"):
 * split title → 80vh hero image → OVERVIEW marquee + text + Year/Client/Services → 70vh parallax
 * images → "Discover more Works" with two cards.
 */
export const ProjectTemplate: React.FC<{ project: Project; moreProjects: ProjectCardData[] }> = ({
  project,
  moreProjects,
}) => {
  const { title, heroTitle, heroImage, overviewLabel, overview, year, client, services, liveUrl } =
    project
  const meta = [
    { label: 'Year', value: year },
    { label: 'Client', value: client },
    { label: 'Services', value: services },
  ].filter((item) => item.value)

  return (
    <>
      {/* 6c095fd1: title */}
      <Section className="flex flex-col justify-center px-[1.5vw] pt-[30vw] pb-[15vw] md:px-[2vw] md:pt-[20vw] min-[1025px]:pt-[15vw] min-[1025px]:pb-[14vw]">
        <RevealLines
          as="h1"
          className="font-display text-[12vw] leading-[0.85] font-normal tracking-[-0.025em] uppercase min-[1025px]:text-[15vw]"
          delays={[0.25, 1]}
          duration={0.6}
          text={heroTitle || title}
        />
      </Section>

      {/* 6c8fb503: hero image */}
      <Section className="overflow-hidden px-[15px] md:px-gutter">
        <div className="relative z-[2]" data-anim="fade-up" data-speed="0.9">
          <Media
            imgClassName="h-[35vh] w-full object-cover md:h-[50vh] min-[1025px]:h-[80vh]"
            priority
            resource={heroImage}
            size="100vw"
          />
        </div>
      </Section>

      {/* 2b6d8631: overview */}
      <Section className="flex flex-col px-[15px] pt-[50px] pb-16 md:px-8 md:py-16 min-[1025px]:flex-row min-[1025px]:px-0 min-[1025px]:py-44">
        <div className="min-w-0 min-[1025px]:w-1/2 min-[1025px]:pr-[100px]">
          {overviewLabel && (
            <Marquee
              gap={50}
              itemClassName="font-display text-[10vw] leading-none font-medium tracking-[0.02em] text-ink uppercase md:text-[6vw] min-[1025px]:text-[4.8rem]"
              text={overviewLabel}
            />
          )}
        </div>
        <div className="flex flex-col justify-start max-[1024px]:mt-12 min-[1025px]:w-1/2 min-[1025px]:pr-gutter">
          {overview && (
            <p className="font-sans text-[1.3rem] leading-[1.45] font-medium tracking-[-0.02em] md:text-[1.375rem]">
              {overview}
            </p>
          )}
          {meta.length > 0 && (
            <dl className="mt-5 flex flex-col">
              {meta.map((item) => (
                <div className="border-t border-line py-5 last:border-b" key={item.label}>
                  <div className="type-body flex flex-row justify-between">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
          {liveUrl && (
            <div className="mt-4">
              <FlipButton
                href={liveUrl}
                label="View Online"
                rel="noopener noreferrer"
                target="_blank"
                variant="outline"
              />
            </div>
          )}
        </div>
      </Section>

      {/* 1c542aaa / 44b11836: gallery images */}
      {project.gallery?.map((item, i) => (
        <Section
          className={cn(
            'relative z-[2] flex min-h-[35vh] flex-col overflow-hidden px-[20px] md:min-h-[40vh] min-[1025px]:min-h-[70vh]',
            i === 0 && 'max-md:mt-20',
          )}
          key={item.id ?? i}
        >
          <div data-anim="fade-up" data-speed={String(item.speed ?? 0.9)}>
            <Media
              imgClassName="h-[35vh] w-full object-cover md:h-auto"
              resource={item.image}
              size="100vw"
            />
          </div>
        </Section>
      ))}

      {/* 5b24cc6b: more works */}
      {moreProjects.length > 0 && (
        <Section className="flex flex-col px-[15px] max-md:my-24 md:px-8 md:py-32">
          <div className="mt-28 mb-36 flex flex-col justify-center max-[1024px]:pb-16">
            <RevealLines
              as="h2"
              className="font-display text-[4.75vw] leading-none font-medium tracking-[-0.04em] uppercase"
              delays={[0.15, 0.45]}
              duration={0.7}
              text={project.moreTitle || 'Discover\nmore Works'}
            />
          </div>
          <div
            className="grid grid-cols-1 gap-x-[30px] gap-y-16 md:grid-cols-2"
            data-anim="stagger"
          >
            {moreProjects.map((card) => (
              <div data-anim-item="" key={card.id}>
                <ProjectCard project={card} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
