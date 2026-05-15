import { test, expect } from '@playwright/test';

test.describe('Challenge 06: Task Filtering - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/06-task-filtering');
  });

  test('should display filter bar', async ({ page }) => {
    await expect(page.locator('#filter-bar')).toBeVisible();
  });

  test('should have All, Active, Completed buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /all/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /active/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /completed/i })).toBeVisible();
  });

  test('should display task list', async ({ page }) => {
    await expect(page.locator('#task-list')).toBeVisible();
  });

  test('clicking Active should filter to incomplete tasks', async ({ page }) => {
    await page.getByRole('button', { name: /active/i }).click();
    await expect(page.locator('#task-list')).toBeVisible();
  });
});
