import { expect, test, type Page } from '@playwright/test';

async function openResume(page: Page) {
  await page.goto('/resume');
  await page.waitForSelector('.resume-page-content');
}

test('Resume renders as a single page', async ({ page }) => {
  await openResume(page);

  const pages = page.locator('.resume-page-content');

  const count = await pages.count();
  expect(count).toBe(1);
});

test('Resume shows active round 4 sections and projects', async ({ page }) => {
  await openResume(page);

  const pages = page.locator('.resume-page-content');
  const resumePage = pages.nth(0);

  await expect(
    resumePage.locator('h2', { hasText: 'Experience' })
  ).toBeVisible();
  await expect(
    resumePage.locator('h2', { hasText: 'Projects' })
  ).toBeVisible();
  await expect(resumePage.getByText('Collective Chess')).toBeVisible();
  await expect(resumePage.getByText('Bigcampus', { exact: true })).toBeVisible();
  await expect(resumePage.locator('h2', { hasText: 'Skills' })).toBeVisible();
  await expect(
    resumePage.locator('h2', { hasText: 'Education' })
  ).toBeVisible();
});

test('Resume does not render empty project URLs', async ({ page }) => {
  await openResume(page);

  await expect(page.locator('a[href="https://null"]')).toHaveCount(0);
});
