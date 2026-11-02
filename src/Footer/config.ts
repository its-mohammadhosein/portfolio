import type { GlobalConfig } from 'payload'

import { displayTitle } from '@/fields/displayTitle'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cta',
      type: 'group',
      label: 'Call to action',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          admin: { description: 'e.g. "Have a project in mind?"' },
        },
        {
          // Off by default: an enabled link requires a target, which would block saving an empty footer
          name: 'enableLink',
          type: 'checkbox',
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
    {
      name: 'showSocials',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Social links come from Site Settings.',
      },
    },
    displayTitle('wordmark', {
      admin: {
        description: 'Giant wordmark at the bottom, e.g. "R*i*cky⏎Dyson".',
      },
    }),
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Bottom-left line, e.g. "Designed by Treethemes."',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
