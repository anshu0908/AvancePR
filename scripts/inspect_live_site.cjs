const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://avance-pr.vercel.app/', { waitUntil: 'networkidle2', timeout: 35000 });
  
  const siteInfo = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas')).map(c => ({
      width: c.width,
      height: c.height,
      className: c.className,
      id: c.id,
      parent: c.parentElement ? c.parentElement.tagName + '.' + c.parentElement.className : null
    }));
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src).filter(Boolean);
    const bodyChildren = Array.from(document.body.children).map(el => ({
      tag: el.tagName,
      id: el.id,
      className: el.className
    }));
    
    return { canvases, scripts, bodyChildren };
  });

  console.log('Live site inspection:');
  console.log(JSON.stringify(siteInfo, null, 2));
  await browser.close();
}

main().catch(console.error);
