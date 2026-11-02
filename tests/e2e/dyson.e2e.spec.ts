import { test, expect } from '@playwright/test'

/**
 * Dyson site checks (P9.1): every migrated route renders with its key content and without
 * console errors. Needs the Dyson seed (`pnpm seed:dyson`) in the database.
 */
const BASE = process.env.E2E_BASE_URL || 'http://localhost:3000'

const routes: { path: string; text: (string | RegExp)[] }[] = [
  { path: '/', text: ['Scroll to explore', 'Creative Excellence', 'Awwwards', 'All Projects'] },
  { path: '/work', text: ['Reimagining Reality', 'Visual Symphony'] },
  { path: '/about', text: ['Services', /Work\s+experience/i, 'Head of Design', 'Download CV'] },
  { path: '/contact', text: ['welcome@rckydayson.com', 'Your email', 'Submit'] },
  { path: '/projects/the-first-brand', text: ['Overview', '@2024', 'View Online', 'Discover'] },
  { path: '/projects/medium-scene', text: ['Medium Scene', 'Branding / Design'] },
  { path: '/posts', text: ['Posts'] },
]

for (const { path, text } of routes) {
  test(`renders ${path}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

    const response = await page.goto(BASE + path, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1').first()).toBeAttached()
    const body = await page.locator('body').innerText()
    for (const t of text) expect(body).toMatch(typeof t === 'string' ? new RegExp(t, 'i') : t)
    // Header + footer on every page
    await expect(page.locator('header nav[aria-label="Main"]')).toBeAttached()
    await expect(page.locator('footer')).toContainText(/Back to top/i)
    expect(errors).toEqual([])
  })
}

test('/projects redirects to /work', async ({ page }) => {
  await page.goto(BASE + '/projects')
  await expect(page).toHaveURL(/\/work$/)
})

test('unknown pages return the 404 page', async ({ page }) => {
  const response = await page.goto(BASE + '/definitely-not-a-page')
  expect(response?.status()).toBe(404)
  await expect(page.locator('h1')).toHaveText('404')
})
