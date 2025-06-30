import { Page } from 'playwright';
import { MemberExtractionResult } from '../types/Member';

export async function getMembers(page: Page): Promise<MemberExtractionResult> {
  // Step 1: Go to members/settings page
  // Open workspace members modal
  const button = page.getByRole('button', { name: 'Settings', exact: true });
  await button.waitFor({ state: 'visible' });
  await button.click();

  // wait for modal to open
  await page.waitForSelector('.notion-space-settings', { timeout: 10000 });

  // click on people tab
  const peopleTab = page.getByRole('tab', { name: 'People' });
  await peopleTab.waitFor({ state: 'visible' });
  await peopleTab.click();

  // click on members tab
  const membersTab = page.getByRole('tab', { name: 'Members' });
  await membersTab.waitFor({ state: 'visible' });
  await membersTab.click();

  // Step 2: Wait for DOM elements and ensure all members are loaded
  await page.waitForSelector('div[data-index]', { timeout: 10000 });

  // Wait for members to load and stabilize
  let previousCount = 0;
  let stableCount = 0;

  // Poll until member count is stable for at least 2 checks
  while (stableCount < 2) {
    await page.waitForTimeout(1000);

    const currentCount = await page.evaluate(() => {
      return document.querySelectorAll('div[data-index]').length;
    });

    if (currentCount === previousCount && currentCount > 0) {
      stableCount++;
    } else {
      stableCount = 0;
    }

    previousCount = currentCount;

    // Prevent infinite loop
    if (stableCount === 0 && previousCount === 0) {
      break;
    }
  }

  // Wait for network to be idle to ensure all member data is loaded
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {
    // Continue if network idle times out
    console.log('Network idle timeout, continuing...');
  });

  // Step 3: Extract member data
  const members = await page.evaluate(() => {
    // Find all member rows using data-index attribute
    const memberRows = document.querySelectorAll('div[data-index]');

    return Array.from(memberRows)
      .map((row) => {
        // Find the user info container
        const userInfoContainer = row.querySelector('div[style*="max-width: 163px"]');

        if (!userInfoContainer) {
          return { name: 'Unknown', email: 'Unknown', role: 'Unknown' };
        }

        // Extract name - first div with title and font-weight: 510
        const nameElement = userInfoContainer.querySelector('div[title][style*="font-weight: 510"]');
        const name = nameElement?.getAttribute('title')?.trim() || nameElement?.textContent?.trim() || 'Unknown';

        // Extract email - second div with title and font-size: 12px
        const emailElement = userInfoContainer.querySelector('div[title][style*="font-size: 12px"]');
        const email = emailElement?.getAttribute('title')?.trim() || emailElement?.textContent?.trim() || 'Unknown';

        // Extract role - it's in a span with class="notranslate"
        const roleElement = row.querySelector('span.notranslate');
        const role = roleElement?.textContent?.trim() || 'Unknown';

        return {
          name,
          email,
          role,
        };
      })
      .filter((member) => member.name !== 'Unknown' && member.email !== 'Unknown');
  });

  // Step 4: Take screenshot of loaded members
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `members-screenshot-${timestamp}.png`,
    fullPage: true,
  });
  console.log(`Screenshot saved as: members-screenshot-${timestamp}.png`);

  // Step 5: Prepare results
  const result: MemberExtractionResult = {
    members,
    totalCount: members.length,
    timestamp: new Date().toISOString(),
  };

  console.log('Found members:', result);
  return result;
}
