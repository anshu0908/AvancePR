const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  // Set cookie consent so banner is dismissed
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => {
    localStorage.setItem('avancepr_cookie_consent', 'accepted_all');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Screenshot Homepage with 3D Fanned Deck
  await page.evaluate(() => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Click "3D Fanned Deck" button
  const fannedBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.innerText.includes('3D Fanned Deck'));
    if (b) { b.click(); return true; }
    return false;
  });
  console.log('Clicked 3D Fanned Deck:', fannedBtn);
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'test_home_fanned_deck.png' });

  // 2. Switch back to Hover List and hover over first item to capture floating preview
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.innerText.includes('Interactive Hover List'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Hover over the first case study row
  const firstRow = await page.$('a[href*="/work/"]');
  if (firstRow) {
    const box = await firstRow.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'test_home_hover_preview.png' });

  // 3. Screenshot /work page with Archive Grid
  await page.goto('http://localhost:3001/work', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.innerText.includes('Archive Grid'));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'test_work_archive_grid.png' });

  // 4. Screenshot /work/stovekraft detail page
  await page.goto('http://localhost:3001/work/stovekraft', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'test_case_detail_stovekraft.png' });

  await browser.close();
  console.log('All verification screenshots saved successfully.');
})();
