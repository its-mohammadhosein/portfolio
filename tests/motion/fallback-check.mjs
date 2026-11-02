// Motion QA (P6.10): reduced motion and no-JS keep all content visible.
import { chromium } from '@playwright/test'
const base = process.argv[2] || 'http://127.0.0.1:3001'
const browser = await chromium.launch()
for (const [name, opts] of [
  ['reduced-motion', { reducedMotion: 'reduce' }],
  ['no-js', { javaScriptEnabled: false }],
]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(base + '/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const r = await page.evaluate(() => {
    const anim = Array.from(document.querySelectorAll('[data-anim], [data-anim-text], [data-anim-item]'))
    return {
      motionReady: document.documentElement.classList.contains('motion-ready'),
      wrapperPos: getComputedStyle(document.getElementById('smooth-wrapper')).position,
      invisible: anim.filter((el) => getComputedStyle(el).opacity === '0').length,
      split: document.querySelectorAll('.anim-reveal-line, .split-char').length,
    }
  })
  console.log(name, JSON.stringify({ ...r, errors }))
  await ctx.close()
}
await browser.close()
