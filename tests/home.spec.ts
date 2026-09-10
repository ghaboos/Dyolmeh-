import { test, expect } from '@playwright/test';

test('home page loads without console errors and exposes the main sections', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/#top', { waitUntil: 'networkidle' });
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.getByRole('link', { name: 'DD2' })).toBeVisible();
  await expect(page.locator('#about')).toBeAttached();
  await expect(page.locator('#work')).toBeAttached();
  await expect(page.locator('#showcase')).toBeAttached();
  await expect(page.locator('#contact')).toBeAttached();
  await expect(page.locator('canvas')).toHaveCount(1);

  expect(pageErrors, `page errors: ${pageErrors.join('\n')}`).toEqual([]);
  expect(consoleErrors, `console errors: ${consoleErrors.join('\n')}`).toEqual([]);
});

test('page has no horizontal overflow', async ({ page }) => {
  await page.goto('/#top', { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
});

test('navigation targets work', async ({ page }) => {
  await page.goto('/#top', { waitUntil: 'networkidle' });
  for (const target of ['about', 'work', 'contact']) {
    await page.locator(`a[href="#${target}"]`).first().click();
    await expect(page.locator(`#${target}`)).toBeVisible();
  }
});

test('mobile layout keeps nav usable and hides desktop cursor', async ({ page }) => {
  await page.goto('/#top', { waitUntil: 'networkidle' });
  await expect(page.locator('.navlinks')).toBeHidden();
  await expect(page.locator('.cursor-glow')).toBeHidden();
  await expect(page.locator('.status')).toBeHidden();
  await expect(page.locator('.brand')).toBeVisible();
});
