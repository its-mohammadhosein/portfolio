import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Falls back to the template logo when empty.',
      },
    },
    {
      name: 'availability',
      type: 'group',
      admin: {
        description: 'Status badge next to the logo, e.g. "Available May 2026".',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { width: '30%' } },
            { name: 'text', type: 'text', admin: { width: '70%' } },
          ],
        },
      ],
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show search link in the menu',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        description:
          'Header menu, in order (desktop and mobile). Use "Site page" for Home, Work, About and Contact. Empty = the html base menu.',
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
