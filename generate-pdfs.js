const path = require('path');

(async () => {
  console.log('Starting PDF generation...');
  
  // Dynamically import puppeteer to bypass the ESM strictness
  const puppeteer = (await import('puppeteer')).default;
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const files = [
    { html: 'doc-1-trauma.html', pdf: 'understanding-trauma.pdf' },
    { html: 'doc-2-space.html', pdf: 'church-preparation-guide.pdf' },
    { html: 'doc-3-mentoring.html', pdf: 'mentoring-framework.pdf' },
    { html: 'doc-4-worksheets.html', pdf: 'session-worksheets.pdf' }
  ];

  for (const file of files) {
    const htmlPath = `file://${path.join(__dirname, 'assets', 'resources', file.html)}`;
    const pdfPath = path.join(__dirname, 'assets', 'resources', file.pdf);
    
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    console.log(`✅ Generated: ${file.pdf}`);
  }

  await browser.close();
  console.log('🎉 All 4 documents are ready for download!');
})();