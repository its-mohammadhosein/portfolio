import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

/** "Benefits" section (pin-benefits): marquee label + icon/title/text items, pinned while scrolling. */
export const FeatureList: Block = {
  slug: 'featureList',
  interfaceName: 'FeatureListBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: { width: '70%', description: 'Marquee word, e.g. "Benefits"' },
        },
        {
          name: 'pinned',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '30%', description: 'Pin the label while items scroll' },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'none',
              admin: { width: '40%' },
              // Glyphs extracted from the html base icon font (src/components/icons/feature-icons.tsx)
              options: [
                { label: 'None', value: 'none' },
                { label: 'Creative excellence', value: 'creativeExcellence' },
                { label: 'Professional team', value: 'professionalTeam' },
                { label: 'Collaborative approach', value: 'collaborativeApproach' },
                { label: 'On-time delivery', value: 'onTimeDelivery' },
              ],
            },
            { name: 'title', type: 'text', required: true, admin: { width: '60%' } },
          ],
        },
        { name: 'text', type: 'textarea' },
      ],
    },
    blockStyle({ preset: 'fade-up' }),
  ],
}
