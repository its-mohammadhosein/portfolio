import type { AboutPage, ContactPage, Form, HomePage, Page, WorkPage } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { defaults, section } from './defaults'

/**
 * The fixed Dyson pages: section order and layout live here (the html base structure);
 * each section's data comes from the page's Payload global, or the built-in html base content.
 */
type Block = Page['layout'][number]
type Section = Record<string, unknown> | null | undefined

const block = (blockType: Block['blockType'], data: object) =>
  ({ blockType, ...data }) as unknown as Block

export const homeBlocks = (g: HomePage | null): Block[] => {
  const d = defaults.home
  return [
    block('heroDisplay', section(g?.hero as Section, d.hero, 'title')),
    block('statement', section(g?.statement as Section, d.statement, 'title')),
    block('marquee', section(g?.marquee as Section, d.marquee, 'rows')),
    block('portfolioGrid', section(g?.work as Section, d.work, 'title')),
    block('featureList', section(g?.benefits as Section, d.benefits, 'items')),
    block('statement', section(g?.reaching as Section, d.reaching, 'title')),
    block('dataTable', section(g?.awards as Section, d.awards, 'rows')),
  ]
}

export const workBlocks = (g: WorkPage | null): Block[] => {
  const d = defaults.work
  return [
    block('pageTitle', section(g?.title as Section, d.title, 'title')),
    block('portfolioGrid', section(g?.grid as Section, d.grid, 'title')),
  ]
}

export const aboutBlocks = (g: AboutPage | null): Block[] => {
  const d = defaults.about
  return [
    block('pageTitle', section(g?.title as Section, d.title, 'title')),
    block('mediaBlock', section(g?.video as Section, d.video, 'media')),
    block('labeledLists', section(g?.lists as Section, d.lists, 'lists')),
    block('featureList', section(g?.benefits as Section, d.benefits, 'items')),
    block('statement', section(g?.reaching as Section, d.reaching, 'title')),
    block('dataTable', section(g?.experience as Section, d.experience, 'rows')),
  ]
}

/** The contact form: the one picked on the Contact page global, else the form titled "Contact". */
const getContactForm = unstable_cache(
  async (): Promise<Form | null> => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'forms',
      limit: 1,
      pagination: false,
      where: { title: { equals: 'Contact' } },
    })
    return result.docs[0] ?? null
  },
  ['dyson-contact-form'],
  { tags: ['global_contact-page'] },
)

export const contactBlocks = async (g: ContactPage | null): Promise<Block[]> => {
  const d = defaults.contact
  const picked = g?.form?.form
  const form = picked && typeof picked === 'object' ? picked : await getContactForm()
  const formSection = section(g?.form as Section, d.form, 'title')
  return [
    block('pageTitle', section(g?.title as Section, d.title, 'title')),
    block('mediaBlock', section(g?.image as Section, d.image, 'media')),
    block('contactInfo', section(g?.info as Section, d.info, 'text')),
    // Without any form (fresh database before Payload creates it), the section is skipped
    ...(form ? [block('formBlock', { ...formSection, form, enableIntro: false })] : []),
  ]
}

/** SEO title/description: the global's, else the built-in one */
export const pageMeta = (
  meta: { title?: string | null; description?: string | null } | null | undefined,
  fallback: { title: string; description: string },
) => ({
  meta: {
    title: meta?.title || fallback.title,
    description: meta?.description || fallback.description,
  },
})
