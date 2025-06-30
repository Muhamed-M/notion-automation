import { launchBrowser } from './utils/browser.js';
import { loginWithGoogle } from './flows/loginWithGoogle.js';
import { getMembers } from './automation/getMembers.js';
import { retry } from './utils/retry.js';
import { MemberService } from './database/memberService.js';

async function main() {
  let browser;

  try {
    console.log('🚀 Starting Notion automation...');

    // Launch browser with retry
    browser = await retry(() => launchBrowser(), { maxAttempts: 3, delay: 2000 });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Login with retry
    console.log('🔐 Logging in to Notion...');
    await retry(() => loginWithGoogle(page, context), { maxAttempts: 2, delay: 3000 });

    // Get members with retry
    console.log('👥 Extracting member data...');
    const result = await retry(() => getMembers(page), { maxAttempts: 2, delay: 2000 });

    // Save members to database
    try {
      console.log('💾 Saving members to database...');
      await MemberService.saveMembers(result.members);
      console.log('✅ Members saved to database successfully');
    } catch (error) {
      console.error('❌ Failed to save members to database:', error);
    }

    console.log('✅ Automation completed successfully!');
    console.log(`📊 Extracted ${result.totalCount} members`);
  } catch (error) {
    console.error('❌ Automation failed:', error);
    process.exit(1);
  } finally {
    // Ensure browser is always closed
    if (browser) {
      console.log('🧹 Cleaning up browser resources...');
      await browser.close();
    }
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();
