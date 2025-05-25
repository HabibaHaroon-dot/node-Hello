import { Builder } from 'selenium-webdriver';
const URL = process.env.SUT_URL || 'http://web';

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(URL);
    await driver.executeScript(`
      fetch('/items',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"name":"Milk"}'})
    `);
    await driver.sleep(500);
  } finally {
    await driver.quit();
  }
})();
