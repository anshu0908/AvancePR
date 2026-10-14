const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://www.avancepr.in';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
      if (targetUrl.startsWith('/')) targetUrl = `${BASE_URL}${targetUrl}`;
      else targetUrl = `${BASE_URL}/${targetUrl}`;
    }
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, targetUrl).href;
        }
        return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${targetUrl}`));
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
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error(`Timeout ${targetUrl}`));
    });
  });
}

async function runScraper() {
  ensureDir('public/assets');
  ensureDir('public/assets/images');
  ensureDir('public/assets/services');
  ensureDir('public/assets/clients');
  ensureDir('public/assets/work');
  ensureDir('public/assets/founder');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to homepage to scrape testimonials, services, clients, work...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 40000 });
  await new Promise(r => setTimeout(r, 2000));

  const pageData = await page.evaluate(() => {
    // 1. Logo
    const logoImg = document.querySelector('header img, nav img, img[alt*="logo" i], img[src*="logo" i]');
    const logoUrl = logoImg ? logoImg.src : null;

    // 2. All images on page
    const allImages = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      className: img.className
    }));

    // 3. Testimonials
    // Look for testimonial carousel or cards
    // The prompt mentions:
    // Biswajit Mishra, Amit Kumar, Swayam Agarwal, Lucky Rohilla, Samast Ahlawat, Pawan Matade, Abhinav Kalia, Major Prashant Veer Singh
    const textContent = document.body.innerText;

    // 4. Case studies
    const workLinks = Array.from(document.querySelectorAll('a[href*="/work/"]')).map(a => ({
      href: a.getAttribute('href'),
      fullHref: a.href,
      text: a.innerText.trim(),
      img: a.querySelector('img') ? a.querySelector('img').src : null
    }));

    // 5. Service links & images
    const serviceLinks = Array.from(document.querySelectorAll('a[href*="/services/"]')).map(a => ({
      href: a.getAttribute('href'),
      fullHref: a.href,
      text: a.innerText.trim(),
      img: a.querySelector('img') ? a.querySelector('img').src : null
    }));

    // 6. Client logos (often in a marquee or slider)
    const clientImages = Array.from(document.querySelectorAll('section, div'))
      .filter(el => (el.innerText || '').includes('Trusted by') || (el.className || '').includes('client') || (el.className || '').includes('brand'))
      .flatMap(el => Array.from(el.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt })));

    // 7. Video
    const video = document.querySelector('video source, video');
    const videoSrc = video ? (video.src || video.currentSrc) : null;

    return {
      logoUrl,
      allImages,
      workLinks,
      serviceLinks,
      clientImages,
      videoSrc,
      bodyText: textContent
    };
  });

  fs.writeFileSync('research/homepage-scraped.json', JSON.stringify(pageData, null, 2));
  console.log('Homepage scrape data saved.');

  // List of all 13 case studies:
  // Minimalist Hotel, Om Logistics, Stovekraft, HostBooks, Arc Electric, Amara.ai, Ayatiworks, Skills Caravan, Ramp Global, Uplifters, Aarika, Togopool, Prabhubhakti
  const caseStudiesList = [
    'minimalist-hotel',
    'om-logistics',
    'stovekraft',
    'hostbooks',
    'arc-electric',
    'amara-ai',
    'ayatiworks',
    'skills-caravan',
    'ramp-global',
    'uplifters',
    'aarika',
    'togopool',
    'prabhubhakti'
  ];

  const caseStudyDetails = [];
  for (const slug of caseStudiesList) {
    const caseUrl = `${BASE_URL}/work/${slug}`;
    console.log(`Scraping work page: ${caseUrl}`);
    try {
      const casePage = await browser.newPage();
      await casePage.goto(caseUrl, { waitUntil: 'networkidle2', timeout: 25000 });
      const details = await casePage.evaluate(() => {
        const title = document.querySelector('h1')?.innerText?.trim() || document.title;
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
        const images = Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt }));
        const tags = Array.from(document.querySelectorAll('span, badge, .tag, [class*="tag"]')).map(s => s.innerText.trim()).filter(t => t.length > 2 && t.length < 30);
        return {
          title,
          paragraphs,
          images,
          tags,
          fullText: document.body.innerText
        };
      });
      caseStudyDetails.push({ slug, url: caseUrl, ...details });
      await casePage.close();
    } catch (e) {
      console.log(`Failed or timed out on /work/${slug}: ${e.message}`);
      caseStudyDetails.push({ slug, url: caseUrl, error: e.message });
    }
  }

  fs.writeFileSync('research/case-studies-scraped.json', JSON.stringify(caseStudyDetails, null, 2));
  console.log('Case studies scraped successfully.');

  // Scrape all 6 services
  const servicesList = [
    'startup-pr',
    'influencer-marketing',
    'corporate-communication',
    'social-media-marketing',
    'crisis-management',
    'personal-branding'
  ];

  const serviceDetails = [];
  for (const slug of servicesList) {
    const sUrl = `${BASE_URL}/services/${slug}`;
    console.log(`Scraping service page: ${sUrl}`);
    try {
      const sPage = await browser.newPage();
      await sPage.goto(sUrl, { waitUntil: 'networkidle2', timeout: 25000 });
      const details = await sPage.evaluate(() => {
        const title = document.querySelector('h1')?.innerText?.trim() || document.title;
        const sub = document.querySelector('h2, .subtitle, p')?.innerText?.trim() || '';
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
        const images = Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt }));
        return { title, sub, paragraphs, images, fullText: document.body.innerText };
      });
      serviceDetails.push({ slug, url: sUrl, ...details });
      await sPage.close();
    } catch (e) {
      console.log(`Failed or timed out on /services/${slug}: ${e.message}`);
      serviceDetails.push({ slug, url: sUrl, error: e.message });
    }
  }

  fs.writeFileSync('research/services-scraped.json', JSON.stringify(serviceDetails, null, 2));
  console.log('Services scraped successfully.');

  // Download key known assets:
  const assetsToDownload = [
    { url: `${BASE_URL}/images/ritika.jpeg`, dest: 'public/assets/founder/ritika.jpeg' },
    { url: `${BASE_URL}/images/services/startup-pr.webp`, dest: 'public/assets/services/startup-pr.webp' },
    { url: `${BASE_URL}/images/services/influencer-marketing.webp`, dest: 'public/assets/services/influencer-marketing.webp' },
    { url: `${BASE_URL}/images/services/corporate-communication.webp`, dest: 'public/assets/services/corporate-communication.webp' },
    { url: `${BASE_URL}/images/services/social-media-marketing.webp`, dest: 'public/assets/services/social-media-marketing.webp' },
    { url: `${BASE_URL}/images/services/crisis-management.webp`, dest: 'public/assets/services/crisis-management.webp' },
    { url: `${BASE_URL}/images/services/personal-branding.webp`, dest: 'public/assets/services/personal-branding.webp' }
  ];

  console.log('\n--- Downloading Core Brand Assets ---');
  for (const asset of assetsToDownload) {
    try {
      await downloadFile(asset.url, asset.dest);
      console.log(`Successfully downloaded: ${asset.dest}`);
    } catch (e) {
      console.log(`Download notice for ${asset.url}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Scraper finished completely.');
}

runScraper().catch(console.error);
