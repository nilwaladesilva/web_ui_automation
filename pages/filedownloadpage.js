const { verifyTrue } = require("../utils/projectUtils");
const { getDriver } = require("../utils/webDriver");
const { existsSync } = require("fs");
const { By } = require("selenium-webdriver");
const config = require('config');

const xpathFileNameLink = "(//a[text()='${fileName}'])[1]";
const byFirstFile = By.xpath("//div[@id='content']/div/a[1]");

let driver;

async function init() {

    driver = await getDriver();  
}

async function downloadFile(fileName) {

    //Assumption: the file name of variable file name is already exist in web UI.
    const downlaodLocation = `${config.get('webDriver.downloadDIR')}\\${fileName}`;

    // verify file already exist in download direcotry before download
    verifyTrue(!existsSync(downlaodLocation), `File: ${downlaodLocation} already exists bofore download. Please delete/move the existing file and re run the test.`);
    
    console.log(`Downlaoding file: ${fileName} ...`); 
    await driver.findElement(By.xpath(xpathFileNameLink.replace("${fileName}", fileName))).click();
    
}

async function verifyDownloadedFile(fileName) {

    console.log("Verifying downloaded file: "+ fileName)
    const downlaodLocation = `${downlaodDirectoryPath}\\${fileName}`;

    for (let index = 0; index < 5; index++) {
        await driver.sleep(1000);
        if (existsSync(downlaodLocation)) {
            console.log(`file is downloaded to ${downlaodLocation}.`); 
            return 1;
        } else {
            console.log("not yet downloaded, waiting.."); 
        }        
    }
    verifyTrue(false, "File is not downloaded properly even after 5 seconds.");
}

async function getFirstFileName() {
    let firstFileName = await driver.findElement(byFirstFile);
    return await firstFileName.getText();
}

module.exports = {
    init: init,
    downloadFile: downloadFile,
    verifyDownloadedFile: verifyDownloadedFile,
    getFirstFileName: getFirstFileName
}