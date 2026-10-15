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
  const backupPath = path.resolve('public/assets/ritika.backup.jpeg');
  const b64 = fs.readFileSync(backupPath).toString('base64');
  const dataUri = `data:image/jpeg;base64,${b64}`;

  const variations = [
    { name: 'v_natural_studio', contrast: 1.07, warmth: 1.025, unsharp: 0.8, fineSharp: 0.4 },
    { name: 'v_executive_hd', contrast: 1.11, warmth: 1.04, unsharp: 0.95, fineSharp: 0.55 },
    { name: 'v_vibrant_crisp', contrast: 1.14, warmth: 1.05, unsharp: 1.1, fineSharp: 0.65 }
  ];

  for (const v of variations) {
    const resB64 = await page.evaluate(async (dataUri, v) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Exact clean crop (skip 19px top bar, skip 20px bottom bar)
          const srcX = 0;
          const srcY = 19;
          const srcW = 720;
          const srcH = 718;

          // Target 4K resolution: 2160 x 2154
          const targetW = 2160;
          const targetH = Math.round(srcH * (targetW / srcW));

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetW, targetH);

          const imgData = ctx.getImageData(0, 0, targetW, targetH);
          const data = imgData.data;
          const len = data.length;

          // Color & Tonal Grading
          for (let i = 0; i < len; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            // Tonal curve
            r = ((r / 255 - 0.5) * v.contrast + 0.5) * 255;
            g = ((g / 255 - 0.5) * v.contrast + 0.5) * 255;
            b = ((b / 255 - 0.5) * v.contrast + 0.5) * 255;

            // Remove greenish cast & boost warm radiant undertones
            r = r * v.warmth + 2;
            g = g * 0.985;
            b = b * 0.98 + 1;

            // Deepen darks (hair, chair, desk) for luxury contrast
            if (r < 70 && g < 70 && b < 70) {
              r *= 0.93;
              g *= 0.93;
              b *= 0.93;
            }

            data[i] = Math.min(255, Math.max(0, r));
            data[i + 1] = Math.min(255, Math.max(0, g));
            data[i + 2] = Math.min(255, Math.max(0, b));
          }

          ctx.putImageData(imgData, 0, 0);

          // Multi-scale Unsharp Masking
          // Pass 1: Medium detail unsharp (blur 3px)
          const blur1Canvas = document.createElement('canvas');
          blur1Canvas.width = targetW;
          blur1Canvas.height = targetH;
          const b1Ctx = blur1Canvas.getContext('2d');
          b1Ctx.filter = 'blur(3px)';
          b1Ctx.drawImage(canvas, 0, 0);

          const sharp1 = ctx.getImageData(0, 0, targetW, targetH);
          const blur1 = b1Ctx.getImageData(0, 0, targetW, targetH);
          const s1 = sharp1.data;
          const b1 = blur1.data;

          for (let i = 0; i < len; i += 4) {
            s1[i] = Math.min(255, Math.max(0, s1[i] + (s1[i] - b1[i]) * v.unsharp));
            s1[i + 1] = Math.min(255, Math.max(0, s1[i + 1] + (s1[i + 1] - b1[i + 1]) * v.unsharp));
            s1[i + 2] = Math.min(255, Math.max(0, s1[i + 2] + (s1[i + 2] - b1[i + 2]) * v.unsharp));
          }
          ctx.putImageData(sharp1, 0, 0);

          // Pass 2: Fine detail micro-contrast (blur 1.2px)
          const blur2Canvas = document.createElement('canvas');
          blur2Canvas.width = targetW;
          blur2Canvas.height = targetH;
          const b2Ctx = blur2Canvas.getContext('2d');
          b2Ctx.filter = 'blur(1.2px)';
          b2Ctx.drawImage(canvas, 0, 0);

          const sharp2 = ctx.getImageData(0, 0, targetW, targetH);
          const blur2 = b2Ctx.getImageData(0, 0, targetW, targetH);
          const s2 = sharp2.data;
          const b2 = blur2.data;

          for (let i = 0; i < len; i += 4) {
            s2[i] = Math.min(255, Math.max(0, s2[i] + (s2[i] - b2[i]) * v.fineSharp));
            s2[i + 1] = Math.min(255, Math.max(0, s2[i + 1] + (s2[i + 1] - b2[i + 1]) * v.fineSharp));
            s2[i + 2] = Math.min(255, Math.max(0, s2[i + 2] + (s2[i + 2] - b2[i + 2]) * v.fineSharp));
          }
          ctx.putImageData(sharp2, 0, 0);

          resolve(canvas.toDataURL('image/jpeg', 0.97));
        };
        img.src = dataUri;
      });
    }, dataUri, v);

    const buf = Buffer.from(resB64.split(',')[1], 'base64');
    fs.writeFileSync(`research/ritika_${v.name}.jpg`, buf);
    console.log(`Generated research/ritika_${v.name}.jpg (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
})();
