const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the page
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait for hero section to be visible
  await page.waitForSelector('#hero', { timeout: 30000 });

  // Wait a bit for animations to settle
  await page.waitForTimeout(2000);

  const screenshotsDir = path.join(__dirname, 'screenshots');

  // Create screenshots directory if it doesn't exist
  const fs = require('fs');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Desktop viewport (1920x1080)
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(screenshotsDir, 'hero-desktop-full.png'),
    fullPage: false
  });

  // Take screenshot of just the hero section
  const heroElement = await page.$('#hero');
  await heroElement.screenshot({
    path: path.join(screenshotsDir, 'hero-desktop.png')
  });

  // Laptop viewport (1366x768)
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.waitForTimeout(500);
  const heroLaptop = await page.$('#hero');
  await heroLaptop.screenshot({
    path: path.join(screenshotsDir, 'hero-laptop.png')
  });

  // Tablet viewport (768x1024)
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  const heroTablet = await page.$('#hero');
  await heroTablet.screenshot({
    path: path.join(screenshotsDir, 'hero-tablet.png')
  });

  // Mobile viewport (375x667)
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  const heroMobile = await page.$('#hero');
  await heroMobile.screenshot({
    path: path.join(screenshotsDir, 'hero-mobile.png')
  });

  console.log('Screenshots saved to:', screenshotsDir);
  console.log('- hero-desktop-full.png (1920x1080 full page)');
  console.log('- hero-desktop.png (1920x1080 hero section)');
  console.log('- hero-laptop.png (1366x768)');
  console.log('- hero-tablet.png (768x1024)');
  console.log('- hero-mobile.png (375x667)');

  await browser.close();
})();
