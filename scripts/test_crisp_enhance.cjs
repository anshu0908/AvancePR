const puppeteer = require('puppeteer-core');
const fs = require('fs');

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
          const scale = 4;
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
          const orig = new Uint8ClampedArray(data);

          // Find dominant background color from borders
          let bgRSum = 0, bgGSum = 0, bgBSum = 0, count = 0;
          for (let x = 0; x < w; x += 10) {
            // top and bottom borders
            const iTop = (0 * w + x) * 4;
            const iBot = ((h - 1) * w + x) * 4;
            bgRSum += orig[iTop] + orig[iBot];
            bgGSum += orig[iTop + 1] + orig[iBot + 1];
            bgBSum += orig[iTop + 2] + orig[iBot + 2];
            count += 2;
          }
          const bgR = bgRSum / count;
          const bgG = bgGSum / count;
          const bgB = bgBSum / count;

          // 2-pass:
          // Pass 1: Compute blurred version for background smoothing
          const blurred = new Uint8ClampedArray(orig.length);
          const kRad = 2;
          for (let y = kRad; y < h - kRad; y++) {
            for (let x = kRad; x < w - kRad; x++) {
              let r = 0, g = 0, b = 0, wSum = 0;
              for (let dy = -kRad; dy <= kRad; dy++) {
                for (let dx = -kRad; dx <= kRad; dx++) {
                  const idx = ((y + dy) * w + (x + dx)) * 4;
                  r += orig[idx];
                  g += orig[idx + 1];
                  b += orig[idx + 2];
                  wSum++;
                }
              }
              const oIdx = (y * w + x) * 4;
              blurred[oIdx] = r / wSum;
              blurred[oIdx + 1] = g / wSum;
              blurred[oIdx + 2] = b / wSum;
            }
          }

          // Pass 2: Selective edge contrast and clean background
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const idx = (y * w + x) * 4;
              const r = orig[idx];
              const g = orig[idx + 1];
              const b = orig[idx + 2];

              // Distance to background
              const bgDist = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);
              
              // Luminance
              const lum = 0.299 * r + 0.587 * g + 0.114 * b;

              // High-frequency detail (original minus blur)
              const highR = r - blurred[idx];
              const highG = g - blurred[idx + 1];
              const highB = b - blurred[idx + 2];
              const highMag = Math.sqrt(highR * highR + highG * highG + highB * highB);

              if (bgDist < 25 && lum < 150) {
                // Background pixel: use smoothed color to kill JPEG artifacts
                data[idx] = Math.round(blurred[idx]);
                data[idx + 1] = Math.round(blurred[idx + 1]);
                data[idx + 2] = Math.round(blurred[idx + 2]);
              } else {
                // Text, logo, badge, or flourish
                let outR = r;
                let outG = g;
                let outB = b;

                // Sharpen text edges cleanly
                if (highMag > 2) {
                  outR = r + highR * 1.25;
                  outG = g + highG * 1.25;
                  outB = b + highB * 1.25;
                }

                // If it's the white badge (circle) or white text, boost purity
                if (lum > 200) {
                  const boost = (lum - 200) / 55;
                  outR = Math.min(255, outR * (1 - boost * 0.2) + 255 * (boost * 0.2));
                  outG = Math.min(255, outG * (1 - boost * 0.2) + 255 * (boost * 0.2));
                  outB = Math.min(255, outB * (1 - boost * 0.2) + 255 * (boost * 0.2));
                }

                // If it's crisp dark text in the white circle (like the Stovekraft logo text)
                if (lum < 90 && bgDist > 60) {
                  outR = Math.max(0, outR * 0.85);
                  outG = Math.max(0, outG * 0.85);
                  outB = Math.max(0, outB * 0.85);
                }

                data[idx] = Math.min(255, Math.max(0, Math.round(outR)));
                data[idx + 1] = Math.min(255, Math.max(0, Math.round(outG)));
                data[idx + 2] = Math.min(255, Math.max(0, Math.round(outB)));
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
  await page.waitForFunction(() => window.__done === true, { timeout: 30000 });

  const canvas = await page.$('#c');
  const testOut = 'C:/Users/ANSHU/.gemini/antigravity-ide/brain/663c46fd-c90b-4eb0-895d-451e2bf8b6b9/stovekraft_crisp.png';
  await canvas.screenshot({ path: testOut, type: 'png' });
  await browser.close();
  console.log('Saved crisp enhanced test to:', testOut);
})();
