const {Builder} = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

const config = require('config');

const options = new firefox.Options();

options.setPreference("browser.download.dir", config.get('webDriver.downloadDIR'));
options.setPreference("browser.download.folderList", config.get('webDriver.downloadFolderList'));
options.setPreference("browser.helperApps.neverAsk.saveToDisk", config.get('webDriver.neverAskSaveToDisk'));

let driver;
async function getDriver() {
    if (!driver) {
        driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
    }
    return driver;
}

function qiuitDriver() {
    console.log('quiting web driver...')
    if (driver) {
        driver.quit().catch().finally(()=>{
            driver = null;
        });
    } else {
        console.warn('No webdriver exist to quit.');
    }
}

module.exports = {
    getDriver: getDriver,
    qiuitDriver: qiuitDriver
}
