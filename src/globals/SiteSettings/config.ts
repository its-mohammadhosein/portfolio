import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

/** Site-wide contact details, social links and motion switches, reused by several blocks. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', admin: { width: '50%' } },
                { name: 'phone', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Used by the hero, contact section and footer.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      admin: { width: '30%' },
                      options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'X', value: 'x' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'Dribbble', value: 'dribbble' },
                        { label: 'Behance', value: 'behance' },
                        { label: 'GitHub', value: 'github' },
                        { label: 'Other', value: 'other' },
                      ],
                    },
                    {
                      name: 'label',
                      type: 'text',
                      admin: { width: '30%', description: 'e.g. "X.com"' },
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '40%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Motion',
          fields: [
            {
              name: 'smoothScroll',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'Smooth scrolling and parallax (turned off for reduced motion anyway).',
              },
            },
            {
              name: 'scrollToTop',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show scroll-to-top button',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
