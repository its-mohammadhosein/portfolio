import { type PresetName, TRIGGER_ROOT_MARGIN, presets } from './presets'
import { splitText } from './split'

/**
 * Native motion engine (P5): IntersectionObserver + Web Animations API + rAF parallax.
 * Reads only `data-anim`, `data-anim-delay/-duration/-stagger`, `data-anim-text`, `data-anim-item`
 * and `data-speed`, so the GSAP engine (P6) can replace it behind the same markup.
 *
 * Targets:
 *   text-reveal / chars → `[data-anim-text]` inside the element, else its h1–h6, else the element
 *   fade / fade-up      → the element itself, or a <section>'s children
 *   stagger             → `[data-anim-item]` inside the element, else its children
 *   image-reveal        → the element's <img>/<video>, scaled down inside a clipped parent
 */

const DONE = 'data-anim-done'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const num = (value: string | undefined, fallback: number) => {
  const n = value === undefined || value === '' ? NaN : Number(value)
  return Number.isFinite(n) ? n : fallback
}

const settingsFor = (el: HTMLElement) => {
  const name = el.dataset.anim as PresetName
  const preset = presets[name]
  if (!preset) return null
  return {
    name,
    ...preset,
    delay: num(el.dataset.animDelay, preset.delay),
    duration: num(el.dataset.animDuration, preset.duration),
    stagger: num(el.dataset.animStagger, preset.stagger),
  }
}

const rise = (
  target: HTMLElement,
  {
    y,
    duration,
    delay,
    ease,
    scale,
  }: { y: number; duration: number; delay: number; ease: string; scale?: number },
) =>
  target.animate(
    [
      { opacity: scale ? 1 : 0, transform: scale ? `scale(${scale})` : `translateY(${y}px)` },
      { opacity: 1, transform: scale ? 'scale(1)' : 'translateY(0)' },
    ],
    {
      duration: duration * 1000,
      delay: delay * 1000,
      easing: resolveEase(ease),
      fill: 'backwards',
    },
  )

// WAAPI needs a concrete easing, not a CSS variable
const resolveEase = (ease: string) => {
  const m = /^var\((--[\w-]+)\)$/.exec(ease)
  if (!m) return ease
  return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || 'ease'
}

const play = (el: HTMLElement) => {
  const s = settingsFor(el)
  if (!s) return
  el.setAttribute(DONE, '')

  if (s.name === 'text-reveal' || s.name === 'chars') {
    const explicit = Array.from(el.querySelectorAll<HTMLElement>('[data-anim-text]'))
    const headings = Array.from(el.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))
    const targets = explicit.length ? explicit : headings.length ? headings : [el]
    let offset = 0
    targets.forEach((target) => {
      const chars = splitText(target)
      chars.forEach((ch, i) => rise(ch, { ...s, delay: s.delay + offset + i * s.stagger }))
      offset += chars.length * s.stagger
    })
    return
  }

  if (s.name === 'stagger') {
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-anim-item]'))
    const targets = items.length ? items : (Array.from(el.children) as HTMLElement[])
    targets.forEach((item, i) => rise(item, { ...s, delay: s.delay + i * s.stagger }))
    return
  }

  if (s.name === 'image-reveal') {
    const media = el.querySelector<HTMLElement>('img, video')
    if (media) {
      if (media.parentElement) media.parentElement.style.overflow = 'hidden'
      rise(media, s)
    }
    return
  }

  // fade / fade-up: animate a section's content, not its background
  const targets = el.tagName === 'SECTION' ? (Array.from(el.children) as HTMLElement[]) : [el]
  targets.forEach((target) => rise(target, s))
}

/** Parallax for `[data-speed]`: ScrollSmoother semantics, offset = (speed - 1) × distance from centre */
const parallax = () => {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-speed]'))
  if (!els.length) return () => {}
  let frame = 0
  const update = () => {
    frame = 0
    const vh = window.innerHeight
    els.forEach((el) => {
      const speed = num(el.dataset.speed, 1)
      if (speed === 1) return
      const current = num(el.dataset.parallaxY, 0)
      const rect = el.getBoundingClientRect()
      const centre = rect.top - current + rect.height / 2 - vh / 2
      const y = (speed - 1) * centre
      el.dataset.parallaxY = String(y)
      el.style.translate = `0 ${y.toFixed(1)}px`
    })
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (frame) cancelAnimationFrame(frame)
    els.forEach((el) => {
      el.style.translate = ''
      delete el.dataset.parallaxY
    })
  }
}

/** Start the engine for the current document; returns a cleanup function. */
export const startMotion = () => {
  const root = document.documentElement
  if (reducedMotion()) {
    root.classList.remove('motion-ready')
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        play(entry.target as HTMLElement)
      })
    },
    { rootMargin: TRIGGER_ROOT_MARGIN },
  )
  document
    .querySelectorAll<HTMLElement>(`[data-anim]:not([${DONE}])`)
    .forEach((el) => observer.observe(el))
  const stopParallax = parallax()
  root.classList.add('motion-started')

  return () => {
    observer.disconnect()
    stopParallax()
  }
}
