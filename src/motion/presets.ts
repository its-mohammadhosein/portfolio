/**
 * Animation presets with the html base values (migration/DESIGN.md §5, from the theme/plugin JS).
 * Both engines (native now, GSAP later) read this registry.
 */
export type PresetName = 'text-reveal' | 'chars' | 'fade' | 'fade-up' | 'image-reveal' | 'stagger'

export type Preset = {
  duration: number // seconds
  delay: number // seconds
  stagger: number // seconds between split items / children
  y: number // px the element (or each char) rises from
  scale?: number // image-reveal start scale
  ease: string // CSS easing (native engine)
  gsapEase: string // GSAP easing (GSAP engine), from the theme/plugin JS
}

export const presets: Record<PresetName, Preset> = {
  // wcf_text_animation: text_reveal → SplitText chars, from { y: 80, opacity: 0 }, circ.out
  'text-reveal': {
    duration: 1,
    delay: 0.15,
    stagger: 0.02,
    y: 80,
    ease: 'var(--ease-reveal)',
    gsapEase: 'circ.out',
  },
  // wcf_text_animation: char
  chars: {
    duration: 0.6,
    delay: 0,
    stagger: 0.02,
    y: 20,
    ease: 'var(--ease-out-strong)',
    gsapEase: 'power4.out',
  },
  // Elementor fadeIn (wcf duration 1000ms, ease)
  fade: { duration: 1, delay: 0, stagger: 0, y: 0, ease: 'ease', gsapEase: 'power1.out' },
  // Elementor fadeInUp
  'fade-up': { duration: 1, delay: 0, stagger: 0, y: 50, ease: 'ease', gsapEase: 'power1.out' },
  // wcf-image-animation: reveal → img from scale 1.3
  'image-reveal': {
    duration: 1.2,
    delay: 0,
    stagger: 0,
    y: 0,
    scale: 1.3,
    ease: 'var(--ease-out-strong)',
    gsapEase: 'power4.out',
  },
  // bb-reveal-* portfolio grid stagger
  stagger: {
    duration: 0.8,
    delay: 0,
    stagger: 0.15,
    y: 60,
    ease: 'var(--ease-out-strong)',
    gsapEase: 'power4.out',
  },
}

/** ScrollTrigger start "top 85%" → element top crosses 85% of the viewport height */
export const TRIGGER_ROOT_MARGIN = '0px 0px -15% 0px'

/** Anchor scrolling (brandberry-smooth-scroll.js): easeInOutQuart, 1500ms, 80px header offset */
export const ANCHOR_SCROLL = { duration: 1500, offset: 80 }
