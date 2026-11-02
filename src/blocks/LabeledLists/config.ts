import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

/** About page lists: (SERVICES) / (CLIENTS) / (SKILLS) / (AWARDS) with large stacked words. */
export const LabeledLists: Block = {
  slug: 'labeledLists',
  interfaceName: 'LabeledListsBlock',
  fields: [
    {
      name: 'lists',
      type: 'array',
      required: true,
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Shown in parentheses, e.g. "Services"' },
        },
        {
          name: 'entries',
          type: 'textarea',
          required: true,
          admin: { description: 'One entry per line.' },
        },
      ],
    },
    {
      name: 'text',
      type: 'textarea',
      admin: { description: 'Paragraph next to the lists.' },
    },
    blockStyle({ preset: 'text-reveal' }),
  ],
}
