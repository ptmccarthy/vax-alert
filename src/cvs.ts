import { By, WebDriver} from 'selenium-webdriver';

import Slack from './slack';

const url = 'https://www.cvs.com/immunizations/covid-19-vaccine';

export async function checkCVS(driver: WebDriver) {
    console.info(`Checking CVS at ${new Date().toTimeString()}`);

    try {
        await driver.navigate().to(url);

        await driver.findElement(By.xpath("//a[@data-analytics-name='Washington']")).click();

        const table = await driver
            .findElement(By.xpath("//div[@data-url='/immunizations/covid-19-vaccine.vaccine-status.WA.json?vaccineinfo']"))
            .findElement(By.tagName('table'))
            .findElements(By.xpath("//span[@class='status']"));

        const statuses = await Promise.all(table.map(el => el.getText()));
        const available = statuses.filter(s => s != 'Fully Booked');

        if (available.length > 0) {
            await Slack.notify(`Vaccine appointments may be available now at CVS: ${url}`);
        }

    } finally {
        await driver.quit();
    }
}

