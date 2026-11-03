import type { Field, GlobalAfterChangeHook, GlobalConfig, Tab } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { ContactInfo } from '@/blocks/ContactInfo/config'
import { DataTable } from '@/blocks/DataTable/config'
import { FeatureList } from '@/blocks/FeatureList/config'
import { FormBlock } from '@/blocks/Form/config'
import { HeroDisplay } from '@/blocks/HeroDisplay/config'
import { LabeledLists } from '@/blocks/LabeledLists/config'
import { Marquee } from '@/blocks/Marquee/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { PageTitle } from '@/blocks/PageTitle/config'
import { PortfolioGrid } from '@/blocks/PortfolioGrid/config'
import { Statement } from '@/blocks/Statement/config'

/**
 * Content of the fixed Dyson pages (/, /work, /about, /contact). The layout lives in React
 * (src/app/(frontend)); these globals hold the editable data per section. An empty section
 * shows the built-in html base content (src/dyson/content.ts).
 */

/** Same fields as the block, but optional: empty means "use the built-in content". */
const optional = (fields: Field[]): Field[] =>
  fields.map((field) => {
    const copy = { ...field } as Field & { required?: boolean; minRows?: number }
    if ('required' in copy) copy.required = false
    if ('minRows' in copy) delete copy.minRows
    if ((copy.type === 'row' || copy.type === 'collapsible') && 'fields' in copy) {
      return { ...copy, fields: optional(copy.fields) } as Field
    }
    return copy as Field
  })

const sectionTab = (name: string, label: string, fields: Field[]): Tab => ({
  name,
  label,
  description: 'Leave empty to show the built-in content from the html base.',
  fields: optional(fields),
})

const metaTab: Tab = {
  name: 'meta',
  label: 'SEO',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
}

const revalidate =
  (slug: string, path: string): GlobalAfterChangeHook =>
  ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating ${path}`)
      revalidateTag(`global_${slug}`, { expire: 0 })
      revalidatePath(path)
    }
    return doc
  }

const pageGlobal = (slug: string, label: string, path: string, tabs: Tab[]): GlobalConfig => ({
  slug,
  label,
  admin: {
    group: 'Pages (fixed)',
    description: `Content of ${path}. The layout is fixed in code; empty sections show the html base content.`,
  },
  access: {
    read: () => true,
  },
  fields: [{ type: 'tabs', tabs: [...tabs, metaTab] }],
  hooks: {
    afterChange: [revalidate(slug, path)],
  },
})

export const HomePage = pageGlobal('home-page', 'Home page', '/', [
  sectionTab('hero', 'Hero', HeroDisplay.fields),
  sectionTab('statement', 'Statement', Statement.fields),
  sectionTab('marquee', 'Marquee', Marquee.fields),
  sectionTab('work', 'Work', PortfolioGrid.fields),
  sectionTab('benefits', 'Benefits', FeatureList.fields),
  sectionTab('reaching', 'Reaching new heights', Statement.fields),
  sectionTab('awards', 'Awards', DataTable.fields),
])

export const WorkPage = pageGlobal('work-page', 'Work page', '/work', [
  sectionTab('title', 'Title', PageTitle.fields),
  sectionTab('grid', 'Projects grid', PortfolioGrid.fields),
])

export const AboutPage = pageGlobal('about-page', 'About page', '/about', [
  sectionTab('title', 'Title', PageTitle.fields),
  sectionTab('video', 'Video', MediaBlock.fields),
  sectionTab('lists', 'Lists', LabeledLists.fields),
  sectionTab('benefits', 'Benefits', FeatureList.fields),
  sectionTab('reaching', 'Reaching new heights', Statement.fields),
  sectionTab('experience', 'Experience', DataTable.fields),
])

export const ContactPage = pageGlobal('contact-page', 'Contact page', '/contact', [
  sectionTab('title', 'Title', PageTitle.fields),
  sectionTab('image', 'Image', MediaBlock.fields),
  sectionTab('info', 'Contact details', ContactInfo.fields),
  sectionTab('form', 'Form', FormBlock.fields),
])

export const dysonPageGlobals = [HomePage, WorkPage, AboutPage, ContactPage]
