const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const p = await b.newPage();

  const b64 = fs.readFileSync('public/assets/ritika.backup.jpeg').toString('base64');
  await p.setContent('<canvas id="c"></canvas>');
  const rows = await p.evaluate((dataUri) => {
    return new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const out = [];
        for (let y = 730; y < 745; y++) {
          let avgR = 0, avgG = 0, avgB = 0;
          for (let x = 0; x < img.width; x++) {
            const idx = (y * img.width + x) * 4;
            avgR += imgData.data[idx];
            avgG += imgData.data[idx + 1];
            avgB += imgData.data[idx + 2];
          }
          out.push({ y, r: Math.round(avgR / img.width), g: Math.round(avgG / img.width), b: Math.round(avgB / img.width) });
        }
        res(out);
      };
      img.src = dataUri;
    });
  }, `data:image/jpeg;base64,${b64}`);

  console.log(rows);
  await b.close();
})();
