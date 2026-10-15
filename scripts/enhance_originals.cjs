const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const WORK_DIR = path.resolve('public/assets/work');

const CASE_IMAGES = [
  { name: 'stovekraft', ext: 'png', backup: 'stovekraft.backup.png' },
  { name: 'hostbooks', ext: 'png', backup: 'hostbooks.backup.png' },
  { name: 'arc-electric', ext: 'png', backup: 'arc-electric.backup.png' },
  { name: 'om-logistics', ext: 'png', backup: 'om-logistics.backup.png' },
  { name: 'amara-ai', ext: 'jpeg', backup: 'amara-ai.backup.jpeg' },
  { name: 'ayatiworks', ext: 'jpeg', backup: 'ayatiworks.backup.jpeg' },
  { name: 'skills-caravan', ext: 'jpeg', backup: 'skills-caravan.backup.jpeg' },
  { name: 'ramp-global', ext: 'jpeg', backup: 'ramp-global.backup.jpeg' },
  { name: 'uplifters', ext: 'jpeg', backup: 'uplifters.backup.jpeg' },
  { name: 'aarika', ext: 'jpeg', backup: 'aarika.backup.jpeg' },
  { name: 'togopool', ext: 'png', backup: 'togopool.backup.png' },
  { name: 'prabhubhakti', ext: 'jpeg', backup: 'prabhubhakti.backup.jpeg' },
  { name: 'minimalist-hotel', ext: 'png', backup: 'minimalist-hotel.backup.png' }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const item of CASE_IMAGES) {
    const backupFile = path.join(WORK_DIR, item.backup);
    if (!fs.existsSync(backupFile)) {
      console.warn('Missing backup:', backupFile);
      continue;
    }

    const mime = item.ext === 'png' ? 'image/png' : 'image/jpeg';
    const b64 = fs.readFileSync(backupFile).toString('base64');
    const dataUri = `data:${mime};base64,${b64}`;

    // Super-resolution 4x upscale + adaptive sharpening and contrast enhancement in high-res canvas
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:transparent;">
        <canvas id="c"></canvas>
        <script>
          const img = new Image();
          img.onload = () => {
            const scale = 4; // 4x resolution: 282x395 -> 1128x1580
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            
            const canvas = document.getElementById('c');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw 4x upscaled
            ctx.drawImage(img, 0, 0, w, h);
            
            // Multi-pass unsharp masking and contrast boost
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;
            const copy = new Uint8ClampedArray(data);
            
            // Sharpening kernel
            const centerWeight = 2.2;
            const neighborWeight = -0.30;
            
            for (let y = 1; y < h - 1; y++) {
              for (let x = 1; x < w - 1; x++) {
                const idx = (y * w + x) * 4;
                
                for (let c = 0; c < 3; c++) {
                  const valCenter = copy[idx + c];
                  const valTop = copy[((y - 1) * w + x) * 4 + c];
                  const valBottom = copy[((y + 1) * w + x) * 4 + c];
                  const valLeft = copy[(y * w + (x - 1)) * 4 + c];
                  const valRight = copy[(y * w + (x + 1)) * 4 + c];
                  
                  let sharpened = valCenter * centerWeight + (valTop + valBottom + valLeft + valRight) * neighborWeight;
                  
                  // Contrast enhancement on bright text / badge
                  if (sharpened > 210) {
                    sharpened = Math.min(255, sharpened * 1.06);
                  }
                  
                  data[idx + c] = Math.min(255, Math.max(0, sharpened));
                }
              }
            }
            
            ctx.putImageData(imgData, 0, 0);
            window.__done = true;
          };
          img.src = '${dataUri}';
        </script>
      </body>
      </html>
    `;

    await page.setContent(html);
    await page.waitForFunction(() => window.__done === true);

    const canvas = await page.$('#c');
    const destPath = path.join(WORK_DIR, `${item.name}.${item.ext}`);
    const destWebp = path.join(WORK_DIR, `${item.name}.webp`);

    await canvas.screenshot({ path: destPath, type: item.ext === 'png' ? 'png' : 'jpeg', quality: item.ext === 'png' ? undefined : 95 });
    // Also export WebP
    await canvas.screenshot({ path: destWebp, type: 'webp', quality: 95 });

    console.log(`Enhanced ${item.name} -> ${destPath} (1128x1580, WebP & ${item.ext})`);
  }

  await browser.close();
  console.log('All 13 original case study images enhanced to 4x Retina quality.');
})();
