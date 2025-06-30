import { launchBrowser } from './utils/browser.ts';
import { loginWithGoogle } from './flows/loginWithGoogle.ts';
import { getMembers } from './automation/getMembers.ts';

(async () => {
  const browser = await launchBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();

  await loginWithGoogle(page, context);
  await getMembers(page);

  // await browser.close();
})();
