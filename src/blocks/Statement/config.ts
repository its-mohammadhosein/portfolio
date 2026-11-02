import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { displayTitle } from '@/fields/displayTitle'
import { link } from '@/fields/link'

/**
 * Text section: the home intro statement, "Reaching New Heights" (title + text + link),
 * the about intro paragraph.
 */
export const Statement: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  fields: [
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional label in parentheses above the title.' },
    },
    displayTitle('title'),
    {
      name: 'titleSize',
      type: 'select',
      defaultValue: 'heading',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.title),
      },
      options: [
        { label: 'Statement (heading size)', value: 'heading' },
        { label: 'Display', value: 'display' },
      ],
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    link({
      appearances: ['underline', 'pill'],
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
    blockStyle({ preset: 'text-reveal' }),
  ],
}
