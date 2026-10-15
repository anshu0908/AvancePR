const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';

const VIEWPORTS = [
  { name: '320px_small_mobile', width: 320, height: 640 },
  { name: '375px_standard_mobile', width: 375, height: 667 },
  { name: '390px_iphone14', width: 390, height: 844 },
  { name: '430px_large_phone', width: 430, height: 932 },
  { name: '768px_tablet', width: 768, height: 1024 },
  { name: '1024px_small_laptop', width: 1024, height: 768 },
  { name: '1280px_standard_laptop', width: 1280, height: 800 },
  { name: '1440px_desktop', width: 1440, height: 900 },
  { name: '1920px_large_display', width: 1920, height: 1080 }
];

const ROUTES = [
  '/',
  '/about',
  '/work',
  '/services/startup-pr',
  '/work/hostbooks',
  '/blogs',
  '/faq',
  '/contact'
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function audit() {
  await ensureDir('research/audit_shots');
  
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const consoleLogs = [];
  const networkErrors = [];

  const page = await browser.newPage();
  
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      consoleLogs.push({ type, text, location: msg.location() });
    }
  });

  page.on('requestfailed', request => {
    networkErrors.push({
      url: request.url(),
      errorText: request.failure()?.errorText
    });
  });

  console.log('\n=== Testing Routes ===');
  const routeResults = {};

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`Checking ${url}...`);
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));
      
      const status = response ? response.status() : 'no response';
      
      // Check title and broken images
      const pageData = await page.evaluate(() => {
        const title = document.title;
        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          isBroken: img.naturalWidth === 0
        }));
        const brokenImages = images.filter(i => i.isBroken);
        const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;

        return {
          title,
          totalImages: images.length,
          brokenImages,
          hasHorizontalScroll,
          scrollWidth,
          clientWidth
        };
      });

      routeResults[route] = { status, ...pageData };
    } catch (err) {
      routeResults[route] = { error: err.message };
    }
  }

  console.log('\n=== Testing Viewports on Home Page ===');
  const viewportResults = {};

  for (const vp of VIEWPORTS) {
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));

    const vpData = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const innerWidth = window.innerWidth;
      const hasOverflow = scrollWidth > clientWidth;
      
      // Find elements that overflow
      let overflowingElements = [];
      if (hasOverflow) {
        const all = document.querySelectorAll('*');
        for (let el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > clientWidth + 2) {
            overflowingElements.push({
              tag: el.tagName,
              className: el.className?.toString().substring(0, 80),
              right: rect.right,
              clientWidth
            });
            if (overflowingElements.length >= 5) break;
          }
        }
      }

      return {
        scrollWidth,
        clientWidth,
        innerWidth,
        hasOverflow,
        overflowingElements
      };
    });

    const shotPath = `research/audit_shots/home_${vp.name}.png`;
    await page.screenshot({ path: shotPath, fullPage: false });
    
    viewportResults[vp.name] = { ...vpData, screenshot: shotPath };
  }

  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    consoleLogs,
    networkErrors,
    routeResults,
    viewportResults
  };

  fs.writeFileSync('research/local_audit_results.json', JSON.stringify(report, null, 2));
  console.log('\nAudit complete! Saved to research/local_audit_results.json');
}

audit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
