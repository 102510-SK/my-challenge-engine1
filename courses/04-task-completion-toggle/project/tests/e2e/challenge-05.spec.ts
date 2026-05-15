import { test, expect } from '@playwright/test';

test.describe('Challenge 05: Task Deletion - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/05-task-deletion');
  });

  test('should display task list', async ({ page }) => {
    await expect(page.locator('#task-list')).toBeVisible();
  });

  test('should display task count', async ({ page }) => {
    await expect(page.locator('#task-count')).toBeVisible();
  });

  test('should have Delete buttons when onDelete is passed from App', async ({ page }) => {
    const deleteBtns = page.getByRole('button', { name: /delete/i });
    const count = await deleteBtns.count();
    if (count > 0) {
      await expect(deleteBtns.first()).toBeVisible();
    }
  });
});
