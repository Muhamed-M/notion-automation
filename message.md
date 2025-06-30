## Potential Concerns

If there are many members and pagination is involved, this script will currently fail. I tested it with only three members. However, this can be easily addressed with a bit more time and effort.

I didn’t encounter any rate limiting from Notion or Google during testing, but it’s likely to happen if the automation is run frequently. Based on my experience, I would recommend using a service like ScraperAPI to rotate IPs and distribute requests across a pool of machines.

## What I Learned

1. **How to properly structure a browser automation project.**  
   In the past, for example with my Instagram scraper, I handled everything in a single file using Puppeteer, which quickly became messy. This time, I built a clean, modular structure that is easy to work with and navigate.

2. **First experience with Playwright.**  
   This was my first time using Playwright, having previously worked with Puppeteer and Cheerio for automation and scraping. I learned how to quickly and easily set up a Playwright project using the CLI. While working with Playwright, I noticed the experience was much smoother than with Puppeteer, and I now understand why:

   - **Built-in auto-waiting**: Playwright automatically waits for elements to be visible, enabled, and stable before interacting, which significantly reduces flakiness.
   - **Modern architecture**: Playwright was developed after Puppeteer by the same team, addressing many of Puppeteer’s original limitations.

3. **Faster selector identification using AI.**  
   I learned how to quickly identify the selectors I needed using AI, instead of manually inspecting them in the browser console.
