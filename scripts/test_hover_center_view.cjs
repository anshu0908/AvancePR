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

  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('avancepr_cookie_consent', 'accepted_all');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Find the HostBooks row
  const hostbooksRow = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('a[href*="/work/hostbooks"]'));
    if (rows.length > 0) {
      rows[0].scrollIntoView({ behavior: 'instant', block: 'center' });
      return true;
    }
    return false;
  });
  console.log('Scrolled to HostBooks row:', hostbooksRow);
  await new Promise(r => setTimeout(r, 800));

  const row = await page.$('a[href*="/work/hostbooks"]');
  if (row) {
    const box = await row.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 20, box.y + 10);
      await new Promise(r => setTimeout(r, 200));
      await page.mouse.move(box.x + box.width * 0.45, box.y + box.height / 2, { steps: 10 });
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: 'research/hover_view_button_centered.png' });
      console.log('Saved research/hover_view_button_centered.png');
    }
  }

  await browser.close();
})();
