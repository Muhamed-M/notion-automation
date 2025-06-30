import { Page, BrowserContext } from 'playwright';
import { GOOGLE_EMAIL, GOOGLE_PASSWORD } from '../config/credentials';
import { CONFIG } from '../config/settings';

export async function loginWithGoogle(page: Page, context: BrowserContext): Promise<void> {
  try {
    // Step 1: Navigate to Notion
    await page.goto('https://www.notion.so/login');

    // Step 2: Click "Continue with Google"
    // Wait for popup on click
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: 'Continue with Google' }).click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    // Step 3: Handle Google auth popup or flow
    // Enter email
    await popup.getByLabel('Email or phone').fill(GOOGLE_EMAIL);
    await popup.getByRole('button', { name: 'Next' }).click();

    // Wait for password input
    await popup.getByLabel('Enter your password').waitFor({ timeout: 10000 });
    await popup.getByLabel('Enter your password').fill(GOOGLE_PASSWORD);
    await popup.getByRole('button', { name: 'Next' }).click();

    // Wait for popup to close and return to main page
    await popup.waitForEvent('close', { timeout: 15000 });

    // Step 4: Wait for Notion workspace to load
    await page.waitForURL(/.*notion\.so\/.*/, { timeout: 15000 });

    // Wait for the main workspace UI to be ready
    await page.waitForSelector('[data-testid="notion-topbar"]', { timeout: CONFIG.TIMEOUTS.ELEMENT_WAIT }).catch(() =>
      // Fallback: wait for any navigation element that indicates workspace loaded
      page.waitForSelector('nav, [role="navigation"]', { timeout: CONFIG.TIMEOUTS.ELEMENT_WAIT })
    );
  } catch (error) {
    console.error('Login failed:', error);

    // Take screenshot for debugging
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await page.screenshot({ path: `login-error-${timestamp}.png`, fullPage: true });
      console.log(`Error screenshot saved: login-error-${timestamp}.png`);
    } catch (screenshotError) {
      console.error('Failed to take error screenshot:', screenshotError);
    }

    throw new Error(`Google login failed: ${error}`);
  }
}
