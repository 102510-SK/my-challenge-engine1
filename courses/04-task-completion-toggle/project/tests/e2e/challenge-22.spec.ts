import { test, expect } from '@playwright/test';

test.describe('Challenge 22: Data Fetching - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/22-data-fetching');
  });

  test('should show loading or list', async ({ page }) => {
    const loading = page.locator('#fetch-loading');
    const list = page.locator('#fetch-list');
    const err = page.locator('#fetch-error');
    await page.waitForTimeout(1500);
    const hasLoading = await loading.isVisible();
    const hasList = await list.isVisible();
    const hasError = await err.isVisible();
    expect(hasLoading || hasList || hasError).toBeTruthy();
  });

  test('should eventually show fetch-list when API succeeds', async ({ page }) => {
    await page.waitForSelector('#fetch-list', { timeout: 5000 }).catch(() => null);
    const list = page.locator('#fetch-list');
    await expect(list).toBeVisible({ timeout: 6000 });
  });
});
