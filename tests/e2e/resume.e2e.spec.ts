import { expect, test } from '@playwright/test';

test('Resume has Projects section at the top of the second page', async ({
  page,
}) => {
  await page.goto('/resume');

  await page.waitForSelector('.resume-page-content');

  const pages = page.locator('.resume-page-content');

  const count = await pages.count();
  expect(count).toBeGreaterThanOrEqual(2);

  const secondPage = pages.nth(1);

  const projectsHeader = secondPage.locator('h2', { hasText: 'Projects' });

  await expect(projectsHeader).toBeVisible();

  const headerBox = await projectsHeader.boundingBox();
  const pageBox = await secondPage.boundingBox();

  if (headerBox && pageBox) {
    const relativeTop = headerBox.y - pageBox.y;
    console.log(`Projects header is at ${relativeTop}px from top of page 2`);

    expect(relativeTop).toBeLessThan(100);
    expect(relativeTop).toBeGreaterThan(40);
  }
});
