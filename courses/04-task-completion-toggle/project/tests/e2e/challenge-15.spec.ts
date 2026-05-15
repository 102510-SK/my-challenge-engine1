import { test, expect } from '@playwright/test';

test.describe('Challenge 15: Component Organization - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/15-component-organization');
  });

  test('should display task list', async ({ page }) => {
    await expect(page.locator('#task-list')).toBeVisible();
  });
});
