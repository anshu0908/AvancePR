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

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    let targetUrl = fileUrl;
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
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error(`Timeout ${targetUrl}`));
    });
  });
}

const CASE_STUDIES = [
  { id: '12', slug: 'minimalist-hotel', client: 'Minimalist Hotel', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Minimalist.png', localImg: 'public/assets/work/minimalist-hotel.png' },
  { id: '11', slug: 'om-logistics', client: 'Om Logistics', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Om_logistics.png', localImg: 'public/assets/work/om-logistics.png' },
  { id: '13', slug: 'stovekraft', client: 'Stovekraft', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/StoveKraft.png', localImg: 'public/assets/work/stovekraft.png' },
  { id: '9', slug: 'hostbooks', client: 'HostBooks', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Hostbooks_case_study.png', localImg: 'public/assets/work/hostbooks.png' },
  { id: '10', slug: 'arc-electric', client: 'Arc Electric', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Arc-electric.png', localImg: 'public/assets/work/arc-electric.png' },
  { id: '2', slug: 'amara-ai', client: 'Amara.ai', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Amara.jpeg', localImg: 'public/assets/work/amara-ai.jpeg' },
  { id: '3', slug: 'ayatiworks', client: 'Ayatiworks', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Ayati-works.jpeg', localImg: 'public/assets/work/ayatiworks.jpeg' },
  { id: '4', slug: 'skills-caravan', client: 'Skills Caravan', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Skill-Carvan.jpeg', localImg: 'public/assets/work/skills-caravan.jpeg' },
  { id: '5', slug: 'ramp-global', client: 'Ramp Global', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Ramp-Global.jpeg', localImg: 'public/assets/work/ramp-global.jpeg' },
  { id: '6', slug: 'uplifters', client: 'Uplifters', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Uplifters.jpeg', localImg: 'public/assets/work/uplifters.jpeg' },
  { id: '7', slug: 'aarika', client: 'Aarika', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Aarika-Innovations.jpeg', localImg: 'public/assets/work/aarika.jpeg' },
  { id: '8', slug: 'togopool', client: 'Togopool', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Togopool_case_Study.png', localImg: 'public/assets/work/togopool.png' },
  { id: '1', slug: 'prabhubhakti', client: 'Prabhubhakti', imgUrl: 'https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_work/Prabhu-bhakti.jpeg', localImg: 'public/assets/work/prabhubhakti.jpeg' }
];

const CORE_ASSETS = [
  { url: `${BASE_URL}/Logo-modified.png`, dest: 'public/assets/logo.png' },
  { url: `${BASE_URL}/images/ritika.jpeg`, dest: 'public/assets/ritika.jpeg' },
  { url: `${BASE_URL}/images/services/pr-for-startup.webp`, dest: 'public/assets/services/startup-pr.webp' },
  { url: `${BASE_URL}/images/services/influencer-marketing.webp`, dest: 'public/assets/services/influencer-marketing.webp' },
  { url: `${BASE_URL}/images/services/corporate-communication.webp`, dest: 'public/assets/services/corporate-communication.webp' },
  { url: `${BASE_URL}/images/services/social-media-marketing.webp`, dest: 'public/assets/services/social-media-marketing.webp' },
  { url: `${BASE_URL}/images/services/crisis-management.webp`, dest: 'public/assets/services/crisis-management.webp' },
  { url: `${BASE_URL}/images/services/personal-branding.webp`, dest: 'public/assets/services/personal-branding.webp' }
];

async function main() {
  ensureDir('public/assets');
  ensureDir('public/assets/services');
  ensureDir('public/assets/work');
  ensureDir('public/assets/clients');
  ensureDir('research');

  console.log('--- 1. DOWNLOADING CORE ASSETS ---');
  for (const item of CORE_ASSETS) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded core asset: ${item.dest}`);
    } catch (e) {
      console.log(`Notice on core asset ${item.url}: ${e.message}`);
    }
  }

  console.log('\n--- 2. DOWNLOADING CASE STUDY IMAGES ---');
  for (const cs of CASE_STUDIES) {
    try {
      await downloadFile(cs.imgUrl, cs.localImg);
      console.log(`Downloaded case study image: ${cs.localImg}`);
    } catch (e) {
      console.log(`Notice on case study ${cs.slug}: ${e.message}`);
    }
  }

  console.log('\n--- 3. DOWNLOADING CLIENT LOGOS FROM SUPABASE ---');
  for (let i = 1; i <= 24; i++) {
    const clientUrl = `https://iozlwjjzupvwmfwysscx.supabase.co/storage/v1/object/public/avancepr_media/our_client/logo${i}.png`;
    const dest = `public/assets/clients/logo${i}.png`;
    try {
      await downloadFile(clientUrl, dest);
      console.log(`Downloaded client logo: ${dest}`);
    } catch (e) {
      // not all numbers may exist, ignore 404s
    }
  }

  console.log('\n--- 4. SCRAPING CASE STUDY DETAIL CONTENT ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const scrapedCaseStudies = [];
  for (const cs of CASE_STUDIES) {
    const pageUrl = `${BASE_URL}/work/${cs.id}`;
    console.log(`Opening ${pageUrl} for ${cs.client}...`);
    try {
      const page = await browser.newPage();
      await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise(r => setTimeout(r, 1000));
      const content = await page.evaluate(() => {
        const h1 = document.querySelector('h1')?.innerText?.trim() || '';
        const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim());
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
        return {
          h1,
          h2s,
          paragraphs,
          fullText: document.body.innerText
        };
      });
      scrapedCaseStudies.push({
        id: cs.id,
        slug: cs.slug,
        client: cs.client,
        localImage: cs.localImg,
        ...content
      });
      await page.close();
    } catch (e) {
      console.log(`Error on /work/${cs.id}: ${e.message}`);
      scrapedCaseStudies.push({
        id: cs.id,
        slug: cs.slug,
        client: cs.client,
        localImage: cs.localImg,
        error: e.message
      });
    }
  }

  fs.writeFileSync('research/case-studies-full.json', JSON.stringify(scrapedCaseStudies, null, 2));
  console.log('Saved case-studies-full.json');

  console.log('\n--- 5. SCRAPING FAQ & BLOGS CONTENT ---');
  try {
    const faqPage = await browser.newPage();
    await faqPage.goto(`${BASE_URL}/faq`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    const faqData = await faqPage.evaluate(() => document.body.innerText);
    fs.writeFileSync('research/faq-text.txt', faqData);
    await faqPage.close();

    const blogsPage = await browser.newPage();
    await blogsPage.goto(`${BASE_URL}/blogs`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    const blogsData = await blogsPage.evaluate(() => {
      const articles = Array.from(document.querySelectorAll('a[href*="/blogs/"], article, .blog-card, [class*="blog"]')).map(el => ({
        text: el.innerText.trim(),
        href: el.getAttribute('href')
      }));
      return {
        articles,
        fullText: document.body.innerText
      };
    });
    fs.writeFileSync('research/blogs-data.json', JSON.stringify(blogsData, null, 2));
    await blogsPage.close();
  } catch (e) {
    console.log(`Notice on FAQ/Blogs scrape: ${e.message}`);
  }

  await browser.close();
  console.log('\nAll assets and content successfully processed!');
}

main().catch(console.error);
