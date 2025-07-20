const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=74',
    'https://sanand0.github.io/tdsdata/js_table/?seed=75',
    'https://sanand0.github.io/tdsdata/js_table/?seed=76',
    'https://sanand0.github.io/tdsdata/js_table/?seed=77',
    'https://sanand0.github.io/tdsdata/js_table/?seed=78',
    'https://sanand0.github.io/tdsdata/js_table/?seed=79',
    'https://sanand0.github.io/tdsdata/js_table/?seed=80',
    'https://sanand0.github.io/tdsdata/js_table/?seed=81',
    'https://sanand0.github.io/tdsdata/js_table/?seed=82',
    'https://sanand0.github.io/tdsdata/js_table/?seed=83'
  ];

  let totalSum = 0;

  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => parseFloat(cell.innerText.replace(/,/g, '')))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((acc, num) => acc + num, 0);
    console.log(`Sum for ${url}: ${pageSum}`);
    totalSum += pageSum;
  }

  console.log(`✅ Total Sum: ${totalSum}`);
  await browser.close();
})();
