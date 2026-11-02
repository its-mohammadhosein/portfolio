import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { displayTitle } from '@/fields/displayTitle'

/** Big page title, e.g. "WORK", "Let's Talk". */
export const PageTitle: Block = {
  slug: 'pageTitle',
  interfaceName: 'PageTitleBlock',
  fields: [
    displayTitle('title', { required: true }),
    {
      type: 'row',
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'xxl',
          admin: { width: '50%' },
          options: [
            { label: 'XXL (full-width wordmark)', value: 'xxl' },
            { label: 'XL', value: 'xl' },
            { label: 'L', value: 'l' },
            { label: 'M', value: 'm' },
          ],
        },
        {
          name: 'align',
          type: 'select',
          defaultValue: 'center',
          admin: { width: '50%' },
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
          ],
        },
      ],
    },
    blockStyle({ preset: 'text-reveal' }),
  ],
}
