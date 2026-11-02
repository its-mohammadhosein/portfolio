import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    // Content-agnostic: the home page renders a top-level heading (Dyson or template content)
    await expect(page.locator('h1').first()).toBeVisible()
  })
})
