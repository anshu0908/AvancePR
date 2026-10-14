const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://www.avancepr.in';

const URLS = [
  { name: 'home', url: `${BASE_URL}/` },
  { name: 'about', url: `${BASE_URL}/about` },
  { name: 'contact', url: `${BASE_URL}/contact` },
  { name: 'faq', url: `${BASE_URL}/faq` },
  { name: 'blogs', url: `${BASE_URL}/blogs` },
  { name: 'service-startup-pr', url: `${BASE_URL}/services/startup-pr` },
  { name: 'work-hostbooks', url: `${BASE_URL}/work/hostbooks` },
  { name: 'work-stovekraft', url: `${BASE_URL}/work/stovekraft` }
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (!url.startsWith('http')) {
      if (url.startsWith('/')) url = `${BASE_URL}${url}`;
      else url = `${BASE_URL}/${url}`;
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      ensureDir(path.dirname(destPath));
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
    });
    req.on('error', (err) => reject(err));
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  await ensureDir('research');
  await ensureDir('public/assets');
  await ensureDir('public/assets/images');
  await ensureDir('public/assets/services');
  await ensureDir('public/assets/clients');
  await ensureDir('public/assets/work');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const auditData = {
    computedStyles: {},
    colors: new Set(),
    fonts: new Set(),
    testimonials: [],
    caseStudies: [],
    services: [],
    faq: [],
    blogs: [],
    assetsFound: [],
    meta: {}
  };

  try {
    for (const item of URLS) {
      console.log(`\n--- Auditing ${item.name} (${item.url}) ---`);
      const page = await browser.newPage();
      
      // Desktop Screenshot (1440)
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 35000 }).catch(e => console.log('Goto warning:', e.message));
      await new Promise(r => setTimeout(r, 2000)); // wait for transitions/images
      
      const desktopShotPath = path.join('research', `desktop-${item.name}.png`);
      await page.screenshot({ path: desktopShotPath, fullPage: true });
      console.log(`Saved desktop screenshot: ${desktopShotPath}`);

      // Extract styles and content while on desktop
      const pageInfo = await page.evaluate(() => {
        const getStyle = (el, prop) => el ? window.getComputedStyle(el).getPropertyValue(prop) : null;
        
        // Sample elements
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          tag: h.tagName.toLowerCase(),
          text: h.innerText.trim(),
          fontFamily: getStyle(h, 'font-family'),
          fontSize: getStyle(h, 'font-size'),
          fontWeight: getStyle(h, 'font-weight'),
          color: getStyle(h, 'color'),
          lineHeight: getStyle(h, 'line-height'),
          letterSpacing: getStyle(h, 'letter-spacing')
        }));

        const buttons = Array.from(document.querySelectorAll('button, a.btn, a[class*="btn"], a[class*="button"], a[class*="cta"]')).map(b => ({
          text: b.innerText.trim(),
          backgroundColor: getStyle(b, 'background-color'),
          color: getStyle(b, 'color'),
          borderRadius: getStyle(b, 'border-radius'),
          fontFamily: getStyle(b, 'font-family'),
          padding: getStyle(b, 'padding')
        }));

        const body = document.body;
        const bodyStyle = {
          fontFamily: getStyle(body, 'font-family'),
          backgroundColor: getStyle(body, 'background-color'),
          color: getStyle(body, 'color')
        };

        // Images
        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          currentSrc: img.currentSrc,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        }));

        // Videos
        const videos = Array.from(document.querySelectorAll('video, video source')).map(v => v.src || v.currentSrc);

        // All text elements color sample
        const allColorElements = Array.from(document.querySelectorAll('*'));
        const colors = new Set();
        const fonts = new Set();
        for (const el of allColorElements) {
          const style = window.getComputedStyle(el);
          const c = style.color;
          const bg = style.backgroundColor;
          const bc = style.borderColor;
          const ff = style.fontFamily;
          if (c && c !== 'rgba(0, 0, 0, 0)') colors.add(c);
          if (bg && bg !== 'rgba(0, 0, 0, 0)') colors.add(bg);
          if (bc && bc !== 'rgba(0, 0, 0, 0)') colors.add(bc);
          if (ff) fonts.add(ff);
        }

        return {
          title: document.title,
          headings,
          buttons,
          bodyStyle,
          images,
          videos,
          colors: Array.from(colors),
          fonts: Array.from(fonts),
          innerHTML: document.body.innerText
        };
      });

      auditData.computedStyles[item.name] = pageInfo;
      pageInfo.colors.forEach(c => auditData.colors.add(c));
      pageInfo.fonts.forEach(f => auditData.fonts.add(f));

      // Mobile Screenshot (390)
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
      await new Promise(r => setTimeout(r, 1000));
      const mobileShotPath = path.join('research', `mobile-${item.name}.png`);
      await page.screenshot({ path: mobileShotPath, fullPage: true });
      console.log(`Saved mobile screenshot: ${mobileShotPath}`);

      await page.close();
    }

    // Now detailed crawl of Home page for testimonials, clients, case studies
    console.log('\n--- Deep scraping Home and Work pages ---');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 35000 });

    const homeDetails = await page.evaluate(() => {
      // Find testimonials
      // Look for cards or quotes
      const allText = document.body.innerText;
      return { allText };
    });

    // Save gathered data
    const output = {
      auditSummary: {
        uniqueFonts: Array.from(auditData.fonts),
        uniqueColors: Array.from(auditData.colors),
        pagesAudited: URLS.map(u => u.name)
      },
      pageStyles: auditData.computedStyles
    };

    fs.writeFileSync('research/raw-audit-data.json', JSON.stringify(output, null, 2));
    console.log('Saved raw-audit-data.json successfully.');

  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    await browser.close();
  }
}

run();
