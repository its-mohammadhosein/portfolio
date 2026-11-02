import type { GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

/**
 * Animation presets, ported from the html base (migration/DESIGN.md §5). The frontend motion layer
 * (src/motion) reads them from `data-anim` attributes, so the engine can change (plain JS now, GSAP
 * later) without touching content.
 */
export const animationPresets = [
  { label: 'None', value: 'none' },
  { label: 'Text reveal (lines/chars rise in)', value: 'text-reveal' },
  { label: 'Characters', value: 'chars' },
  { label: 'Fade', value: 'fade' },
  { label: 'Fade up', value: 'fade-up' },
  { label: 'Image reveal', value: 'image-reveal' },
  { label: 'Stagger children', value: 'stagger' },
] as const

export type AnimationPreset = (typeof animationPresets)[number]['value']

type AnimationType = (options?: {
  defaultPreset?: AnimationPreset
  overrides?: Partial<GroupField>
}) => GroupField

export const animation: AnimationType = ({ defaultPreset = 'fade-up', overrides = {} } = {}) => {
  const field: GroupField = {
    name: 'animation',
    type: 'group',
    interfaceName: 'AnimationSettings',
    admin: {
      description: 'Entrance animation. Leave delay/duration empty to use the preset defaults.',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'preset',
            type: 'select',
            defaultValue: defaultPreset,
            options: [...animationPresets],
            admin: { width: '40%' },
          },
          {
            name: 'delay',
            type: 'number',
            min: 0,
            max: 5,
            admin: { step: 0.05, width: '20%', description: 'Seconds' },
          },
          {
            name: 'duration',
            type: 'number',
            min: 0,
            max: 5,
            admin: { step: 0.05, width: '20%', description: 'Seconds' },
          },
          {
            name: 'stagger',
            type: 'number',
            min: 0,
            max: 1,
            admin: { step: 0.01, width: '20%', description: 'Seconds between items' },
          },
        ],
      },
    ],
  }

  return deepMerge(field, overrides)
}
