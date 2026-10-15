const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Check initial opacity of words
  const initialOpacities = await page.evaluate(() => {
    const words = document.querySelectorAll('.scrub-word');
    return Array.from(words).slice(0, 5).map(w => window.getComputedStyle(w).opacity);
  });
  console.log('Initial word opacities (first 5):', initialOpacities);

  // Capture screenshots at different scroll points to visually verify
  for (const scrollY of [200, 450, 650, 950]) {
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, scrollY);
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `research/scroll_scrub_${scrollY}.png` });
    console.log(`Saved research/scroll_scrub_${scrollY}.png`);
  }

  await browser.close();
})();
