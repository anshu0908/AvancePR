const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.avancepr.in/faq', { waitUntil: 'networkidle2' });
  
  // Click all buttons
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, [class*="accordion"], summary'));
    btns.forEach(b => b.click());
  });
  await new Promise(r => setTimeout(r, 1500));
  
  const faqData = await page.evaluate(() => {
    const items = [];
    const elements = Array.from(document.querySelectorAll('div, section')).filter(el => {
      const h = el.querySelector('h3, h4, button, span');
      return h && h.innerText && h.innerText.includes('?');
    });
    return document.body.innerText;
  });

  fs.writeFileSync('research/faq-expanded.txt', faqData);
  await browser.close();
  console.log('FAQ expanded saved');
})();
