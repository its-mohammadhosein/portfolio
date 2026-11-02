import type { AnimationSettings } from '@/payload-types'

/**
 * `data-anim*` attributes for an element, from a block's animation settings. The motion layer
 * (src/motion) reads only these attributes, so the engine can change without touching blocks.
 */
export const animAttributes = (
  animation?: Partial<AnimationSettings> | null,
): Record<string, string> => {
  if (!animation?.preset || animation.preset === 'none') return {}
  const attrs: Record<string, string> = { 'data-anim': animation.preset }
  if (animation.delay != null) attrs['data-anim-delay'] = String(animation.delay)
  if (animation.duration != null) attrs['data-anim-duration'] = String(animation.duration)
  if (animation.stagger != null) attrs['data-anim-stagger'] = String(animation.stagger)
  return attrs
}
