import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { displayTitle } from '@/fields/displayTitle'
import { link } from '@/fields/link'

/** Three-column table with ruled rows: home "Awards / Recognitions", about "Work experience". */
export const DataTable: Block = {
  slug: 'dataTable',
  interfaceName: 'DataTableBlock',
  fields: [
    displayTitle('title', {
      admin: { description: 'e.g. "Awards /⏎Recognitions"' },
    }),
    {
      name: 'columns',
      type: 'group',
      admin: {
        description: 'Column labels, shown in parentheses, e.g. Featured by / Award / Year',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'first', type: 'text', admin: { width: '33%' } },
            { name: 'second', type: 'text', admin: { width: '33%' } },
            { name: 'third', type: 'text', admin: { width: '34%' } },
          ],
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'first', type: 'text', required: true, admin: { width: '33%' } },
            { name: 'second', type: 'text', admin: { width: '33%' } },
            { name: 'third', type: 'text', admin: { width: '34%' } },
          ],
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
    blockStyle({ theme: 'dark', preset: 'text-reveal' }),
  ],
}
