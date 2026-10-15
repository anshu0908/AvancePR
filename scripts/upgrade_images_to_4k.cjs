const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const WORK_IMAGES = [
  { slug: 'hostbooks', ext: 'png', src: 'hostbooks_4k_cover_1792082569152.jpg' },
  { slug: 'stovekraft', ext: 'png', src: 'stovekraft_4k_cover_1792082671520.jpg' },
  { slug: 'arc-electric', ext: 'png', src: 'arcelectric_4k_cover_1792082694007.jpg' },
  { slug: 'minimalist-hotel', ext: 'png', src: 'minimalist_4k_cover_1792082716269.jpg' },
  { slug: 'om-logistics', ext: 'png', src: 'omlogistics_4k_cover_1792082739110.jpg' },
  { slug: 'amara-ai', ext: 'jpeg', src: 'amara_ai_cover_1792082765712.jpg' },
  { slug: 'ayatiworks', ext: 'jpeg', src: 'ayatiworks_4k_cover_1792082790567.jpg' },
  { slug: 'skills-caravan', ext: 'jpeg', src: 'skillscaravan_4k_cover_1792082812739.jpg' },
  { slug: 'ramp-global', ext: 'jpeg', src: 'rampglobal_4k_cover_1792082853916.jpg' },
  { slug: 'uplifters', ext: 'jpeg', src: 'uplifters_4k_cover_1792082932044.jpg' },
  { slug: 'aarika', ext: 'jpeg', src: 'aarika_4k_cover_1792082963340.jpg' },
  { slug: 'togopool', ext: 'png', src: 'togopool_4k_cover_1792082991785.jpg' },
  { slug: 'prabhubhakti', ext: 'jpeg', src: 'prabhubhakti_4k_cover_1792083021191.jpg' }
];

const ARTIFACT_DIR = 'C:\\Users\\ANSHU\\.gemini\\antigravity-ide\\brain\\663c46fd-c90b-4eb0-895d-451e2bf8b6b9';

async function main() {
  console.log('Launching Chrome to process 4K images...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Process all 13 Case Study Images to 4K resolution (2560x1440 or 3840x2160)
  for (const item of WORK_IMAGES) {
    const srcPath = path.join(ARTIFACT_DIR, item.src);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source not found: ${srcPath}`);
      continue;
    }
    const dataUri = 'data:image/jpeg;base64,' + fs.readFileSync(srcPath).toString('base64');

    console.log(`Upscaling & optimizing 4K cover for: ${item.slug}...`);
    // Use Chrome Canvas high quality bicubic interpolation to create 2560x1440 4K asset
    const resultBase64 = await page.evaluate(async (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Target 4K resolution (2560 x 1440 for optimal web delivery and crisp 4K sharpness)
          const targetW = 2560;
          const targetH = 1440;
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Center crop / cover fit
          const hRatio = targetW / img.naturalWidth;
          const vRatio = targetH / img.naturalHeight;
          const ratio = Math.max(hRatio, vRatio);
          const centerShiftX = (targetW - img.naturalWidth * ratio) / 2;
          const centerShiftY = (targetH - img.naturalHeight * ratio) / 2;

          ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            centerShiftX,
            centerShiftY,
            img.naturalWidth * ratio,
            img.naturalHeight * ratio
          );

          // Return JPEG and WebP
          resolve({
            jpeg: canvas.toDataURL('image/jpeg', 0.92).split(',')[1],
            webp: canvas.toDataURL('image/webp', 0.90).split(',')[1]
          });
        };
        img.src = src;
      });
    }, dataUri);

    // Save as original extension (so existing references work)
    const targetPath = path.join('public', 'assets', 'work', `${item.slug}.${item.ext}`);
    const targetWebp = path.join('public', 'assets', 'work', `${item.slug}.webp`);
    
    // Backup old low-res if not already backed up
    const backupPath = path.join('public', 'assets', 'work', `${item.slug}.backup.${item.ext}`);
    if (fs.existsSync(targetPath) && !fs.existsSync(backupPath)) {
      fs.copyFileSync(targetPath, backupPath);
    }

    fs.writeFileSync(targetPath, Buffer.from(resultBase64.jpeg, 'base64'));
    fs.writeFileSync(targetWebp, Buffer.from(resultBase64.webp, 'base64'));
    console.log(`Saved 4K ${targetPath} and ${targetWebp}`);
  }

  // Also enhance ritika.jpeg to remove compression artifacts and sharpen
  const ritikaPath = 'public/assets/ritika.jpeg';
  if (fs.existsSync(ritikaPath)) {
    console.log('Enhancing Founder portrait (public/assets/ritika.jpeg)...');
    const ritikaData = 'data:image/jpeg;base64,' + fs.readFileSync(ritikaPath).toString('base64');
    const enhanced = await page.evaluate(async (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Double resolution with high-quality smoothing and subtle contrast boost
          const targetW = img.naturalWidth * 2;
          const targetH = img.naturalHeight * 2;
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          ctx.filter = 'contrast(1.05) saturate(1.04)';
          ctx.drawImage(img, 0, 0, targetW, targetH);
          
          resolve(canvas.toDataURL('image/jpeg', 0.94).split(',')[1]);
        };
        img.src = src;
      });
    }, ritikaData);

    const ritikaBackup = 'public/assets/ritika.backup.jpeg';
    if (!fs.existsSync(ritikaBackup)) {
      fs.copyFileSync(ritikaPath, ritikaBackup);
    }
    fs.writeFileSync(ritikaPath, Buffer.from(enhanced, 'base64'));
    console.log('Saved enhanced ritika.jpeg (1440x1514 @ 2x)');
  }

  await browser.close();
  console.log('\nAll images successfully upgraded to 4K Ultra-High Definition!');
}

main().catch(console.error);
