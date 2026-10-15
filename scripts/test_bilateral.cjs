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
  
  const b64 = fs.readFileSync('public/assets/work/stovekraft.backup.png').toString('base64');
  const dataUri = `data:image/png;base64,${b64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; background:transparent;">
      <canvas id="c"></canvas>
      <script>
        window.__done = false;
        const img = new Image();
        img.onload = () => {
          const scale = 4; // 282x395 -> 1128x1580
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          
          const canvas = document.getElementById('c');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);
          
          const imgData = ctx.getImageData(0, 0, w, h);
          const data = imgData.data;
          const src = new Uint8ClampedArray(data);
          
          // Edge-preserving bilateral filter + smart contrast
          // Range sigma ~ 25, spatial radius = 2
          const radius = 2;
          const spatialWeights = [];
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              spatialWeights.push({ dx, dy, w: Math.exp(-(dx * dx + dy * dy) / (2 * 1.5 * 1.5)) });
            }
          }

          // Sample corners to know background color
          const bgR = src[0];
          const bgG = src[1];
          const bgB = src[2];

          for (let y = radius; y < h - radius; y++) {
            for (let x = radius; x < w - radius; x++) {
              const idx = (y * w + x) * 4;
              const r0 = src[idx];
              const g0 = src[idx + 1];
              const b0 = src[idx + 2];
              
              let sumW = 0;
              let sumR = 0;
              let sumG = 0;
              let sumB = 0;

              for (const sw of spatialWeights) {
                const nIdx = ((y + sw.dy) * w + (x + sw.dx)) * 4;
                const nr = src[nIdx];
                const ng = src[nIdx + 1];
                const nb = src[nIdx + 2];

                const colorDistSq = (r0 - nr) ** 2 + (g0 - ng) ** 2 + (b0 - nb) ** 2;
                // Range weight (bilateral: only blend if similar color to remove noise)
                const rangeW = Math.exp(-colorDistSq / (2 * 28 * 28));
                const totalW = sw.w * rangeW;

                sumW += totalW;
                sumR += nr * totalW;
                sumG += ng * totalW;
                sumB += nb * totalW;
              }

              let filteredR = sumR / sumW;
              let filteredG = sumG / sumW;
              let filteredB = sumB / sumW;

              // Unsharp edge enhancement: calculate high-frequency difference
              const diffR = r0 - filteredR;
              const diffG = g0 - filteredG;
              const diffB = b0 - filteredB;
              const edgeMagnitude = Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);

              if (edgeMagnitude > 10) {
                // True edge (letters, logo, border): sharpen cleanly
                filteredR = r0 + diffR * 0.9;
                filteredG = g0 + diffG * 0.9;
                filteredB = b0 + diffB * 0.9;
              }

              // Pure white boost: if circle or white lettering, clean to crisp white
              const lum = 0.299 * filteredR + 0.587 * filteredG + 0.114 * filteredB;
              if (lum > 220) {
                const whiteBoost = (lum - 220) / 35;
                filteredR = Math.min(255, filteredR + (255 - filteredR) * whiteBoost * 0.7);
                filteredG = Math.min(255, filteredG + (255 - filteredG) * whiteBoost * 0.7);
                filteredB = Math.min(255, filteredB + (255 - filteredB) * whiteBoost * 0.7);
              }

              data[idx] = Math.min(255, Math.max(0, Math.round(filteredR)));
              data[idx + 1] = Math.min(255, Math.max(0, Math.round(filteredG)));
              data[idx + 2] = Math.min(255, Math.max(0, Math.round(filteredB)));
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
  await page.waitForFunction(() => window.__done === true, { timeout: 30000 });

  const canvas = await page.$('#c');
  const testOut = 'C:/Users/ANSHU/.gemini/antigravity-ide/brain/663c46fd-c90b-4eb0-895d-451e2bf8b6b9/stovekraft_bilateral.png';
  await canvas.screenshot({ path: testOut, type: 'png' });
  await browser.close();
  console.log('Saved enhanced test to:', testOut);
})();
