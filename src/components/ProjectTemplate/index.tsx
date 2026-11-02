import type { Project } from '@/payload-types'

import { Media } from '@/components/Media'
import { TitleMarkup } from '@/components/TitleMarkup'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { ProjectCard } from '@/utilities/getProjects'
import Link from 'next/link'
import React from 'react'

/**
 * Project page, mirroring the html base project template:
 * split title → hero image → overview + meta → full-width images → more works.
 */
export const ProjectTemplate: React.FC<{ project: Project; moreProjects: ProjectCard[] }> = ({
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
      <Section>
        <Container>
          <h1>
            <TitleMarkup text={heroTitle || title} />
          </h1>
        </Container>
      </Section>

      <Section>
        <Media resource={heroImage} priority size="100vw" />
      </Section>

      <Section>
        <Container>
          {overviewLabel && <p>{overviewLabel}</p>}
          {overview && <p>{overview}</p>}
          {meta.length > 0 && (
            <dl>
              {meta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {liveUrl && (
            <a href={liveUrl} rel="noopener noreferrer" target="_blank">
              View Online
            </a>
          )}
        </Container>
      </Section>

      {project.gallery?.map((item, i) => (
        <Section key={item.id ?? i}>
          <Media resource={item.image} size="100vw" />
        </Section>
      ))}

      {moreProjects.length > 0 && (
        <Section>
          <Container>
            <h2>
              <TitleMarkup text={project.moreTitle} />
            </h2>
            <ul>
              {moreProjects.map((card) => (
                <li key={card.id}>
                  <Link href={`/projects/${card.slug}`}>{card.title}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  )
}
