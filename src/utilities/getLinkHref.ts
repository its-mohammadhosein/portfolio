import type { Page, Post, Project } from '@/payload-types'

type LinkData = {
  type?: 'custom' | 'reference' | null
  url?: string | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'projects'
    value: Page | Post | Project | string | number
  } | null
}

/** Href for a `link` field value: referenced document path, or the custom URL. */
export const getLinkHref = ({ type, url, reference }: LinkData): string | null => {
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    const { slug } = reference.value
    if (reference.relationTo === 'pages') return slug === 'home' ? '/' : `/${slug}`
    return `/${reference.relationTo}/${slug}`
  }
  return url || null
}
