import * as webdriver from 'selenium-webdriver';
import * as cron from 'node-cron';
import chrome from 'selenium-webdriver/chrome';

import { checkCVS } from './src/cvs';

(async function main() {
    const driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();

    // const cvs = cron.schedule('*/5 * * * *', () => checkCVS(driver));
    checkCVS(driver)
})();
