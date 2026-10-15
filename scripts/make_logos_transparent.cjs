const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function processLogos() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  for (let i = 1; i <= 7; i++) {
    const filename = `logo${i}.png`;
    const filePath = path.join('public', 'assets', 'clients', filename);
    if (!fs.existsSync(filePath)) continue;

    const dataUrl = `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`;

    const transparentBase64 = await page.evaluate(async (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          // Replace near-white background pixels with transparent
          for (let p = 0; p < data.length; p += 4) {
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            
            // Check if pixel is near white
            if (r > 235 && g > 235 && b > 235) {
              data[p + 3] = 0; // Alpha = 0
            } else if (r > 200 && g > 200 && b > 200) {
              // Smooth feathering
              const factor = (255 - Math.max(r, g, b)) / 55;
              data[p + 3] = Math.round(data[p + 3] * Math.max(0, Math.min(1, factor)));
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = src;
      });
    }, dataUrl);

    const base64Data = transparentBase64.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    console.log(`Made ${filename} transparent!`);
  }

  await browser.close();
  console.log('All client logos processed successfully.');
}

processLogos().catch(console.error);
