import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import React from 'react'

import {
  CollaborativeApproachIcon,
  CreativeExcellenceIcon,
  OnTimeDeliveryIcon,
  ProfessionalTeamIcon,
} from '@/components/icons/feature-icons'
import { Caption } from '@/components/ui/caption'
import { Container } from '@/components/ui/container'
import { DisplayText } from '@/components/ui/display-text'
import { Divider } from '@/components/ui/divider'
import { FlipButton } from '@/components/ui/flip-button'
import { Section } from '@/components/ui/section'
import { UnderlineLink } from '@/components/ui/underline-link'

// Dev-only reference for the design system (migration P2.7). Every value names its html base source.

const colors = [
  { name: 'ink', className: 'bg-ink', value: '#000000', source: 'kit primary / text' },
  { name: 'paper', className: 'bg-paper', value: '#FFFFFF', source: 'kit 81328cc' },
  { name: 'copy', className: 'bg-copy', value: '#121212', source: 'text-editor color (page CSS)' },
  { name: 'steel', className: 'bg-steel', value: '#737577', source: 'kit secondary' },
  { name: 'line', className: 'bg-line', value: '#D4D6D8', source: 'kit accent' },
  {
    name: 'highlight',
    className: 'bg-highlight',
    value: '#F00000',
    source: '.wcf--title .highlight',
  },
  { name: 'signal', className: 'bg-signal', value: '#25E73D', source: 'CF7 .sent response' },
]

const typeStyles = [
  {
    name: 'type-display-xxl',
    className: 'type-display-xxl',
    sample: 'Dyson',
    source: 'kit 005dbb2',
  },
  { name: 'type-display-xl', className: 'type-display-xl', sample: 'Work', source: 'kit 64baf7f' },
  {
    name: 'type-display-l',
    className: 'type-display-l',
    sample: 'Discover',
    source: 'kit ea8371c',
  },
  {
    name: 'type-display-m',
    className: 'type-display-m',
    sample: "Let's Talk",
    source: 'kit a1ae05b',
  },
  {
    name: 'type-heading',
    className: 'type-heading',
    sample: 'Creative Excellence',
    source: 'kit primary',
  },
  {
    name: 'type-body-strong',
    className: 'type-body-strong',
    sample: 'Emphasised short copy',
    source: 'kit 74b9abe',
  },
  {
    name: 'type-lead',
    className: 'type-lead',
    sample: 'Projects of years ©2021 — 2025',
    source: 'kit accent',
  },
  {
    name: 'type-body',
    className: 'type-body',
    sample: 'We combine imagination with expertise to craft bold, memorable work.',
    source: 'kit text',
  },
  { name: 'type-label', className: 'type-label', sample: 'Branding', source: 'kit ed79786' },
  {
    name: 'type-small',
    className: 'type-small',
    sample: 'Designed by Treethemes',
    source: 'kit d538e05',
  },
  {
    name: 'type-eyebrow',
    className: 'type-eyebrow',
    sample: 'Have a project in mind?',
    source: 'footer 1a7406c',
  },
  {
    name: 'type-caption',
    className: 'type-caption',
    sample: '(Featured by)',
    source: 'home 538a5bff',
  },
  {
    name: 'type-row',
    className: 'type-row',
    sample: 'Awwwards — Site of the day — 2025',
    source: 'home a5ec3b0',
  },
  { name: 'type-nav', className: 'type-nav', sample: 'Work', source: 'header 862dccc' },
  { name: 'type-button', className: 'type-button', sample: "Let's Talk", source: 'footer 31dbc52' },
  {
    name: 'type-button-lg',
    className: 'type-button-lg',
    sample: 'Instagram',
    source: 'footer 5ff3545',
  },
  { name: 'type-link', className: 'type-link', sample: 'All Projects', source: 'home fab8a95' },
]

const icons = [
  { name: 'Creative Excellence', Icon: CreativeExcellenceIcon, source: 'svg-path-13' },
  { name: 'Professional Team', Icon: ProfessionalTeamIcon, source: 'svg-path-2' },
  { name: 'Collaborative Approach', Icon: CollaborativeApproachIcon, source: 'svg-path-19' },
  { name: 'On-Time Delivery', Icon: OnTimeDeliveryIcon, source: 'svg-path-11' },
]

const Source: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="type-small text-steel">{children}</code>
)

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="pb-24">
      <Section className="py-16">
        <Container className="flex flex-col gap-4">
          <Caption size="lg">Styleguide</Caption>
          <p className="type-body max-w-3xl">
            Design tokens and primitives from <code>migration/DESIGN.md</code>. Dev only.
          </p>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="flex flex-col gap-6">
          <h2 className="type-heading">Colour</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className={`h-20 border border-line ${c.className}`} />
                <span className="type-body-strong">{c.name}</span>
                <span className="type-small">{c.value}</span>
                <Source>{c.source}</Source>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="flex flex-col gap-8">
          <h2 className="type-heading">Type</h2>
          {typeStyles.map((t) => (
            <div key={t.name} className="flex flex-col gap-2 border-t border-line pt-4">
              <div className="flex flex-wrap gap-x-6">
                <span className="type-small font-semibold">{t.name}</span>
                <Source>{t.source}</Source>
              </div>
              <div className={t.className}>{t.sample}</div>
            </div>
          ))}
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="flex flex-col gap-6">
          <h2 className="type-heading">Display text</h2>
          <Source>
            hero 6ac8fc8 / b94fcb3: 17vw (21vw ≤767px), weight 300 / 400, line height 0.8
          </Source>
        </Container>
        <div className="py-8 text-center">
          <DisplayText
            as="p"
            size="xxl"
            className="text-[21vw] font-light leading-[0.8] md:text-[17vw]"
          >
            R<em>i</em>cky
          </DisplayText>
          <DisplayText as="p" size="xxl" className="text-[21vw] leading-[0.8] md:text-[17vw]">
            Dys<span className="highlight">o</span>n
          </DisplayText>
        </div>
      </Section>

      <Section className="py-12">
        <Container className="flex flex-col gap-8">
          <h2 className="type-heading">Buttons and links</h2>
          <div className="flex flex-wrap items-center gap-8">
            <FlipButton href="/contact" label="Let's Talk" />
            <UnderlineLink href="/work">All Projects</UnderlineLink>
          </div>
          <Source>FlipButton pill (footer 31dbc52) · UnderlineLink (home fab8a95)</Source>
        </Container>
      </Section>

      <Section theme="dark" className="py-12">
        <Container className="flex flex-col gap-8">
          <h2 className="type-eyebrow">Have a project in mind?</h2>
          <div className="flex flex-wrap items-center gap-8">
            <FlipButton href="/contact" label="Let's Talk" />
            <FlipButton href="#" variant="plain" label="Facebook" />
            <FlipButton href="#" variant="plain" label="Instagram" />
            <FlipButton href="#" variant="plain" label="X.com" />
          </div>
          <Source>Dark section · FlipButton plain (footer 5ff3545)</Source>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="flex flex-col gap-4">
          <h2 className="type-heading">Captions and table rows</h2>
          <div className="grid grid-cols-3 gap-4">
            <Caption>Featured by</Caption>
            <Caption>Award</Caption>
            <Caption>Year</Caption>
          </div>
          <Divider />
          <div className="grid grid-cols-3 gap-4 type-row">
            <span>Awwwards</span>
            <span>Site of the day</span>
            <span>2025</span>
          </div>
          <Divider />
          <Divider tone="line" />
          <Source>Divider ink (home 645ed1c) · Divider line (kit accent)</Source>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="flex flex-col gap-6">
          <h2 className="type-heading">Feature icons</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {icons.map(({ Icon, name, source }) => (
              <div key={name} className="flex flex-col gap-3">
                <Icon className="size-12" />
                <span className="type-heading">{name}</span>
                <Source>{source}</Source>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}
