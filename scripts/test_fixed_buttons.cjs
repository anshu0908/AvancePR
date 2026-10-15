const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3001';

async function testButtons() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Desktop (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  const desktop = await page.evaluate(() => {
    const email = document.querySelector('a[aria-label*="email" i]');
    const wa = document.querySelector('a[aria-label*="whatsapp" i]');
    return {
      emailHref: email ? email.href : null,
      waHref: wa ? wa.href : null,
      emailRect: email ? email.getBoundingClientRect() : null,
      waRect: wa ? wa.getBoundingClientRect() : null,
      emailAria: email ? email.getAttribute('aria-label') : null,
      waAria: wa ? wa.getAttribute('aria-label') : null
    };
  });
  console.log('=== Desktop Fixed Buttons (1440x900) ===');
  console.log(JSON.stringify(desktop, null, 2));

  // Mobile (375x667)
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  const mobile = await page.evaluate(() => {
    const email = document.querySelector('a[aria-label*="email" i]');
    const wa = document.querySelector('a[aria-label*="whatsapp" i]');
    return {
      emailHref: email ? email.href : null,
      waHref: wa ? wa.href : null,
      emailRect: email ? email.getBoundingClientRect() : null,
      waRect: wa ? wa.getBoundingClientRect() : null,
      emailAria: email ? email.getAttribute('aria-label') : null,
      waAria: wa ? wa.getAttribute('aria-label') : null
    };
  });
  console.log('=== Mobile Fixed Buttons (375x667) ===');
  console.log(JSON.stringify(mobile, null, 2));

  await browser.close();
}

testButtons().catch(console.error);
