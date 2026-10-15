const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Desktop Full Page
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  
  // Close cookie banner if present to see content cleanly
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ACCEPT ALL'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: 'research/audit_shots/desktop_home_full.png', fullPage: true });
  console.log('Saved desktop_home_full.png');

  // Mobile Full Page (390px)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('ACCEPT ALL'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'research/audit_shots/mobile_home_full.png', fullPage: true });
  console.log('Saved mobile_home_full.png');

  // Contact Page Desktop & Mobile
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/contact', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'research/audit_shots/desktop_contact_full.png', fullPage: true });
  console.log('Saved desktop_contact_full.png');

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3001/contact', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'research/audit_shots/mobile_contact_full.png', fullPage: true });
  console.log('Saved mobile_contact_full.png');

  await browser.close();
  console.log('Screenshots captured successfully.');
}

run().catch(console.error);
