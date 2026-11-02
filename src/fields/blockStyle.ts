import type { Field } from 'payload'

import { type AnimationPreset, animation } from './animation'
import { sectionTheme } from './sectionTheme'

/** Collapsed "Style & motion" fields shared by the Dyson blocks: section theme + entrance animation. */
export const blockStyle = ({
  theme = 'light',
  preset = 'fade-up',
}: {
  theme?: 'light' | 'dark'
  preset?: AnimationPreset
} = {}): Field => ({
  type: 'collapsible',
  label: 'Style & motion',
  admin: {
    initCollapsed: true,
  },
  fields: [sectionTheme(theme), animation({ defaultPreset: preset })],
})
