import type { Media } from '@/payload-types'

import {
  type MediaRef,
  aboutContent,
  contactContent,
  footerContent,
  headerContent,
  homeContent,
  isMediaRef,
  siteSettingsContent,
  workContent,
} from './content'
import { dysonMedia } from './media'

/** Replace MediaRef markers with Media-shaped objects for the built-in files. */
export type Resolved<T> = T extends MediaRef
  ? Media
  : T extends (infer U)[]
    ? Resolved<U>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T

export const staticMedia = (ref: MediaRef): Media => {
  const base = dysonMedia[ref.__media]
  return { ...base, alt: ref.alt ?? base.alt }
}

export const resolveStatic = <T>(value: T): Resolved<T> => {
  if (isMediaRef(value)) return staticMedia(value) as Resolved<T>
  if (Array.isArray(value)) return value.map(resolveStatic) as Resolved<T>
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, resolveStatic(v)]),
    ) as Resolved<T>
  }
  return value as Resolved<T>
}

/** Built-in html base content, ready to render (media from public/dyson). */
export const defaults = {
  home: resolveStatic(homeContent),
  work: resolveStatic(workContent),
  about: resolveStatic(aboutContent),
  contact: resolveStatic(contactContent),
  header: resolveStatic(headerContent),
  footer: resolveStatic(footerContent),
  siteSettings: siteSettingsContent,
}

/** A populated upload, or the fallback (missing, unpopulated or deleted media → built-in). */
export const mediaOr = (value: unknown, fallback: Media | null | undefined): Media | null =>
  value && typeof value === 'object' && 'url' in value && (value as Media).url
    ? (value as Media)
    : (fallback ?? null)

const filled = (value: unknown) =>
  Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined && value !== ''

/**
 * Payload section if the editor filled it in (its main field is set), otherwise the default.
 * Defaults also fill fields the editor left empty, and media fall back field by field.
 */
export const section = <D extends Record<string, unknown>>(
  fromPayload: Record<string, unknown> | null | undefined,
  fallback: D,
  mainField: string,
): D => {
  if (!fromPayload || !filled(fromPayload[mainField])) return fallback
  const merged: Record<string, unknown> = { ...fallback }
  for (const [key, value] of Object.entries(fromPayload)) {
    if (!filled(value)) continue
    const fallbackValue = fallback[key]
    merged[key] =
      fallbackValue && typeof fallbackValue === 'object' && 'mimeType' in fallbackValue
        ? mediaOr(value, fallbackValue as Media)
        : value
  }
  return merged as D
}
