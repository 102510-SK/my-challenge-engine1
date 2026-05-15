import { test, expect } from '@playwright/test';

test.describe('Challenge 01: Static Task Display - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/challenge/01-static-task-display');
  });

  test('should display task list on the page', async ({ page }) => {
    const taskList = page.locator('#task-list');
    await expect(taskList).toBeVisible();
  });

  test('should display 3 tasks', async ({ page }) => {
    const cards = page.locator('#task-card');
    await expect(cards).toHaveCount(3);
  });

  test('should display task titles', async ({ page }) => {
    await expect(page.getByText('Task One')).toBeVisible();
    await expect(page.getByText('Task Two')).toBeVisible();
    await expect(page.getByText('Task Three')).toBeVisible();
  });

  test('should display task descriptions and priority', async ({ page }) => {
    await expect(page.getByText(/First hardcoded task/)).toBeVisible();
    await expect(page.getByText(/Priority: High/)).toBeVisible();
  });

  test('should have proper layout', async ({ page }) => {
    const section = page.locator('#task-list');
    const boundingBox = await section.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeGreaterThan(0);
  });
});
