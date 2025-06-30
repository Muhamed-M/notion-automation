// src/utils/browser.ts
import { chromium, Browser } from 'playwright';

export async function launchBrowser(headless = false): Promise<Browser> {
  return await chromium.launch({
    headless,
    args: ['--start-maximized'],
  });
}
