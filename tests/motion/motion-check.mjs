// Motion QA (P6): load pages in Chromium, scroll through, report the GSAP engine state per page.
// Usage: node tests/motion/motion-check.mjs http://127.0.0.1:3001 / /about ... (needs a running app)
import { chromium } from '@playwright/test'

const base = process.argv[2] || 'http://127.0.0.1:3001'
const paths = process.argv.slice(3)
const browser = await chromium.launch()

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(base + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const before = await page.evaluate(() => ({
    started: document.documentElement.classList.contains('motion-started'),
    smoother: Boolean(window.ScrollSmoother?.get?.()) || getComputedStyle(document.getElementById('smooth-wrapper')).position === 'fixed',
    anims: document.querySelectorAll('[data-anim]').length,
    chars: document.querySelectorAll('.anim-reveal-line').length,
  }))
  // Scroll through the page in steps so every ScrollTrigger fires
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= height; y += 600) {
    await page.mouse.wheel(0, 600)
    await page.waitForTimeout(120)
  }
  await page.waitForTimeout(2500)
  const after = await page.evaluate(() => {
    const anims = Array.from(document.querySelectorAll('[data-anim]'))
    const hidden = anims.filter((el) => !el.hasAttribute('data-anim-done'))
    const parallax = Array.from(document.querySelectorAll('[data-speed]')).map(
      (el) => getComputedStyle(el).transform,
    )
    return {
      done: anims.length - hidden.length,
      notDone: hidden.slice(0, 3).map((el) => `${el.tagName}.${el.className.slice(0, 40)}`),
      splitLines: document.querySelectorAll('.anim-reveal-line').length,
      parallaxMoved: parallax.filter((t) => t && t !== 'none').length + '/' + parallax.length,
      pins: document.querySelectorAll('.pin-spacer, [data-pin][style*="position"]').length,
    }
  })
  console.log(path, JSON.stringify({ ...before, ...after, errors: errors.slice(0, 3) }))
  await page.close()
}
await browser.close()
