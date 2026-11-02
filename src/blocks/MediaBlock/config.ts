import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Dyson: full-width parallax images (contact image, about video, project images)
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'container',
          admin: { width: '50%' },
          options: [
            { label: 'Container', value: 'container' },
            { label: 'Full width', value: 'full' },
          ],
        },
        {
          name: 'speed',
          type: 'number',
          admin: {
            width: '50%',
            step: 0.05,
            description: 'Parallax speed, e.g. 0.9 (empty = none)',
          },
        },
      ],
    },
    blockStyle({ preset: 'fade-up' }),
  ],
}
