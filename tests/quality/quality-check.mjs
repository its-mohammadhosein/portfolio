// Quality QA (P9.2 / P9.3): Web Vitals (LCP, CLS) and basic accessibility checks per page.
// Lighthouse could not be installed (registry too slow, see migration/LOG.md); this measures the
// same core signals with the browser's own APIs.
// Usage: node tests/quality/quality-check.mjs http://127.0.0.1:3001 / /about ...
import { chromium } from '@playwright/test'

const base = process.argv[2] || 'http://127.0.0.1:3001'
const paths = process.argv.slice(3)
const browser = await chromium.launch()

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.addInitScript(() => {
    window.__vitals = { cls: 0, lcp: 0 }
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__vitals.cls += e.value
    }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1)
      if (last) window.__vitals.lcp = last.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  })
  await page.goto(base + path, { waitUntil: 'networkidle' })
  // Scroll through so reveal animations and lazy media run (they must not shift layout)
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 700) {
    await page.mouse.wheel(0, 700)
    await page.waitForTimeout(100)
  }
  await page.waitForTimeout(1500)

  const report = await page.evaluate(() => {
    const visible = (el) => {
      const s = getComputedStyle(el)
      return s.display !== 'none' && s.visibility !== 'hidden' && !el.closest('[aria-hidden="true"]')
    }
    const name = (el) =>
      (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '').trim() ||
      el.querySelector('img[alt]:not([alt=""]), svg[aria-label]')
    const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(visible)
    const levels = headings.map((h) => Number(h.tagName[1]))
    const skips = levels
      .map((l, i) => (i > 0 && l - levels[i - 1] > 1 ? `h${levels[i - 1]}→h${l}` : null))
      .filter(Boolean)
    return {
      lcpMs: Math.round(window.__vitals.lcp),
      cls: Number(window.__vitals.cls.toFixed(3)),
      lang: document.documentElement.lang,
      title: document.title,
      metaDescription: Boolean(document.querySelector('meta[name="description"]')?.content),
      h1Count: headings.filter((h) => h.tagName === 'H1').length,
      headingSkips: skips,
      imgNoAlt: Array.from(document.images).filter((i) => !i.hasAttribute('alt')).length,
      unnamedLinks: Array.from(document.querySelectorAll('a[href]')).filter((a) => visible(a) && !name(a)).length,
      unnamedButtons: Array.from(document.querySelectorAll('button')).filter((b) => visible(b) && !name(b)).length,
    }
  })
  console.log(path, JSON.stringify(report))
  await page.close()
}
await browser.close()
