import type { TextareaField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

/**
 * Large display title with a tiny markup, so editors can reproduce the html base titles:
 *   - each line is a separate line in the title ("R*i*cky⏎Dyson")
 *   - *text*  → <em> (the nudged italic letter in "R*i*cky")
 *   - ==text== → highlighted (red) word
 */
export const displayTitle = (
  name = 'title',
  overrides: Partial<TextareaField> = {},
): TextareaField =>
  deepMerge<TextareaField, Partial<TextareaField>>(
    {
      name,
      type: 'textarea',
      admin: {
        rows: 2,
        description: 'One line per row. *text* = italic letter(s), ==text== = red highlight.',
      },
    },
    overrides,
  )
