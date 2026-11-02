import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { displayTitle } from '@/fields/displayTitle'

/** Home / About hero: giant wordmark lines, optional rotated parallax image, role words, caption. */
export const HeroDisplay: Block = {
  slug: 'heroDisplay',
  interfaceName: 'HeroDisplayBlock',
  labels: {
    singular: 'Hero (display)',
    plural: 'Heroes (display)',
  },
  fields: [
    displayTitle('title', {
      required: true,
      admin: {
        description: 'One line per row, e.g. "R*i*cky⏎Dyson". *text* = italic, ==text== = red.',
      },
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '70%' },
        },
        {
          name: 'imageSpeed',
          type: 'number',
          defaultValue: 1.5,
          admin: { width: '30%', step: 0.05, description: 'Parallax speed (1 = none)' },
        },
      ],
    },
    {
      name: 'roles',
      type: 'array',
      admin: {
        description: 'Short words around the title, e.g. Artist / Designer / Creator.',
      },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Shown in parentheses, e.g. "Scroll to explore".',
      },
    },
    {
      name: 'showSocials',
      type: 'checkbox',
      admin: {
        description: 'Social icons from Site Settings.',
      },
    },
    blockStyle({ preset: 'text-reveal' }),
  ],
}
