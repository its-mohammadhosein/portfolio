// Generated from public/dyson (html base images/videos). Built-in defaults when Payload has no media.
import type { Media } from '@/payload-types'

/** A Media-shaped object for a file in public/dyson, so components render it like an upload. */
const staticMedia = (
  filename: string,
  alt: string,
  mimeType: string,
  width: number | null,
  height: number | null,
): Media =>
  ({
    id: 0,
    alt,
    filename,
    mimeType,
    width,
    height,
    url: `/dyson/${filename}`,
    updatedAt: '',
    createdAt: '',
  }) as Media

export const dysonMedia = {
  '1-1.webp': staticMedia('1-1.webp', '', 'image/webp', 1920, 1200),
  '1-2.webp': staticMedia('1-2.webp', '', 'image/webp', 1920, 1200),
  '1-3.webp': staticMedia('1-3.webp', 'Studio work background', 'image/webp', 1920, 1200),
  '1-4.webp': staticMedia('1-4.webp', '', 'image/webp', 1920, 1200),
  '1.webp': staticMedia('1.webp', 'Studio workspace', 'image/webp', 1920, 1200),
  '2-1.webp': staticMedia('2-1.webp', '', 'image/webp', 1920, 1080),
  '2-2.webp': staticMedia('2-2.webp', '', 'image/webp', 1920, 1080),
  '2-3.webp': staticMedia('2-3.webp', '', 'image/webp', 1920, 1080),
  '2-4.webp': staticMedia('2-4.webp', '', 'image/webp', 1920, 1080),
  '2.webp': staticMedia('2.webp', '', 'image/webp', 1920, 1080),
  '3-1.webp': staticMedia('3-1.webp', '', 'image/webp', 1920, 1080),
  '3-2.webp': staticMedia('3-2.webp', '', 'image/webp', 1920, 1080),
  '3-3.webp': staticMedia('3-3.webp', '', 'image/webp', 1920, 1080),
  '3-4.webp': staticMedia('3-4.webp', '', 'image/webp', 1920, 1080),
  '4-1.webp': staticMedia('4-1.webp', '', 'image/webp', 1920, 1080),
  '4.webp': staticMedia('4.webp', '', 'image/webp', 1920, 1080),
  'about-dyson-1.mp4': staticMedia(
    'about-dyson-1.mp4',
    'Ricky Dyson at work',
    'video/mp4',
    null,
    null,
  ),
  'hero-image.webp': staticMedia('hero-image.webp', 'Ricky Dyson portrait', 'image/webp', 670, 806),
  'logo.svg': staticMedia('logo.svg', 'Ricky Dyson', 'image/svg+xml', 84, 36),
  'preview-1.webp': staticMedia('preview-1.webp', '', 'image/webp', 1106, 820),
  'preview-2.webp': staticMedia('preview-2.webp', '', 'image/webp', 1106, 820),
  'preview-3.webp': staticMedia('preview-3.webp', '', 'image/webp', 1106, 820),
  'preview-4.webp': staticMedia('preview-4.webp', '', 'image/webp', 1106, 820),
  'preview.webp': staticMedia('preview.webp', '', 'image/webp', 1106, 820),
  'spark.svg': staticMedia('spark.svg', '', 'image/svg+xml', 17, 17),
  'video2.mp4': staticMedia('video2.mp4', 'Reaching new heights video', 'video/mp4', null, null),
  'visual1a.webp': staticMedia('visual1a.webp', '', 'image/webp', 1920, 1200),
  'visual2.webp': staticMedia('visual2.webp', '', 'image/webp', 1920, 1080),
  'visual3.webp': staticMedia('visual3.webp', '', 'image/webp', 1920, 1080),
  'visualpreview.webp': staticMedia('visualpreview.webp', '', 'image/webp', 1106, 892),
} as const

export type DysonMediaFile = keyof typeof dysonMedia
