// Motion QA (P6): SplitText output + ScrollSmoother on desktop vs touch, home page.
import { chromium } from '@playwright/test'
const browser = await chromium.launch()
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844, isMobile: true, hasTouch: true }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => m.type() === 'error' && errors.push(m.text() + ' ' + JSON.stringify(m.location())))
  await page.goto('http://127.0.0.1:3001/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)
  const r = await page.evaluate(() => {
    const t = document.querySelector('h1 [data-anim-text]')
    return {
      heroHtml: t?.innerHTML.slice(0, 220),
      heroLabel: t?.getAttribute('aria-label'),
      wrapperPos: getComputedStyle(document.getElementById('smooth-wrapper')).position,
      opacityHidden: Array.from(document.querySelectorAll('h1 [data-anim-text] div')).filter((d) => getComputedStyle(d).opacity !== '1').length,
    }
  })
  console.log(vp.width, JSON.stringify({ ...r, errors }))
  await ctx.close()
}
await browser.close()
