const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Test enhancing stovekraft.backup.png
  const inputPath = path.resolve('public/assets/work/stovekraft.backup.png').replace(/\\/g, '/');
  const base64Data = fs.readFileSync('public/assets/work/stovekraft.backup.png').toString('base64');
  const mime = 'image/png';
  const dataUri = `data:${mime};base64,${base64Data}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: transparent; overflow: hidden; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.onload = () => {
          const scale = 4;
          const origW = img.naturalWidth;
          const origH = img.naturalHeight;
          const targetW = origW * scale; // 1128
          const targetH = origH * scale; // 1580
          
          const canvas = document.getElementById('c');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw upscaled
          ctx.drawImage(img, 0, 0, targetW, targetH);
          
          // Apply intelligent unsharp mask sharpening to restore edge crispness
          const imgData = ctx.getImageData(0, 0, targetW, targetH);
          const data = imgData.data;
          
          // Copy for convolution
          const copy = new Uint8ClampedArray(data);
          
          // Simple 3x3 sharpening kernel
          // [  0, -0.4,  0 ]
          // [ -0.4, 2.6, -0.4 ]
          // [  0, -0.4,  0 ]
          const kCenter = 2.4;
          const kSide = -0.35;
          
          for (let y = 1; y < targetH - 1; y++) {
            for (let x = 1; x < targetW - 1; x++) {
              const idx = (y * targetW + x) * 4;
              
              for (let c = 0; c < 3; c++) {
                const center = copy[idx + c];
                const top = copy[((y - 1) * targetW + x) * 4 + c];
                const bottom = copy[((y + 1) * targetW + x) * 4 + c];
                const left = copy[(y * targetW + (x - 1)) * 4 + c];
                const right = copy[(y * targetW + (x + 1)) * 4 + c];
                
                const val = center * kCenter + (top + bottom + left + right) * kSide;
                data[idx + c] = Math.min(255, Math.max(0, val));
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
  
  const canvasElement = await page.$('#c');
  await canvasElement.screenshot({ path: 'research/stovekraft-enhanced-test.png' });
  console.log('Saved research/stovekraft-enhanced-test.png');

  await browser.close();
})();
