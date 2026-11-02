import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

/** Contact page details: intro text, email, phone and socials (values from Site Settings). */
export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      admin: { description: 'e.g. "Have a question? Just drop me a line…"' },
    },
    {
      type: 'row',
      fields: [
        { name: 'showEmail', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
        { name: 'showPhone', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
        { name: 'showSocials', type: 'checkbox', defaultValue: true, admin: { width: '34%' } },
      ],
    },
    blockStyle({ preset: 'chars' }),
  ],
}
