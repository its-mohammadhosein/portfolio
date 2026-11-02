import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { displayTitle } from '@/fields/displayTitle'
import { link } from '@/fields/link'

/** Project cards (bb--portfolio skin three): home "Work", the Work page, "more works". */
export const PortfolioGrid: Block = {
  slug: 'portfolioGrid',
  interfaceName: 'PortfolioGridBlock',
  fields: [
    displayTitle('title'),
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'e.g. "Projects of years⏎©2021 — 2025"' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid (Work page)', value: 'grid' },
        { label: 'Staggered with parallax (home, 3 projects)', value: 'staggered' },
      ],
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest projects', value: 'latest' },
        { label: 'By category', value: 'category' },
        { label: 'Hand-picked', value: 'selection' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_data, siblingData) => siblingData?.populateBy === 'category',
      },
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        condition: (_data, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'limit',
          type: 'number',
          defaultValue: 6,
          min: 1,
          admin: {
            width: '50%',
            condition: (_data, siblingData) => siblingData?.populateBy !== 'selection',
          },
        },
        {
          name: 'showTabs',
          type: 'checkbox',
          admin: { width: '50%', description: 'Category filter tabs (Work page)' },
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
    blockStyle({ preset: 'stagger' }),
  ],
}
