import type { Block } from 'payload'

import { sectionTheme } from '@/fields/sectionTheme'

/** Infinite horizontal scrolling words (wcf--brand-slider), one row per entry. */
export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  fields: [
    {
      name: 'rows',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Each row scrolls its own word, e.g. Branding / Development / Design.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'text', type: 'text', required: true, admin: { width: '70%' } },
            {
              name: 'reverse',
              type: 'checkbox',
              admin: { width: '30%', description: 'Scroll right to left' },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'speed',
          type: 'number',
          defaultValue: 5000,
          admin: {
            width: '50%',
            description: 'Milliseconds per item (html base: 5000; Benefits 9000)',
          },
        },
        {
          name: 'gap',
          type: 'number',
          defaultValue: 50,
          admin: { width: '50%', description: 'Space between items in px (20 on mobile)' },
        },
      ],
    },
    sectionTheme(),
  ],
}
