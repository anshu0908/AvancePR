const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const p = await b.newPage();

  const b64 = fs.readFileSync('public/assets/ritika.jpeg').toString('base64');
  await p.setContent(`<img src="data:image/jpeg;base64,${b64}" id="i" />`);
  const dims = await p.evaluate(() => {
    const img = document.getElementById('i');
    return { w: img.naturalWidth, h: img.naturalHeight };
  });
  console.log('ritika.jpeg dimensions:', dims);

  if (fs.existsSync('public/assets/ritika.backup.jpeg')) {
    const b64b = fs.readFileSync('public/assets/ritika.backup.jpeg').toString('base64');
    await p.setContent(`<img src="data:image/jpeg;base64,${b64b}" id="ib" />`);
    const dimsb = await p.evaluate(() => {
      const img = document.getElementById('ib');
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    console.log('ritika.backup.jpeg dimensions:', dimsb);
  }

  await b.close();
})();
