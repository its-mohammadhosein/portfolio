import { gsap, ScrollSmoother, ScrollTrigger, SplitText } from './gsap'
import { ANCHOR_SCROLL, type PresetName, presets } from './presets'

/**
 * GSAP motion engine (P6). Same markup contract as the native engine (engine.ts):
 *   data-anim + data-anim-delay/-duration/-stagger, data-anim-text, data-anim-item,
 *   data-speed (parallax), data-pin (pinned while its parent scrolls past)
 * plus ScrollSmoother around #smooth-wrapper / #smooth-content when `smooth` is on.
 */

const DONE = 'data-anim-done'
const START = 'top 85%' // ScrollTrigger start used by the theme

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

const play = (el: HTMLElement) => {
  const s = settingsFor(el)
  if (!s) return
  el.setAttribute(DONE, '')
  const base = { duration: s.duration, ease: s.gsapEase }

  if (s.name === 'text-reveal' || s.name === 'chars') {
    const explicit = Array.from(el.querySelectorAll<HTMLElement>('[data-anim-text]'))
    const headings = Array.from(el.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))
    const targets = explicit.length ? explicit : headings.length ? headings : [el]
    let offset = 0
    targets.forEach((target) => {
      // text_reveal: SplitText lines/words/chars, from { y: 80, opacity: 0 } (wcf animations.js)
      const split = SplitText.create(target, {
        type: 'lines,words,chars',
        linesClass: 'anim-reveal-line',
        aria: 'auto',
      })
      gsap.from(split.chars, {
        ...base,
        y: s.y,
        opacity: 0,
        stagger: s.stagger,
        delay: s.delay + offset,
      })
      offset += split.chars.length * s.stagger
    })
    return
  }

  if (s.name === 'stagger') {
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-anim-item]'))
    const targets = items.length ? items : (Array.from(el.children) as HTMLElement[])
    gsap.from(targets, { ...base, y: s.y, opacity: 0, stagger: s.stagger, delay: s.delay })
    return
  }

  if (s.name === 'image-reveal') {
    const media = el.querySelector<HTMLElement>('img, video')
    if (media) {
      if (media.parentElement) gsap.set(media.parentElement, { overflow: 'hidden' })
      gsap.from(media, { ...base, scale: s.scale ?? 1.3, delay: s.delay })
    }
    return
  }

  // fade / fade-up: a section's content, not its background
  const targets = el.tagName === 'SECTION' ? (Array.from(el.children) as HTMLElement[]) : [el]
  gsap.from(targets, { ...base, y: s.y, opacity: 0, delay: s.delay })
}

/** ScrollSmoother `data-speed` semantics: offset = (speed - 1) × distance from the viewport centre */
const parallax = (el: HTMLElement) => {
  const speed = num(el.dataset.speed, 1)
  if (speed === 1) return
  const travel = () => (window.innerHeight + el.offsetHeight) / 2
  gsap.fromTo(
    el,
    { y: () => (speed - 1) * travel() },
    {
      y: () => -(speed - 1) * travel(),
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  )
}

/** `data-pin`: hold the element while its parent scrolls past (replaces CSS sticky) */
const pin = (el: HTMLElement) => {
  gsap.set(el, { position: 'relative', top: 'auto' })
  ScrollTrigger.create({
    trigger: el.parentElement ?? el,
    pin: el,
    pinSpacing: false,
    start: 'top top',
    end: () => `bottom ${el.offsetHeight}px`,
    invalidateOnRefresh: true,
  })
}

/** Same-page anchor links: easeInOutQuart, 1.5s, 80px header offset (brandberry-smooth-scroll.js) */
const onAnchorClick = (event: MouseEvent) => {
  const link = (event.target as Element | null)?.closest?.(
    'a[href*="#"]',
  ) as HTMLAnchorElement | null
  if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey) return
  const url = new URL(link.href, window.location.href)
  if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return
  const target = document.querySelector(decodeURIComponent(url.hash))
  if (!target) return
  event.preventDefault()
  gsap.to(window, {
    duration: ANCHOR_SCROLL.duration / 1000,
    ease: 'power3.inOut',
    scrollTo: { y: target, offsetY: ANCHOR_SCROLL.offset },
  })
  history.pushState(null, '', url.hash)
}

/** Start the engine for the current page; returns a cleanup function. */
export const startMotion = ({ smooth }: { smooth: boolean }) => {
  const root = document.documentElement
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('motion-ready')
    return () => {}
  }

  let smoother: ScrollSmoother | null = null
  // Created first and filled with add(): ScrollTrigger calls onEnter synchronously for elements
  // already in view, and that callback adds to this context.
  const ctx = gsap.context(() => {})
  ctx.add(() => {
    const wrapper = document.getElementById('smooth-wrapper')
    const content = document.getElementById('smooth-content')
    if (smooth && wrapper && content && !ScrollTrigger.isTouch) {
      smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: 1,
        effects: false, // parallax is handled per element below (same maths, works without smoothing)
        ignoreMobileResize: true,
      })
    }

    document.querySelectorAll<HTMLElement>('[data-speed]').forEach(parallax)
    document.querySelectorAll<HTMLElement>('[data-pin]').forEach(pin)

    document.querySelectorAll<HTMLElement>(`[data-anim]:not([${DONE}])`).forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: START,
        once: true,
        // Tweens/splits created later still belong to this context, so cleanup reverts them
        onEnter: () => ctx.add(() => play(el)),
      })
    })
  })

  root.classList.add('motion-started')
  document.addEventListener('click', onAnchorClick)
  // Images and fonts change layout after load
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  document.fonts?.ready.then(refresh).catch(() => {})

  return () => {
    document.removeEventListener('click', onAnchorClick)
    window.removeEventListener('load', refresh)
    ctx.revert()
    ;(smoother as ScrollSmoother | null)?.kill()
  }
}
