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
      defaultValue: 'statement',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.title),
      },
      options: [
        { label: 'Statement (4.5vw, uppercase)', value: 'statement' },
        { label: 'Large (5vw, uppercase)', value: 'large' },
        { label: 'Heading (1.75rem)', value: 'heading' },
        { label: 'Wordmark (17vw)', value: 'display' },
      ],
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Centered', value: 'center' },
        { label: 'Bottom left (over background media)', value: 'bottomLeft' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundMedia',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '70%', description: 'Image or video behind the section' },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          defaultValue: 0.25,
          min: 0,
          max: 1,
          admin: { width: '30%', step: 0.05 },
        },
      ],
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
