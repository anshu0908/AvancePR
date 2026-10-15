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
  await page.setViewport({ width: 1128, height: 1580, deviceScaleFactor: 1 });

  // Extract the logo badge from the original stovekraft.backup.png
  const logoBase64 = fs.readFileSync('public/assets/work/stovekraft.backup.png').toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&family=Alex+Brush&family=MonteCarlo&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1128px;
          height: 1580px;
          background: #A61313;
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 100px 80px 100px;
        }

        /* Top Right organic texture flourish */
        .top-right-decor {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 380px;
          height: 380px;
          opacity: 0.85;
          pointer-events: none;
        }

        /* Bottom Left organic hand-drawn doodle flourish */
        .bottom-left-decor {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: 320px;
          height: 220px;
          opacity: 0.9;
          pointer-events: none;
        }

        /* Center Circle Logo Badge */
        .badge-wrapper {
          position: relative;
          width: 580px;
          height: 580px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
        }

        .badge-outer-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3.5px solid rgba(255, 255, 255, 0.95);
          transform: rotate(-8deg) scaleX(1.02);
        }

        .badge-inner-ring {
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.7);
          transform: rotate(5deg);
        }

        .badge-circle {
          position: absolute;
          inset: 22px;
          background: #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 15px 45px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 40px;
        }

        /* Center Content */
        .content {
          text-align: center;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          margin-top: -20px;
        }

        h2.brand-title {
          font-family: 'Playfair Display', serif;
          font-size: 68px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 36px;
          text-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        p.brand-desc {
          font-size: 34px;
          line-height: 1.5;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          max-width: 820px;
          text-align: center;
          text-wrap: pretty;
        }

        /* Bottom Flourish Call-to-action */
        .footer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-family: 'Alex Brush', 'Playfair Display', cursive;
          font-size: 58px;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 20px;
          z-index: 10;
        }

        .cta-arrow {
          font-family: sans-serif;
          font-size: 44px;
          margin-left: 10px;
        }
      </style>
    </head>
    <body>
      <!-- Top right decorative flourish SVG -->
      <svg class="top-right-decor" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M120 10 C150 20, 190 60, 195 110 C200 150, 180 180, 140 195" stroke="white" stroke-width="4" stroke-dasharray="8 6" opacity="0.6"/>
        <path d="M140 0 C170 30, 200 80, 200 130" stroke="white" stroke-width="6" opacity="0.8"/>
        <circle cx="160" cy="50" r="30" fill="white" opacity="0.15" filter="blur(10px)"/>
      </svg>

      <!-- Badge Circle -->
      <div class="badge-wrapper">
        <div class="badge-outer-ring"></div>
        <div class="badge-inner-ring"></div>
        <div class="badge-circle">
          <!-- Clip the logo from original Stovekraft image -->
          <div style="width: 100%; height: 100%; overflow: hidden; position: relative; border-radius: 50%;">
            <img src="data:image/png;base64,${logoBase64}" style="position: absolute; width: 440%; height: auto; top: -115%; left: -168%; filter: contrast(1.15) brightness(1.02);" />
          </div>
        </div>
      </div>

      <!-- Description Content -->
      <div class="content">
        <h2 class="brand-title">STOVEKRAFT</h2>
        <p class="brand-desc">
          Stovekraft aims to enhance culinary experiences by providing high-quality, innovative kitchenware that combines functionality, durability, and style.
        </p>
      </div>

      <!-- Bottom Call to action -->
      <div class="footer-cta">
        <span>View Case Study</span>
        <span class="cta-arrow">⟶</span>
      </div>

      <!-- Bottom Left decorative doodle SVG -->
      <svg class="bottom-left-decor" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 130 C40 145, 90 135, 75 95 C60 55, 15 70, 25 105 C35 140, 85 130, 110 115" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
      </svg>
    </body>
    </html>
  `;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'research/stovekraft-4k-remaster.png' });
  console.log('Saved research/stovekraft-4k-remaster.png');

  await browser.close();
})();
