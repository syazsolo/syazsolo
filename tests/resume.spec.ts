import { test, expect } from '@playwright/test';

test('Resume has Projects section at the top of the second page', async ({ page }) => {
  // Navigate to the resume page
  await page.goto('/resume');

  // Wait for the resume content to be visible
  await page.waitForSelector('.resume-page-content');

  // Get all pages
  const pages = page.locator('.resume-page-content');
  
  // Expect at least 2 pages. 
  // Note: Depending on content length, it might be more, but we expect at least 2.
  const count = await pages.count();
  expect(count).toBeGreaterThanOrEqual(2);

  // Check the second page (index 1)
  const secondPage = pages.nth(1);
  
  // Check if "Projects" header is inside the second page
  // We look for the h2 with text "Projects"
  const projectsHeader = secondPage.locator('h2', { hasText: 'Projects' });
  
  // Verify it is visible
  await expect(projectsHeader).toBeVisible();
  
  // Verify it is near the top of the page
  const headerBox = await projectsHeader.boundingBox();
  const pageBox = await secondPage.boundingBox();
  
  if (headerBox && pageBox) {
    // The relative top position
    const relativeTop = headerBox.y - pageBox.y;
    console.log(`Projects header is at ${relativeTop}px from top of page 2`);
    
    // The padding is 15mm which is approx 56px (15 * 3.78).
    // So the header should be around 56px from the top.
    // We allow some margin for error/rendering differences.
    expect(relativeTop).toBeLessThan(100);
    expect(relativeTop).toBeGreaterThan(40); // Should be at least padding
  }
});
