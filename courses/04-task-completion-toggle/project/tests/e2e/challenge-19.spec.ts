import { test, expect } from '@playwright/test';

test.describe('Challenge 19: Performance Optimization - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/19-performance-optimization');
  });

  test('should display task list', async ({ page }) => {
    await expect(page.locator('#task-list')).toBeVisible();
  });
});
