import { test, expect } from '@playwright/test';

test.describe('Challenge 07: Priority-Based Sorting - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/07-priority-based-sorting');
  });

  test('should display task list', async ({ page }) => {
    await expect(page.locator('#task-list')).toBeVisible();
  });

  test('should display tasks', async ({ page }) => {
    const cards = page.locator('#task-card');
    await expect(cards.first()).toBeVisible();
  });
});
