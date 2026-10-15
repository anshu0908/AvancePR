const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  // Set localStorage to dismiss cookie banner
  await page.goto('http://localhost:3001/work', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('avancepr_cookie_consent', 'accepted');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  
  // Scroll down so Hover list rows are clearly in view
  await page.evaluate(() => {
    window.scrollTo({ top: 350, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));

  // Find hostbooks row link and hover
  const rows = await page.$$('a[href*="/work/hostbooks"]');
  if (rows.length > 0) {
    const box = await rows[0].boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 800));
    }
  }
  await page.screenshot({ path: 'research/audit_shots/hover_list_4k_active.png' });
  console.log('Saved research/audit_shots/hover_list_4k_active.png');

  await browser.close();
})();
