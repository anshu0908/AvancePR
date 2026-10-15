const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  // 1. Copy enhanced image to public assets
  const srcJpg = path.resolve('research/ritika_v_executive_hd.jpg');
  fs.copyFileSync(srcJpg, 'public/assets/ritika.jpeg');
  console.log('Copied to public/assets/ritika.jpeg');

  // Convert to WebP using Chrome canvas
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('public/assets/ritika.jpeg').toString('base64');
  const webpB64 = await page.evaluate((dataUri) => {
    return new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        res(c.toDataURL('image/webp', 0.95));
      };
      img.src = dataUri;
    });
  }, `data:image/jpeg;base64,${b64}`);

  const webpBuf = Buffer.from(webpB64.split(',')[1], 'base64');
  fs.writeFileSync('public/assets/ritika.webp', webpBuf);
  console.log('Saved public/assets/ritika.webp');

  // 2. Capture screenshot of Founder section on localhost:3001
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('avancepr_cookie_consent', 'accepted_all');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to founder section
  await page.evaluate(() => {
    const el = document.querySelector('img[alt="Ritika Garg"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: 'research/founder_section_verified.png' });
  console.log('Saved research/founder_section_verified.png');

  // Also capture close-up of portrait card
  const card = await page.$('.lg\\:col-span-5');
  if (card) {
    await card.screenshot({ path: 'research/founder_card_verified.png' });
    console.log('Saved research/founder_card_verified.png');
  }

  // Capture About page
  await page.goto('http://localhost:3001/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'research/about_page_founder_verified.png' });
  console.log('Saved research/about_page_founder_verified.png');

  await browser.close();
})();
